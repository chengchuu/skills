#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillDir = resolve(scriptDir, '..');
const repositoryDir = resolve(skillDir, '..', '..');
const referencesDir = resolve(skillDir, 'references');
const examplesDir = resolve(referencesDir, 'examples');
const manifestPath = resolve(referencesDir, 'source-manifest.md');
const trackedSourceDir = resolve(repositoryDir, 'sources', 'zh-restaurant-reviews');
const trackedPrefix = 'sources/zh-restaurant-reviews/';
const historicalPrefix = 'temp/examples/';
const errors = [];

function fail(message) {
  errors.push(message);
}

function markdownFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .flatMap(entry => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory()
        ? markdownFiles(path)
        : entry.isFile() && entry.name.endsWith('.md')
          ? [path]
          : [];
    })
    .sort();
}

function repositoryPath(path) {
  return relative(repositoryDir, path).split('\\').join('/');
}

function normalizedSource(path, prefix) {
  return path.startsWith(prefix)
    && !path.includes('\\')
    && path.slice(prefix.length).split('/').every(segment => segment !== '' && segment !== '.' && segment !== '..');
}

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

const manifest = readFileSync(manifestPath, 'utf8');
if (/\/Users\//.test(manifest)) fail('source-manifest.md contains a machine-specific path.');

const registrySection = manifest.slice(
  manifest.indexOf('## 单篇来源'),
  manifest.indexOf('## 历史路径兼容映射'),
);
const registry = registrySection
  .split('\n')
  .map(line => {
    const cells = line.split('|').map(cell => cell.trim());
    const source = /^`(sources\/zh-restaurant-reviews\/[^`]+\.md)`$/.exec(cells[1] ?? '')?.[1];
    if (!source) return undefined;
    return { source, destinationCell: cells[2], examples: Number(cells[3]) };
  })
  .filter(Boolean);

const registrySources = new Set(registry.map(entry => entry.source));
if (registry.length !== 49 || registrySources.size !== 49) {
  fail(`source-manifest.md must register 49 unique tracked sources; found ${registrySources.size}.`);
}
for (const source of registrySources) {
  if (!normalizedSource(source, trackedPrefix)) fail(`Invalid tracked source path: ${source}`);
}

const historicalMappings = [...manifest.matchAll(/^\| `(temp\/examples\/[^`]+\.md)` \| `(sources\/zh-restaurant-reviews\/[^`]+\.md)` \| `([a-f0-9]{64})` \|$/gm)]
  .map(match => ({ historical: match[1], source: match[2], hash: match[3] }));
const historicalPaths = new Set(historicalMappings.map(entry => entry.historical));
const mappedSources = new Set(historicalMappings.map(entry => entry.source));
if (historicalMappings.length !== 49 || historicalPaths.size !== 49 || mappedSources.size !== 49) {
  fail(`source-manifest.md must contain 49 unique historical mappings; found ${historicalMappings.length}.`);
}
for (const entry of historicalMappings) {
  if (!normalizedSource(entry.historical, historicalPrefix)) fail(`Invalid historical source path: ${entry.historical}`);
  if (!registrySources.has(entry.source)) fail(`Historical mapping destination is not registered: ${entry.source}`);
}

const exampleFiles = markdownFiles(examplesDir);
const curatedSources = new Set();
const curatedSourceCounts = new Map();
let exampleCount = 0;
for (const path of exampleFiles) {
  const content = readFileSync(path, 'utf8');
  if (/\/Users\//.test(content)) fail(`${repositoryPath(path)} contains a machine-specific path.`);
  const headings = [...content.matchAll(/^## Example: /gm)];
  exampleCount += headings.length;
  for (const match of content.matchAll(/^- Source: `(sources\/zh-restaurant-reviews\/[^`]+\.md)`$/gm)) {
    curatedSources.add(match[1]);
    curatedSourceCounts.set(match[1], (curatedSourceCounts.get(match[1]) ?? 0) + 1);
  }
}
if (exampleCount !== 85) fail(`Expected 85 curated examples, found ${exampleCount}.`);
for (const source of curatedSources) {
  if (!registrySources.has(source)) fail(`Curated source missing from manifest: ${source}`);
}
for (const entry of registry) {
  if (!Number.isInteger(entry.examples) || entry.examples < 0) {
    fail(`Manifest source has an invalid example count: ${entry.source}`);
  } else {
    const actualExamples = curatedSourceCounts.get(entry.source) ?? 0;
    if (entry.examples !== actualExamples) {
      fail(`Manifest source ${entry.source} declares ${entry.examples} examples, found ${actualExamples}.`);
    }
  }
  for (const destination of entry.destinationCell?.matchAll(/`(references\/examples\/[^`]+\.md)`/g) ?? []) {
    if (!existsSync(resolve(skillDir, destination[1]))) fail(`Missing manifest destination ${destination[1]}`);
  }
}

const repositoryCheckout = existsSync(resolve(repositoryDir, '.git'));
if (repositoryCheckout || existsSync(trackedSourceDir)) {
  for (const entry of historicalMappings) {
    const path = resolve(repositoryDir, entry.source);
    if (!existsSync(path)) {
      fail(`Manifest source does not exist: ${entry.source}`);
      continue;
    }
    if (sha256(readFileSync(path)) !== entry.hash) fail(`Tracked source hash differs from manifest: ${entry.source}`);
  }
  for (const source of markdownFiles(trackedSourceDir).map(repositoryPath)) {
    if (!registrySources.has(source)) fail(`Source missing from manifest: ${source}`);
  }
}

const historicalDir = resolve(repositoryDir, 'temp', 'examples');
if (existsSync(historicalDir)) {
  const actualHistorical = new Set(markdownFiles(historicalDir).map(repositoryPath));
  for (const path of actualHistorical) {
    if (!historicalPaths.has(path)) fail(`Historical source missing from manifest: ${path}`);
  }
  for (const entry of historicalMappings) {
    const historicalPath = resolve(repositoryDir, entry.historical);
    const trackedPath = resolve(repositoryDir, entry.source);
    if (!existsSync(historicalPath)) {
      fail(`Historical source does not exist: ${entry.historical}`);
    } else if (existsSync(trackedPath) && !readFileSync(historicalPath).equals(readFileSync(trackedPath))) {
      fail(`Historical source differs from tracked source: ${entry.historical}`);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

if (!repositoryCheckout && !existsSync(trackedSourceDir)) {
  console.log('Validated 49 source registrations and 85 curated examples; skipped repository source comparison because sources are unavailable.');
} else {
  console.log('Validated 49 tracked sources and 85 curated examples.');
}
