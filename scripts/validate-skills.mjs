import { constants as fsConstants } from "node:fs";
import { access, lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(repoRoot, ".codex-plugin", "plugin.json");
const expectedSkillsDirectory = path.join(repoRoot, "skills");
const ignoredPath = process.env.SKILLS_VALIDATOR_IGNORE_PATH
  ? path.resolve(process.env.SKILLS_VALIDATOR_IGNORE_PATH)
  : undefined;
const errors = [];

function report(message) {
  errors.push(message);
}

async function pathExists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

function shouldIgnore(candidate) {
  return ignoredPath !== undefined && isInside(ignoredPath, candidate);
}

function parseQuotedScalar(value, relativeSkillFile, key) {
  const doubleQuoted = /^("(?:[^"\\]|\\.)*")\s*(?:#.*)?$/.exec(value);
  if (doubleQuoted) {
    try {
      return JSON.parse(doubleQuoted[1]);
    } catch {
      report(`${relativeSkillFile} has an invalid double-quoted YAML value for ${key}.`);
      return undefined;
    }
  }

  const singleQuoted = /^'((?:[^']|'')*)'\s*(?:#.*)?$/.exec(value);
  if (singleQuoted) return singleQuoted[1].replace(/''/g, "'");
  return undefined;
}

function isImplicitNonStringYamlScalar(scalar) {
  const normalized = scalar.replace(/_/g, "");
  return /^(?:~|null|true|false|yes|no|on|off)$/i.test(normalized)
    || /^[+-]?\.(?:inf|nan)$/i.test(normalized)
    || /^[+-]?(?:0b[01]+|0o[0-7]+|0x[0-9a-f]+)$/i.test(normalized)
    || /^[+-]?0[0-7]+$/.test(normalized)
    || /^[+-]?(?:0|[1-9]\d*)$/.test(normalized)
    || /^[+-]?(?:(?:\d+\.\d*|\.\d+)(?:e[+-]?\d+)?|\d+e[+-]?\d+)$/i.test(normalized)
    || /^[+-]?\d+(?::[0-5]?\d)+(?:\.\d*)?$/.test(normalized)
    || /^\d{4}-\d{1,2}-\d{1,2}$/.test(normalized)
    || /^\d{4}-\d{1,2}-\d{1,2}(?:[Tt]|[ \t]+)\d{1,2}:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[+-]\d{1,2}(?::?\d{2})?))?$/.test(normalized);
}

function parsePlainScalar(value, relativeSkillFile, key) {
  const scalar = value.replace(/\s+#.*$/, "").trim();
  if (
    scalar === ""
    || /^[!&*{}[\],#|>@`"']/.test(scalar)
    || /^(?:[-?:](?:\s|$))/.test(scalar)
    || /:\s/.test(scalar)
    || isImplicitNonStringYamlScalar(scalar)
  ) {
    report(`${relativeSkillFile} has an unsupported or non-string YAML value for ${key}. Quote the value when needed.`);
    return undefined;
  }
  return scalar;
}

function parseFrontmatter(markdown, relativeSkillFile) {
  const lines = markdown.split(/\r?\n/);
  if (lines[0] !== "---") {
    report(`${relativeSkillFile} must start with YAML frontmatter.`);
    return {};
  }

  const endIndex = lines.indexOf("---", 1);
  if (endIndex === -1) {
    report(`${relativeSkillFile} has unterminated YAML frontmatter.`);
    return {};
  }

  const fields = {};
  for (let index = 1; index < endIndex; index += 1) {
    const line = lines[index];
    if (line.trim() === "" || line.trimStart().startsWith("#")) continue;
    if (/^\s/.test(line)) {
      report(`${relativeSkillFile} uses unsupported nested YAML at line ${index + 1}.`);
      continue;
    }

    const match = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/.exec(line);
    if (!match) {
      report(`${relativeSkillFile} has invalid YAML frontmatter at line ${index + 1}.`);
      continue;
    }
    if (Object.hasOwn(fields, match[1])) {
      report(`${relativeSkillFile} repeats the YAML key ${match[1]}.`);
      continue;
    }

    let value = match[2].trim();
    const blockMatch = /^([|>])([+-])?\s*(?:#.*)?$/.exec(value);
    if (blockMatch) {
      const blockLines = [];
      let indentation;
      for (index += 1; index < endIndex; index += 1) {
        const blockLine = lines[index];
        if (blockLine !== "" && !/^\s/.test(blockLine)) break;
        const indentationPrefix = /^[ \t]*/.exec(blockLine)[0];
        if (indentationPrefix.includes("\t")) {
          report(`${relativeSkillFile} uses a tab for YAML indentation at line ${index + 1}.`);
        }
        if (blockLine.trim() !== "") {
          if (indentation === undefined) {
            indentation = indentationPrefix.length;
          } else if (indentationPrefix.length < indentation) {
            report(`${relativeSkillFile} dedents a YAML block scalar at line ${index + 1}.`);
          }
        }
        blockLines.push(blockLine);
      }
      index -= 1;

      const normalizedLines = blockLines.map(blockLine => (
        blockLine.trim() === "" ? "" : blockLine.slice(indentation ?? 0)
      ));
      value = blockMatch[1] === ">"
        ? normalizedLines.join(" ").trim()
        : normalizedLines.join("\n").trim();
    } else {
      value = parseQuotedScalar(value, relativeSkillFile, match[1])
        ?? parsePlainScalar(value, relativeSkillFile, match[1]);
    }
    if (value !== undefined) fields[match[1]] = value;
  }

  return fields;
}

function isTemporaryName(name) {
  return name === ".DS_Store"
    || name === "Thumbs.db"
    || name === "node_modules"
    || name === ".idea"
    || name === ".vscode"
    || /(?:\.tmp|\.temp|\.swp|\.swo|~)$/i.test(name)
    || name.startsWith(".prefer-mazey-sync-");
}

function machineSpecificPath(text) {
  const patterns = [
    /(?:^|[\s('"`])\/Users\/[^/\s]+\//m,
    /(?:^|[\s('"`])\/home\/[^/\s]+\//m,
    /[A-Za-z]:\\Users\\[^\\\s]+\\/i,
  ];
  return patterns.some(pattern => pattern.test(text));
}

function containsLikelySecret(text) {
  const patterns = [
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    /\bAKIA[0-9A-Z]{16}\b/,
    /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
    /\bsk-[A-Za-z0-9_-]{20,}\b/,
  ];
  return patterns.some(pattern => pattern.test(text));
}

async function walk(root, visitor) {
  if (!(await pathExists(root)) || shouldIgnore(root)) return;
  const entries = await readdir(root, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));

  for (const entry of entries) {
    const absolutePath = path.join(root, entry.name);
    if (shouldIgnore(absolutePath)) continue;
    await visitor(absolutePath, entry);
    if (entry.isDirectory() && entry.name !== ".git" && entry.name !== "node_modules") {
      await walk(absolutePath, visitor);
    }
  }
}

async function validateLocalMarkdownLinks(markdown, markdownPath, skillRoot) {
  const linkPattern = /!?\[[^\]]*\]\(([^)\n]+)\)/g;
  for (const match of markdown.matchAll(linkPattern)) {
    let destination = match[1].trim();
    if (destination.startsWith("<") && destination.endsWith(">")) {
      destination = destination.slice(1, -1);
    } else if (/\s/.test(destination)) {
      continue;
    }
    if (!destination || destination.startsWith("#") || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(destination)) {
      continue;
    }

    destination = destination.split("#", 1)[0].split("?", 1)[0];
    if (!destination || path.isAbsolute(destination)) continue;

    let decodedDestination;
    try {
      decodedDestination = decodeURIComponent(destination);
    } catch {
      report(`${path.relative(repoRoot, markdownPath)} contains an invalid encoded local link: ${destination}`);
      continue;
    }

    const resolvedDestination = path.resolve(path.dirname(markdownPath), decodedDestination);
    if (!isInside(skillRoot, resolvedDestination)) {
      report(`${path.relative(repoRoot, markdownPath)} links outside its skill directory: ${destination}`);
    } else if (!(await pathExists(resolvedDestination))) {
      report(`${path.relative(repoRoot, markdownPath)} references a missing local file: ${destination}`);
    }
  }
}

async function validateSkill(skillRoot, directoryName) {
  const skillFile = path.join(skillRoot, "SKILL.md");
  const relativeSkillFile = path.relative(repoRoot, skillFile);
  if (!(await pathExists(skillFile))) {
    report(`${path.relative(repoRoot, skillRoot)} is missing SKILL.md.`);
    return;
  }

  const skillStats = await lstat(skillFile);
  if (!skillStats.isFile() || skillStats.isSymbolicLink()) {
    report(`${relativeSkillFile} must be a regular file.`);
    return;
  }

  const markdown = await readFile(skillFile, "utf8");
  const frontmatter = parseFrontmatter(markdown, relativeSkillFile);
  const name = frontmatter.name?.trim();
  const description = frontmatter.description?.trim();

  if (!name) report(`${relativeSkillFile} frontmatter is missing name.`);
  if (name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    report(`${relativeSkillFile} frontmatter name must be kebab-case: ${name}`);
  }
  if (name && name !== directoryName) {
    report(`${relativeSkillFile} frontmatter name ${name} does not match directory ${directoryName}.`);
  }
  if (!description) report(`${relativeSkillFile} frontmatter is missing a non-empty description.`);

  await walk(skillRoot, async (absolutePath, entry) => {
    const relativePath = path.relative(repoRoot, absolutePath);
    if (isTemporaryName(entry.name)) report(`${relativePath} is an obvious temporary or editor file.`);
    if (entry.isSymbolicLink()) {
      report(`${relativePath} is a symbolic link; public skills must contain self-contained files.`);
      return;
    }
    if (!entry.isFile()) return;

    const content = await readFile(absolutePath);
    if (content.includes(0)) return;
    const text = content.toString("utf8");
    if (machineSpecificPath(text)) report(`${relativePath} contains an absolute machine-specific path.`);
    if (containsLikelySecret(text)) report(`${relativePath} appears to contain a secret or private key.`);
    if (entry.name.toLowerCase().endsWith(".md")) {
      await validateLocalMarkdownLinks(text, absolutePath, skillRoot);
    }
  });
}

async function loadManifest() {
  if (!(await pathExists(manifestPath))) {
    report("Missing .codex-plugin/plugin.json.");
    return undefined;
  }

  try {
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
      report(".codex-plugin/plugin.json must contain a JSON object.");
      return undefined;
    }
    if (manifest.skills !== "./skills/") {
      report('.codex-plugin/plugin.json must set "skills" to "./skills/".');
    }
    return manifest;
  } catch (error) {
    report(`.codex-plugin/plugin.json is not valid JSON: ${error.message}`);
    return undefined;
  }
}

async function main() {
  const manifest = await loadManifest();
  if (!manifest) {
    finish(0);
    return;
  }

  const declaredSkillsDirectory = path.resolve(repoRoot, manifest.skills || "");
  if (declaredSkillsDirectory !== expectedSkillsDirectory || !isInside(repoRoot, declaredSkillsDirectory)) {
    report(`Plugin skills directory resolves outside the expected path: ${declaredSkillsDirectory}`);
  }
  if (!(await pathExists(expectedSkillsDirectory))) {
    report("Missing skills/ directory.");
    finish(0);
    return;
  }

  const entries = await readdir(expectedSkillsDirectory, { withFileTypes: true });
  let skillCount = 0;
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const skillRoot = path.join(expectedSkillsDirectory, entry.name);
    if (shouldIgnore(skillRoot)) continue;
    if (isTemporaryName(entry.name)) {
      report(`${path.relative(repoRoot, skillRoot)} is an obvious temporary directory.`);
      continue;
    }
    if (!entry.isDirectory() || entry.isSymbolicLink()) {
      report(`${path.relative(repoRoot, skillRoot)} must be a skill directory.`);
      continue;
    }
    skillCount += 1;
    await validateSkill(skillRoot, entry.name);
  }
  if (skillCount === 0) report("No public skills were found under skills/.");

  await walk(repoRoot, async (absolutePath, entry) => {
    if (entry.isFile() && entry.name === "SKILL.md" && !isInside(expectedSkillsDirectory, absolutePath)) {
      report(`${path.relative(repoRoot, absolutePath)} is a public skill outside the declared skills directory.`);
    }
  });

  finish(skillCount);
}

function finish(skillCount) {
  if (errors.length > 0) {
    console.error(`Skill validation failed with ${errors.length} error${errors.length === 1 ? "" : "s"}:`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Validated plugin manifest and ${skillCount} public skill${skillCount === 1 ? "" : "s"}.`);
}

main().catch(error => {
  console.error(`Skill validation failed: ${error.message}`);
  process.exitCode = 1;
});
