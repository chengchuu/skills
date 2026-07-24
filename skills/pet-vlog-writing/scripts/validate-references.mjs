import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const examplesRoot = path.join(skillRoot, "references", "examples");
const manifestPath = path.join(skillRoot, "references", "source-manifest.md");
const repoRoot = path.resolve(skillRoot, "..", "..");
const sourcePath = path.join(repoRoot, "temp", "pet-examples", "pet.md");
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
  if (headings.length !== 60) report(`Expected 60 curated examples, found ${headings.length}.`);

  for (const block of allBlocks) {
    for (const field of ["- Category:", "- Languages:", "- Content type:", "- Source path:"]) {
      if (!block.body.includes(field)) report(`${block.heading} is missing ${field}`);
    }
    if (!/^### (Chinese|English|Japanese)$/m.test(block.body)) {
      report(`${block.heading} has no language block.`);
    }
  }

  const manifest = await readFile(manifestPath, "utf8");
  for (const heading of headings) {
    if (!manifest.includes(`| \`${heading}\` |`)) report(`Manifest is missing ${heading}.`);
  }

  if (await exists(sourcePath)) {
    const source = await readFile(sourcePath, "utf8");
    const originals = sourceHeadings(source);
    const missing = originals.filter(heading => !headings.includes(heading));
    const extra = headings.filter(heading => !originals.includes(heading));
    if (missing.length) report(`Source headings missing from corpus: ${missing.join(", ")}`);
    if (extra.length) report(`Curated headings missing from source: ${extra.join(", ")}`);
    const curatedByHeading = new Map(allBlocks.map(block => [block.heading, block.body]));
    for (const original of sourceBlocks(source)) {
      const curated = curatedByHeading.get(original.heading) ?? "";
      const meaningfulLines = original.body.split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line && !/^(zh|en|jp):$/.test(line));
      for (const line of meaningfulLines) {
        const expected = line.startsWith("BGM:") ? line.slice(4).trim() : line;
        if (!curated.includes(expected)) {
          report(`${original.heading} is missing source text: ${line}`);
        }
      }
    }
  }

  if (errors.length) {
    console.error(`Pet Vlog reference validation failed with ${errors.length} error${errors.length === 1 ? "" : "s"}:`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Validated ${headings.length} examples across ${entries.length} category files.`);
}

main().catch(error => {
  console.error(`Pet Vlog reference validation failed: ${error.message}`);
  process.exitCode = 1;
});
