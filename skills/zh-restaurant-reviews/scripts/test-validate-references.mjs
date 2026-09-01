#!/usr/bin/env node

import { appendFile, cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const sourceSkillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = path.resolve(sourceSkillRoot, '..', '..');
const failures = [];
let caseCount = 0;

async function copyTrackedSources(fixtureRoot) {
  await mkdir(path.join(fixtureRoot, 'sources'), { recursive: true });
  await cp(
    path.join(repositoryRoot, 'sources/zh-restaurant-reviews'),
    path.join(fixtureRoot, 'sources/zh-restaurant-reviews'),
    { recursive: true },
  );
}

async function runCase(name, mutate, expected) {
  caseCount += 1;
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), 'restaurant-source-validator-'));
  const fixtureSkillRoot = path.join(fixtureRoot, 'skills/zh-restaurant-reviews');
  try {
    await mkdir(path.dirname(fixtureSkillRoot), { recursive: true });
    await cp(sourceSkillRoot, fixtureSkillRoot, { recursive: true });
    await mutate(fixtureRoot, fixtureSkillRoot);
    const result = spawnSync(process.execPath, [path.join(fixtureSkillRoot, 'scripts/validate-references.mjs')], {
      encoding: 'utf8',
    });
    const output = `${result.stdout}${result.stderr}`;
    if (!expected(result.status, output)) failures.push(`${name}\nexit: ${result.status}\n${output}`);
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
}

await runCase(
  'accepts an independently installed skill without repository sources',
  async () => {},
  (status, output) => status === 0 && output.includes('skipped repository source comparison'),
);

await runCase('accepts registered tracked sources', copyTrackedSources, status => status === 0);

await runCase(
  'rejects a missing tracked source in a Git checkout',
  async fixtureRoot => {
    await mkdir(path.join(fixtureRoot, '.git'));
  },
  (status, output) => status === 1
    && output.includes('Manifest source does not exist: sources/zh-restaurant-reviews/japan/25-0302-1738-Food-神户-Gohanya.md'),
);

await runCase(
  'rejects an unregistered tracked source',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
    await writeFile(path.join(fixtureRoot, 'sources/zh-restaurant-reviews/unregistered.md'), '# Unregistered\n');
  },
  (status, output) => status === 1
    && output.includes('Source missing from manifest: sources/zh-restaurant-reviews/unregistered.md'),
);

await runCase(
  'rejects a tracked source whose hash changed',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
    await appendFile(
      path.join(fixtureRoot, 'sources/zh-restaurant-reviews/japan/25-0302-1738-Food-神户-Gohanya.md'),
      '\nChanged.\n',
    );
  },
  (status, output) => status === 1
    && output.includes('Tracked source hash differs from manifest: sources/zh-restaurant-reviews/japan/25-0302-1738-Food-神户-Gohanya.md'),
);

await runCase(
  'rejects a stale per-source example count',
  async (fixtureRoot, fixtureSkillRoot) => {
    const manifestPath = path.join(fixtureSkillRoot, 'references/source-manifest.md');
    const content = await readFile(manifestPath, 'utf8');
    await writeFile(
      manifestPath,
      content.replace(
        '| `sources/zh-restaurant-reviews/japan/25-0302-1738-Food-神户-Gohanya.md` | `references/examples/japan/noodles-and-rice.md` | 1 |',
        '| `sources/zh-restaurant-reviews/japan/25-0302-1738-Food-神户-Gohanya.md` | `references/examples/japan/noodles-and-rice.md` | 2 |',
      ),
    );
  },
  (status, output) => status === 1
    && output.includes('declares 2 examples, found 1'),
);

await runCase(
  'accepts historical temp provenance when bytes match',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
    await mkdir(path.join(fixtureRoot, 'temp/examples'), { recursive: true });
    const manifest = await readFile(
      path.join(fixtureRoot, 'skills/zh-restaurant-reviews/references/source-manifest.md'),
      'utf8',
    );
    const mappings = [...manifest.matchAll(/^\| `(temp\/examples\/[^`]+\.md)` \| `(sources\/zh-restaurant-reviews\/[^`]+\.md)` \| `[a-f0-9]{64}` \|$/gm)];
    for (const match of mappings) {
      const destination = path.join(fixtureRoot, match[1]);
      await mkdir(path.dirname(destination), { recursive: true });
      await cp(path.join(fixtureRoot, match[2]), destination);
    }
  },
  status => status === 0,
);

if (failures.length > 0) {
  console.error(`Validator regression tests failed with ${failures.length} case${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`\n${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Passed ${caseCount} restaurant source validator regression tests.`);
}
