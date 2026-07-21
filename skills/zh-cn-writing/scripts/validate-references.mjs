#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillDir = resolve(scriptDir, '..');
const repositoryDir = resolve(skillDir, '..', '..');
const referencesDir = resolve(skillDir, 'references');
const examplesDir = resolve(referencesDir, 'examples');
const manifestPath = resolve(referencesDir, 'source-manifest.md');
const errors = [];

function fail(message) {
  errors.push(message);
}

function markdownFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return markdownFiles(path);
      return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
    })
    .sort();
}

function relativePath(path) {
  return relative(repositoryDir, path).split('\\').join('/');
}

function validateLinks(path) {
  const content = readFileSync(path, 'utf8');
  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
  for (const match of content.matchAll(linkPattern)) {
    const target = match[1].trim().split('#', 1)[0];
    if (!target || /^[a-z]+:/i.test(target) || target.startsWith('#')) continue;
    if (!existsSync(resolve(dirname(path), target))) {
      fail(`${relativePath(path)} links to missing file ${target}`);
    }
  }
}

const exampleFiles = markdownFiles(examplesDir);
if (exampleFiles.length === 0) fail('No curated example files found.');

const exampleTitles = new Set();
const curatedSources = new Set();
for (const path of exampleFiles) {
  const content = readFileSync(path, 'utf8');
  if (!content.trim()) fail(`${relativePath(path)} is empty.`);
  if (/\/Users\//.test(content)) fail(`${relativePath(path)} contains a machine-specific path.`);

  const headings = [...content.matchAll(/^## Example: (.+)$/gm)];
  if (headings.length === 0) fail(`${relativePath(path)} has no normalized examples.`);
  headings.forEach((heading, index) => {
    const title = heading[1].trim();
    const start = heading.index;
    const end = headings[index + 1]?.index ?? content.length;
    const block = content.slice(start, end);
    if (exampleTitles.has(title)) fail(`Duplicate example title: ${title}`);
    exampleTitles.add(title);
    for (const label of ['Document type', 'Subject', 'Audience', 'Tone', 'Length', 'Source']) {
      if (!block.includes(`- ${label}:`)) fail(`${title} is missing ${label} metadata.`);
    }
    for (const source of block.matchAll(/`(temp\/writing-examples\/[^`]+\.md)`/g)) {
      curatedSources.add(source[1]);
    }
  });
}

const manifest = readFileSync(manifestPath, 'utf8');
if (/\/Users\//.test(manifest)) fail('source-manifest.md contains a machine-specific path.');
const manifestSources = [...manifest.matchAll(/`(temp\/writing-examples\/[^`]+\.md)`/g)].map((match) => match[1]);
const uniqueManifestSources = new Set(manifestSources);
if (manifestSources.length !== uniqueManifestSources.size) fail('source-manifest.md contains duplicate source paths.');

for (const line of manifest.split('\n')) {
  const source = line.match(/^\| `(temp\/writing-examples\/[^`]+\.md)` \|/i)?.[1];
  if (!source || line.includes('| Not curated |')) continue;
  if (!curatedSources.has(source)) fail(`Curated manifest source missing from examples: ${source}`);
}

for (const destination of manifest.matchAll(/`(references\/examples\/[^`]+\.md)`/g)) {
  if (!existsSync(resolve(skillDir, destination[1]))) fail(`Missing manifest destination ${destination[1]}`);
}

const sourceDir = resolve(repositoryDir, 'temp', 'writing-examples');
if (existsSync(sourceDir)) {
  const actualSources = new Set(markdownFiles(sourceDir).map(relativePath));
  for (const path of actualSources) {
    if (!uniqueManifestSources.has(path)) fail(`Source missing from manifest: ${path}`);
  }
  for (const path of uniqueManifestSources) {
    if (!actualSources.has(path)) fail(`Manifest source does not exist: ${path}`);
  }
}

for (const path of curatedSources) {
  if (!uniqueManifestSources.has(path)) fail(`Curated source missing from manifest: ${path}`);
}

for (const path of [resolve(skillDir, 'SKILL.md'), resolve(referencesDir, 'README.md'), ...exampleFiles]) {
  validateLinks(path);
}

for (const entry of readdirSync(examplesDir)) {
  const path = resolve(examplesDir, entry);
  if (statSync(path).isDirectory() && readdirSync(path).length === 0) {
    fail(`Empty example category directory: ${relativePath(path)}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log(`Validated ${uniqueManifestSources.size} source files and ${exampleTitles.size} curated examples.`);
