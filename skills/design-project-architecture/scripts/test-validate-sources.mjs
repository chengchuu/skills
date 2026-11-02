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
    path.join(repositoryRoot, 'sources/design-project-architecture'),
    path.join(fixtureRoot, 'sources/design-project-architecture'),
    { recursive: true },
  );
}

async function runCase(name, mutate, expected) {
  caseCount += 1;
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), 'design-source-validator-'));
  const fixtureSkillRoot = path.join(fixtureRoot, 'skills/design-project-architecture');

  try {
    await mkdir(path.dirname(fixtureSkillRoot), { recursive: true });
    await cp(sourceSkillRoot, fixtureSkillRoot, { recursive: true });
    await mutate(fixtureRoot, fixtureSkillRoot);
    const result = spawnSync(process.execPath, [path.join(fixtureSkillRoot, 'scripts/validate-sources.mjs')], {
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
  (status, output) => status === 0 && output.includes('skipped repository article comparison'),
);

await runCase('accepts registered tracked sources', copyTrackedSources, status => status === 0);

await runCase(
  'rejects a missing tracked source in a Git checkout',
  async fixtureRoot => {
    await mkdir(path.join(fixtureRoot, '.git'));
  },
  (status, output) => status === 1
    && output.includes('Manifest source does not exist: sources/design-project-architecture/articles/17-0714_SQLServer.md'),
);

await runCase(
  'rejects an unregistered tracked source',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
    await writeFile(
      path.join(fixtureRoot, 'sources/design-project-architecture/articles/unregistered.md'),
      '# Unregistered\n',
    );
  },
  (status, output) => status === 1
    && output.includes('Source missing from manifest: sources/design-project-architecture/articles/unregistered.md'),
);

await runCase(
  'rejects a tracked source whose hash changed',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
    await appendFile(
      path.join(fixtureRoot, 'sources/design-project-architecture/articles/17-0714_SQLServer.md'),
      '\nChanged.\n',
    );
  },
  (status, output) => status === 1
    && output.includes('Tracked source hash differs from manifest: sources/design-project-architecture/articles/17-0714_SQLServer.md'),
);

await runCase(
  'rejects a non-normalized provenance label',
  async (fixtureRoot, fixtureSkillRoot) => {
    const manifestPath = path.join(fixtureSkillRoot, 'references/source-manifest.md');
    let content = await readFile(manifestPath, 'utf8');
    content = content.replace('- `17-0714_SQLServer.md`', '- `../17-0714_SQLServer.md`');
    content = content.replace(
      '| `17-0714_SQLServer.md` | `sources/design-project-architecture/articles/17-0714_SQLServer.md` |',
      '| `../17-0714_SQLServer.md` | `sources/design-project-architecture/articles/17-0714_SQLServer.md` |',
    );
    await writeFile(manifestPath, content);
  },
  (status, output) => status === 1
    && output.includes('Invalid provenance label: ../17-0714_SQLServer.md'),
);

await runCase(
  'accepts historical temp provenance when bytes match',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
    await mkdir(path.join(fixtureRoot, 'temp/writing-examples'), { recursive: true });
    await cp(
      path.join(fixtureRoot, 'sources/design-project-architecture/articles/17-0714_SQLServer.md'),
      path.join(fixtureRoot, 'temp/writing-examples/17-0714_SQLServer.md'),
    );
  },
  status => status === 0,
);

if (failures.length > 0) {
  console.error(`Validator regression tests failed with ${failures.length} case${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`\n${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Passed ${caseCount} design source validator regression tests.`);
}
