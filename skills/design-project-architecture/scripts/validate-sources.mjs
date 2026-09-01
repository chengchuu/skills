#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillDir = resolve(scriptDir, '..');
const repositoryDir = resolve(skillDir, '..', '..');
const manifestPath = resolve(skillDir, 'references', 'source-manifest.md');
const trackedSourceDir = resolve(repositoryDir, 'sources', 'design-project-architecture', 'articles');
const trackedPrefix = 'sources/design-project-architecture/articles/';
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

function normalizedRelativePath(path) {
  return !path.includes('\\')
    && path.split('/').every(segment => segment !== '' && segment !== '.' && segment !== '..');
}

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

const manifest = readFileSync(manifestPath, 'utf8');
const coverage = manifest.slice(
  manifest.indexOf('## Corpus Coverage'),
  manifest.indexOf('## Tracked Article Sources'),
);
const coverageLabels = [...coverage.matchAll(/`([^`]+\.md)`/g)].map(match => match[1]);
const registry = [...manifest.matchAll(/^\| `([^`]+\.md)` \| `(sources\/design-project-architecture\/articles\/[^`]+\.md)` \| `([a-f0-9]{64})` \|$/gm)]
  .map(match => ({ label: match[1], source: match[2], hash: match[3] }));

if (coverageLabels.length !== 58 || new Set(coverageLabels).size !== 58) {
  fail(`source-manifest.md must contain 58 unique corpus coverage labels; found ${new Set(coverageLabels).size}.`);
}
if (registry.length !== 58) {
  fail(`source-manifest.md must register 58 tracked article sources; found ${registry.length}.`);
}

const registryLabels = new Set();
const registrySources = new Set();
for (const entry of registry) {
  if (registryLabels.has(entry.label)) fail(`Duplicate tracked provenance label: ${entry.label}`);
  if (registrySources.has(entry.source)) fail(`Duplicate tracked article source: ${entry.source}`);
  registryLabels.add(entry.label);
  registrySources.add(entry.source);
  if (!coverageLabels.includes(entry.label)) fail(`Tracked source label missing from corpus coverage: ${entry.label}`);
  if (!normalizedRelativePath(entry.label)) fail(`Invalid provenance label: ${entry.label}`);
  if (!entry.source.startsWith(trackedPrefix) || !normalizedRelativePath(entry.source.slice(trackedPrefix.length))) {
    fail(`Invalid tracked article source path: ${entry.source}`);
  }
}

const missingLabels = coverageLabels.filter(label => !registryLabels.has(label)).sort();
if (missingLabels.length > 0) {
  fail(`Unavailable provenance labels remain: ${missingLabels.join(', ')}`);
}

const repositoryCheckout = existsSync(resolve(repositoryDir, '.git'));
if (repositoryCheckout || existsSync(trackedSourceDir)) {
  for (const entry of registry) {
    const sourcePath = resolve(repositoryDir, entry.source);
    if (!existsSync(sourcePath)) {
      fail(`Manifest source does not exist: ${entry.source}`);
      continue;
    }
    const content = readFileSync(sourcePath);
    if (sha256(content) !== entry.hash) fail(`Tracked source hash differs from manifest: ${entry.source}`);
  }

  for (const source of markdownFiles(trackedSourceDir).map(repositoryPath)) {
    if (!registrySources.has(source)) fail(`Source missing from manifest: ${source}`);
  }
}

const historicalDir = resolve(repositoryDir, 'temp', 'writing-examples');
if (existsSync(historicalDir)) {
  for (const entry of registry) {
    const historicalLabel = entry.label === 'Pinned/25-0111-Git-Label.md'
      ? 'Pinned/25-0111_Git_Label.md'
      : entry.label;
    const historicalPath = resolve(historicalDir, historicalLabel);
    const trackedPath = resolve(repositoryDir, entry.source);
    if (
      existsSync(historicalPath)
      && existsSync(trackedPath)
      && !readFileSync(historicalPath).equals(readFileSync(trackedPath))
    ) {
      fail(`Historical source differs from tracked source: temp/writing-examples/${historicalLabel}`);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

if (!repositoryCheckout && !existsSync(trackedSourceDir)) {
  console.log('Validated 58 provenance labels and tracked-source registrations; skipped repository article comparison because sources are unavailable.');
} else {
  console.log('Validated 58 provenance labels and 58 tracked article sources.');
}
