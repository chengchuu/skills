#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const migrationMapPath = resolve(repositoryRoot, 'sources', 'SOURCE_MIGRATION_MAP.md');
const expectedMigrationCount = 133;
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
  return relative(repositoryRoot, path).split('\\').join('/');
}

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

function normalizedRepositoryPath(path, prefix) {
  return path.startsWith(prefix)
    && !path.includes('\\')
    && path.slice(prefix.length).split('/').every(segment => segment !== '' && segment !== '.' && segment !== '..');
}

if (!existsSync(migrationMapPath)) fail('Missing sources/SOURCE_MIGRATION_MAP.md.');
const migrationMap = existsSync(migrationMapPath) ? readFileSync(migrationMapPath, 'utf8') : '';
const entries = [...migrationMap.matchAll(/^\| `(temp\/[^`]+\.md)` \| `(sources\/[^`]+\.md)` \| (\d+) \| `([a-f0-9]{64})` \|/gm)]
  .map(match => ({ original: match[1], source: match[2], bytes: Number(match[3]), hash: match[4] }));

const originalPaths = new Set(entries.map(entry => entry.original));
const sourcePaths = new Set(entries.map(entry => entry.source));
const hashes = new Set(entries.map(entry => entry.hash));
if (entries.length !== expectedMigrationCount || originalPaths.size !== expectedMigrationCount || sourcePaths.size !== expectedMigrationCount) {
  fail(`Migration map must contain ${expectedMigrationCount} unique original and destination paths; found ${entries.length} rows, ${originalPaths.size} originals, and ${sourcePaths.size} destinations.`);
}
if (hashes.size !== expectedMigrationCount) fail(`Migration map records ${expectedMigrationCount - hashes.size} byte-exact duplicate hash entries; expected none.`);
if (!migrationMap.includes(`Publication approval covers all ${expectedMigrationCount} files.`)) {
  fail(`Migration map does not record publication approval for all ${expectedMigrationCount} files.`);
}

const hardSecretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
];

for (const entry of entries) {
  if (!normalizedRepositoryPath(entry.original, 'temp/')) {
    fail(`Migration map contains an invalid historical path: ${entry.original}`);
  }
  if (!normalizedRepositoryPath(entry.source, 'sources/')) {
    fail(`Migration map contains an invalid canonical source path: ${entry.source}`);
  }
  const sourcePath = resolve(repositoryRoot, entry.source);
  if (!existsSync(sourcePath)) {
    fail(`Migrated source does not exist: ${entry.source}`);
    continue;
  }
  const content = readFileSync(sourcePath);
  if (content.length !== entry.bytes) fail(`Migrated source byte size differs from map: ${entry.source}`);
  if (sha256(content) !== entry.hash) fail(`Migrated source hash differs from map: ${entry.source}`);
  const text = content.toString('utf8');
  if (hardSecretPatterns.some(pattern => pattern.test(text))) fail(`Migrated source contains a hard-secret pattern: ${entry.source}`);

  const originalPath = resolve(repositoryRoot, entry.original);
  if (existsSync(originalPath) && !readFileSync(originalPath).equals(content)) {
    fail(`Migrated source differs byte-for-byte from original: ${entry.original}`);
  }
}

const migratedRoots = [
  resolve(repositoryRoot, 'sources', 'design-project-architecture', 'articles'),
  resolve(repositoryRoot, 'sources', 'pet-diary-notes'),
  resolve(repositoryRoot, 'sources', 'zh-technical-writing', 'legacy'),
  resolve(repositoryRoot, 'sources', 'zh-restaurant-reviews'),
];
for (const source of migratedRoots.flatMap(markdownFiles).map(repositoryPath)) {
  if (!sourcePaths.has(source)) fail(`Migrated source missing from migration map: ${source}`);
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log(`Validated ${expectedMigrationCount} approved source migrations, hashes, byte sizes, registrations, and available originals.`);
