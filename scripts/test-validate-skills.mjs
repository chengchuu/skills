#!/usr/bin/env node

import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
let caseCount = 0;

async function runCase(name, mutate, expected) {
  caseCount += 1;
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), 'skills-validator-'));

  try {
    await mkdir(path.join(fixtureRoot, 'scripts'), { recursive: true });
    await mkdir(path.join(fixtureRoot, '.codex-plugin'), { recursive: true });
    await mkdir(path.join(fixtureRoot, 'skills'), { recursive: true });
    await cp(path.join(repositoryRoot, 'scripts/validate-skills.mjs'), path.join(fixtureRoot, 'scripts/validate-skills.mjs'));
    await cp(path.join(repositoryRoot, 'skills/prefer-layer'), path.join(fixtureRoot, 'skills/prefer-layer'), { recursive: true });
    await writeFile(path.join(fixtureRoot, '.codex-plugin/plugin.json'), '{"skills":"./skills/"}\n');
    await mutate(fixtureRoot);

    const result = spawnSync(process.execPath, [path.join(fixtureRoot, 'scripts/validate-skills.mjs')], {
      encoding: 'utf8',
    });
    const output = `${result.stdout}${result.stderr}`;
    if (!expected(result.status, output)) failures.push(`${name}\nexit: ${result.status}\n${output}`);
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
}

await runCase(
  'accepts a regular public source file',
  async fixtureRoot => {
    await mkdir(path.join(fixtureRoot, 'sources/example'), { recursive: true });
    await writeFile(path.join(fixtureRoot, 'sources/example/article.md'), '# Public source\n');
  },
  status => status === 0,
);

await runCase(
  'rejects machine paths and likely secrets in public sources',
  async fixtureRoot => {
    await mkdir(path.join(fixtureRoot, 'sources/example'), { recursive: true });
    await writeFile(
      path.join(fixtureRoot, 'sources/example/article.md'),
      `Source: ${'/Users'}/alice/private.md\nToken: ${'ghp_'}${'a'.repeat(24)}\n`,
    );
  },
  (status, output) => status === 1
    && output.includes('sources/example/article.md contains an absolute machine-specific path')
    && output.includes('sources/example/article.md appears to contain a secret or private key'),
);

await runCase(
  'rejects temporary files in public sources',
  async fixtureRoot => {
    await mkdir(path.join(fixtureRoot, 'sources/example'), { recursive: true });
    await writeFile(path.join(fixtureRoot, 'sources/example/draft.md.tmp'), 'Temporary source\n');
  },
  (status, output) => status === 1
    && output.includes('sources/example/draft.md.tmp is an obvious temporary or editor file'),
);

await runCase(
  'rejects symbolic links in public sources',
  async fixtureRoot => {
    await mkdir(path.join(fixtureRoot, 'sources/example'), { recursive: true });
    await writeFile(path.join(fixtureRoot, 'article.md'), '# External file\n');
    await symlink(path.join(fixtureRoot, 'article.md'), path.join(fixtureRoot, 'sources/example/article.md'));
  },
  (status, output) => status === 1
    && output.includes('sources/example/article.md is a symbolic link; public sources must contain regular files'),
);

if (failures.length > 0) {
  console.error(`Validator regression tests failed with ${failures.length} case${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`\n${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Passed ${caseCount} repository validator regression tests.`);
}
