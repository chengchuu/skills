import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const examplesRoot = path.join(skillRoot, "references", "examples");
const manifestPath = path.join(skillRoot, "references", "source-manifest.md");
const repoRoot = path.resolve(skillRoot, "..", "..");
const trackedSource = "sources/pet-diary-notes/pet.md";
const historicalSource = "temp/pet-examples/pet.md";
const sourcePath = path.join(repoRoot, ...trackedSource.split("/"));
const historicalSourcePath = path.join(repoRoot, ...historicalSource.split("/"));
const expectedSourceMetadata = `- Source path: \`${trackedSource}\` (historical path: \`${historicalSource}\`)`;
const errors = [];

function report(message) {
  errors.push(message);
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function sourceHeadings(markdown) {
  return [...markdown.matchAll(/^## (.+)$/gm)].map(match => match[1].trim());
}

function sourceBlocks(markdown) {
  const matches = [...markdown.matchAll(/^## (.+)$/gm)];
  return matches.map((match, index) => ({
    heading: match[1].trim(),
    body: markdown.slice(match.index + match[0].length, matches[index + 1]?.index ?? markdown.length),
  }));
}

async function markdownFiles(directory) {
  if (!(await exists(directory))) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(entryPath);
    return entry.isFile() && entry.name.endsWith(".md") ? [entryPath] : [];
  }));
  return nested.flat().sort();
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function curatedBlocks(markdown) {
  const matches = [...markdown.matchAll(/^## Example: (.+)$/gm)];
  return matches.map((match, index) => ({
    heading: match[1].trim(),
    body: markdown.slice(match.index, matches[index + 1]?.index ?? markdown.length),
  }));
}

function hashtagTokens(line) {
  return [...line.matchAll(/#[^#\s]+/g)].map(match => match[0]);
}

async function main() {
  const entries = (await readdir(examplesRoot, { withFileTypes: true }))
    .filter(entry => entry.isFile() && entry.name.endsWith(".md"))
    .sort((left, right) => left.name.localeCompare(right.name));
  if (entries.length === 0) report("No curated example files found.");

  const allBlocks = [];
  for (const entry of entries) {
    const filePath = path.join(examplesRoot, entry.name);
    const markdown = await readFile(filePath, "utf8");
    if (!markdown.trim()) report(`${entry.name} is empty.`);
    const blocks = curatedBlocks(markdown);
    if (blocks.length === 0) report(`${entry.name} has no normalized examples.`);
    allBlocks.push(...blocks.map(block => ({ ...block, file: entry.name })));

    const lines = markdown.split(/\r?\n/);
    let inCompact = false;
    for (const line of lines) {
      if (line === "#### Compact hashtags") {
        inCompact = true;
        continue;
      }
      if (line.startsWith("#### ") || line.startsWith("### ") || line.startsWith("## ")) {
        inCompact = false;
      }
      if (inCompact && line.startsWith("#") && /\s/.test(line)) {
        report(`${entry.name} has whitespace in compact hashtags: ${line}`);
      }
      if (line.startsWith("#")) {
        const tags = hashtagTokens(line);
        if (new Set(tags).size !== tags.length) {
          report(`${entry.name} has duplicate hashtags in one set: ${line}`);
        }
      }
    }
  }

  const headings = allBlocks.map(block => block.heading);
  const duplicates = headings.filter((heading, index) => headings.indexOf(heading) !== index);
  if (duplicates.length) report(`Duplicate curated headings: ${[...new Set(duplicates)].join(", ")}`);

  for (const block of allBlocks) {
    for (const field of ["- Category:", "- Languages:", "- Content type:", "- Source path:"]) {
      if (!block.body.includes(field)) report(`${block.heading} is missing ${field}`);
    }
    if (!block.body.includes(expectedSourceMetadata)) {
      report(`${block.heading} does not reference the canonical and historical pet source paths.`);
    }
    if (!/^### (Chinese|English|Japanese)$/m.test(block.body)) {
      report(`${block.heading} has no language block.`);
    }
    for (const field of ["- Country:", "- Region:", "- City:", "- Location:"]) {
      if (block.body.includes(field)) report(`${block.heading} contains forbidden real-life geography field ${field}`);
    }
    const isAiGenerated = block.body.includes("- Content type: AI-generated fictional scene");
    const hasAiLocation = block.body.includes("- AI location:");
    if (isAiGenerated && !hasAiLocation) report(`${block.heading} is AI-generated but is missing - AI location:`);
    if (!isAiGenerated && hasAiLocation) report(`${block.heading} is not AI-generated but contains - AI location:`);
  }

  const manifest = await readFile(manifestPath, "utf8");
  if (/\/Users\//.test(manifest)) report("source-manifest.md contains a machine-specific path.");
  if (!manifest.includes(`- Canonical source: \`${trackedSource}\``)) report("Manifest is missing the canonical pet source.");
  if (!manifest.includes(`- Historical source path: \`${historicalSource}\``)) report("Manifest is missing historical source compatibility.");
  if (!manifest.includes("| AI location |")) report("Manifest is missing the AI location column.");
  for (const column of ["| Country |", "| Region |", "| City |", "| Location |"]) {
    if (manifest.includes(column)) report(`Manifest contains forbidden geography column ${column}`);
  }
  const declaredCount = Number(/^- Curated examples: (\d+)$/m.exec(manifest)?.[1]);
  if (!Number.isInteger(declaredCount)) {
    report("Manifest is missing a valid curated example count.");
  } else if (headings.length !== declaredCount) {
    report(`Manifest declares ${declaredCount} curated examples, found ${headings.length}.`);
  }
  for (const heading of headings) {
    if (!manifest.includes(`| \`${heading}\` |`)) report(`Manifest is missing ${heading}.`);
  }

  const repositoryCheckout = await exists(path.join(repoRoot, ".git"));
  const trackedSourceExists = await exists(sourcePath);
  if (repositoryCheckout && !trackedSourceExists) report(`Tracked source does not exist: ${trackedSource}`);
  if (trackedSourceExists) {
    const sourceBuffer = await readFile(sourcePath);
    const source = sourceBuffer.toString("utf8");
    const declaredBytes = Number(/^- Source bytes: (\d+)$/m.exec(manifest)?.[1]);
    const declaredHash = /^- Source SHA-256: `([a-f0-9]{64})`$/m.exec(manifest)?.[1];
    if (!Number.isInteger(declaredBytes)) {
      report("Manifest is missing a valid tracked source byte size.");
    } else if (sourceBuffer.length !== declaredBytes) {
      report(`Tracked source byte size differs from manifest: ${trackedSource}`);
    }
    if (!declaredHash) {
      report("Manifest is missing a valid tracked source SHA-256.");
    } else if (sha256(sourceBuffer) !== declaredHash) {
      report(`Tracked source hash differs from manifest: ${trackedSource}`);
    }
    const originals = sourceHeadings(source);
    if (originals.length !== 66 || new Set(originals).size !== 66) {
      report(`Tracked source must contain 66 unique mapped sections; found ${originals.length} sections and ${new Set(originals).size} unique mapped headings.`);
    }
    const missing = originals.filter(heading => !headings.includes(heading));
    const extra = allBlocks.filter(block => !originals.includes(block.heading)).map(block => block.heading);
    if (missing.length) report(`Source headings missing from corpus: ${missing.join(", ")}`);
    if (extra.length) report(`Curated headings missing from source: ${extra.join(", ")}`);
    const curatedByHeading = new Map(allBlocks.map(block => [block.heading, block.body]));
    for (const original of sourceBlocks(source)) {
      const curated = curatedByHeading.get(original.heading) ?? "";
      const meaningfulLines = original.body.split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line && !/^(zh|en|jp):$/.test(line));
      for (const line of meaningfulLines) {
        const expected = /^BGM[:：]/.test(line) ? line.replace(/^BGM[:：]\s*/, "") : line;
        if (!curated.includes(expected)) {
          report(`${original.heading} is missing source text: ${line}`);
        }
      }
    }
  }

  if (await exists(historicalSourcePath)) {
    if (!trackedSourceExists) {
      report(`Historical source exists without tracked source: ${historicalSource}`);
    } else if (!(await readFile(historicalSourcePath)).equals(await readFile(sourcePath))) {
      report(`Historical source differs from tracked source: ${historicalSource}`);
    }
  }

  const trackedSourceDir = path.dirname(sourcePath);
  if (await exists(trackedSourceDir)) {
    const unregistered = (await markdownFiles(trackedSourceDir))
      .filter(file => path.resolve(file) !== path.resolve(sourcePath))
      .map(file => path.relative(repoRoot, file).split(path.sep).join("/"));
    if (unregistered.length) report(`Unregistered tracked pet sources: ${unregistered.join(", ")}`);
  }

  if (errors.length) {
    console.error(`Pet diary reference validation failed with ${errors.length} error${errors.length === 1 ? "" : "s"}:`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  if (!trackedSourceExists && !repositoryCheckout) {
    console.log(`Validated ${headings.length} examples across ${entries.length} category files; skipped source comparison because repository sources are unavailable.`);
  } else {
    console.log(`Validated ${headings.length} examples across ${entries.length} category files and the tracked pet source.`);
  }
}

main().catch(error => {
  console.error(`Pet diary reference validation failed: ${error.message}`);
  process.exitCode = 1;
});
