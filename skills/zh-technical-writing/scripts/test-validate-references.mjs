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
    path.join(repositoryRoot, 'sources/zh-technical-writing'),
    path.join(fixtureRoot, 'sources/zh-technical-writing'),
    { recursive: true },
  );
}

async function populateLegacySources(fixtureRoot) {
  const manifestPath = path.join(fixtureRoot, 'skills/zh-technical-writing/references/source-manifest.md');
  const manifest = await readFile(manifestPath, 'utf8');
  const sources = [...manifest.matchAll(/`((?:sources\/zh-technical-writing|temp\/writing-examples)\/[^`]+\.md)`/g)]
    .map(match => match[1]);

  for (const source of sources) {
    const legacy = source.replace(/^sources\/zh-technical-writing\//, 'temp/writing-examples/');
    const destination = path.join(fixtureRoot, legacy);
    await mkdir(path.dirname(destination), { recursive: true });
    if (source.startsWith('sources/zh-technical-writing/')) {
      await writeFile(destination, await readFile(path.join(fixtureRoot, source)));
    } else {
      await writeFile(destination, '');
    }
  }
}

async function runCase(name, mutate, expected) {
  caseCount += 1;
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), 'zh-technical-writing-validator-'));
  const fixtureSkillRoot = path.join(fixtureRoot, 'skills/zh-technical-writing');

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

await runCase('accepts an independently installed skill without repository sources', async () => {}, status => status === 0);

await runCase(
  'accepts registered tracked sources',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
  },
  status => status === 0,
);

await runCase(
  'rejects a missing tracked source in a source archive',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
    await rm(path.join(fixtureRoot, 'sources/zh-technical-writing/26-0613-macOS-scutil.md'));
  },
  (status, output) => status === 1
    && output.includes('Manifest source does not exist: sources/zh-technical-writing/26-0613-macOS-scutil.md'),
);

await runCase(
  'rejects a missing tracked source directory in a Git checkout',
  async fixtureRoot => {
    await mkdir(path.join(fixtureRoot, '.git'));
  },
  (status, output) => status === 1
    && output.includes('Manifest source does not exist: sources/zh-technical-writing/26-0613-macOS-scutil.md'),
);

await runCase(
  'rejects an unregistered tracked source',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
    await writeFile(path.join(fixtureRoot, 'sources/zh-technical-writing/unregistered.md'), '# Unregistered\n');
  },
  (status, output) => status === 1
    && output.includes('Source missing from manifest: sources/zh-technical-writing/unregistered.md'),
);

await runCase(
  'accepts byte-identical legacy copies of migrated sources',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
    await populateLegacySources(fixtureRoot);
  },
  status => status === 0,
);

await runCase(
  'rejects a legacy source that differs from its tracked replacement',
  async fixtureRoot => {
    await copyTrackedSources(fixtureRoot);
    await populateLegacySources(fixtureRoot);
    await appendFile(path.join(fixtureRoot, 'temp/writing-examples/26-0613-macOS-scutil.md'), '\nChanged legacy content.\n');
  },
  (status, output) => status === 1
    && output.includes('Legacy source differs from tracked source: temp/writing-examples/26-0613-macOS-scutil.md'),
);

await runCase(
  'rejects non-normalized source references',
  async (fixtureRoot, fixtureSkillRoot) => {
    await appendFile(
      path.join(fixtureSkillRoot, 'references/source-manifest.md'),
      '\nInvalid source: `sources/zh-technical-writing/../escape.md`\n',
    );
  },
  (status, output) => status === 1
    && output.includes('source-manifest.md contains an invalid source path: sources/zh-technical-writing/../escape.md'),
);

await runCase(
  'rejects missing paragraph line-break guidance',
  async (fixtureRoot, fixtureSkillRoot) => {
    const guidelinePath = path.join(fixtureSkillRoot, 'references/writing-guidelines.md');
    const content = await readFile(guidelinePath, 'utf8');
    await writeFile(guidelinePath, content.replace('普通正文遵循“一段一行”', '普通正文保持清晰'));
  },
  (status, output) => status === 1
    && output.includes('writing-guidelines.md 缺少正文换行规则: 普通正文遵循“一段一行”'),
);

await runCase(
  'rejects stale manifest summary counts',
  async (fixtureRoot, fixtureSkillRoot) => {
    const manifestPath = path.join(fixtureSkillRoot, 'references/source-manifest.md');
    const content = await readFile(manifestPath, 'utf8');
    await writeFile(manifestPath, content.replace('Source Markdown files analyzed: **84**', 'Source Markdown files analyzed: **83**'));
  },
  (status, output) => status === 1
    && output.includes('source-manifest.md declares 83 sources, found 84'),
);

if (failures.length > 0) {
  console.error(`Validator regression tests failed with ${failures.length} case${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`\n${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Passed ${caseCount} zh-technical-writing validator regression tests.`);
}
