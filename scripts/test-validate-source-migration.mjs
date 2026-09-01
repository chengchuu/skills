#!/usr/bin/env node

import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
let caseCount = 0;

async function runCase(name, mutate, expected) {
  caseCount += 1;
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), 'source-migration-validator-'));

  try {
    await mkdir(path.join(fixtureRoot, 'scripts'), { recursive: true });
    await cp(
      path.join(repositoryRoot, 'scripts/validate-source-migration.mjs'),
      path.join(fixtureRoot, 'scripts/validate-source-migration.mjs'),
    );
    await cp(path.join(repositoryRoot, 'sources'), path.join(fixtureRoot, 'sources'), { recursive: true });
    await mutate(fixtureRoot);
    const result = spawnSync(process.execPath, [path.join(fixtureRoot, 'scripts/validate-source-migration.mjs')], {
      encoding: 'utf8',
    });
    const output = `${result.stdout}${result.stderr}`;
    if (!expected(result.status, output)) failures.push(`${name}\nexit: ${result.status}\n${output}`);
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
}

await runCase('accepts the complete migration inventory', async () => {}, status => status === 0);

await runCase(
  'rejects a non-normalized historical path',
  async fixtureRoot => {
    const mapPath = path.join(fixtureRoot, 'sources/SOURCE_MIGRATION_MAP.md');
    const content = await readFile(mapPath, 'utf8');
    await writeFile(
      mapPath,
      content.replace(
        '`temp/examples/25-0302-1738-Food-神户-Gohanya.md`',
        '`temp/examples/../examples/25-0302-1738-Food-神户-Gohanya.md`',
      ),
    );
  },
  (status, output) => status === 1
    && output.includes('Migration map contains an invalid historical path:'),
);

if (failures.length > 0) {
  console.error(`Source migration regression tests failed with ${failures.length} case${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`\n${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Passed ${caseCount} source migration regression tests.`);
}
