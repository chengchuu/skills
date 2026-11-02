#!/usr/bin/env node

import { appendFile, cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const sourceSkillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(sourceSkillRoot, "..", "..");
const failures = [];
let caseCount = 0;

async function copyTrackedSource(fixtureRoot) {
  await mkdir(path.join(fixtureRoot, "sources"), { recursive: true });
  await cp(
    path.join(repositoryRoot, "sources/pet-diary-notes"),
    path.join(fixtureRoot, "sources/pet-diary-notes"),
    { recursive: true },
  );
}

async function runCase(name, command, mutate, expected) {
  caseCount += 1;
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), "pet-diary-validator-"));
  const fixtureSkillRoot = path.join(fixtureRoot, "skills/pet-diary-notes");

  try {
    await mkdir(path.dirname(fixtureSkillRoot), { recursive: true });
    await cp(sourceSkillRoot, fixtureSkillRoot, { recursive: true });
    await mutate(fixtureRoot, fixtureSkillRoot);
    const result = spawnSync(process.execPath, [path.join(fixtureSkillRoot, "scripts", command)], {
      encoding: "utf8",
    });
    const output = `${result.stdout}${result.stderr}`;
    if (!expected(result.status, output)) failures.push(`${name}\nexit: ${result.status}\n${output}`);
  } finally {
    await rm(fixtureRoot, { recursive: true, force: true });
  }
}

await runCase(
  "accepts an independently installed skill without repository sources",
  "validate-references.mjs",
  async () => {},
  (status, output) => status === 0 && output.includes("skipped source comparison"),
);

await runCase(
  "accepts the registered tracked source",
  "validate-references.mjs",
  copyTrackedSource,
  status => status === 0,
);

await runCase(
  "rejects a missing tracked source in a Git checkout",
  "validate-references.mjs",
  async fixtureRoot => {
    await mkdir(path.join(fixtureRoot, ".git"));
  },
  (status, output) => status === 1
    && output.includes("Tracked source does not exist: sources/pet-diary-notes/pet.md"),
);

await runCase(
  "rejects an unregistered nested tracked source",
  "validate-references.mjs",
  async fixtureRoot => {
    await copyTrackedSource(fixtureRoot);
    const extra = path.join(fixtureRoot, "sources/pet-diary-notes/nested/unregistered.md");
    await mkdir(path.dirname(extra), { recursive: true });
    await writeFile(extra, "# Unregistered\n");
  },
  (status, output) => status === 1
    && output.includes("Unregistered tracked pet sources: sources/pet-diary-notes/nested/unregistered.md"),
);

await runCase(
  "rejects incorrect source metadata in a curated example",
  "validate-references.mjs",
  async (fixtureRoot, fixtureSkillRoot) => {
    await copyTrackedSource(fixtureRoot);
    const examplePath = path.join(fixtureSkillRoot, "references/examples/sleep-and-relaxation.md");
    const content = await readFile(examplePath, "utf8");
    await writeFile(
      examplePath,
      content.replace(
        "- Source path: `sources/pet-diary-notes/pet.md` (historical path: `temp/pet-examples/pet.md`)",
        "- Source path: `wrong/source.md`",
      ),
    );
  },
  (status, output) => status === 1
    && output.includes("does not reference the canonical and historical pet source paths"),
);

await runCase(
  "rejects a tracked source whose hash changed",
  "validate-references.mjs",
  async fixtureRoot => {
    await copyTrackedSource(fixtureRoot);
    await appendFile(path.join(fixtureRoot, "sources/pet-diary-notes/pet.md"), "\nChanged.\n");
  },
  (status, output) => status === 1
    && output.includes("Tracked source hash differs from manifest: sources/pet-diary-notes/pet.md"),
);

await runCase(
  "rejects duplicate source headings before rebuilding",
  "build-reference-corpus.mjs",
  async fixtureRoot => {
    await copyTrackedSource(fixtureRoot);
    await appendFile(
      path.join(fixtureRoot, "sources/pet-diary-notes/pet.md"),
      "\n## 26-0407-A-Sleepy-Afternoon\n\nzh:\n重复标题\n",
    );
  },
  (status, output) => status === 1 && output.includes("Duplicate source headings: 26-0407-A-Sleepy-Afternoon"),
);

if (failures.length > 0) {
  console.error(`Pet diary regression tests failed with ${failures.length} case${failures.length === 1 ? "" : "s"}:`);
  for (const failure of failures) console.error(`\n${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Passed ${caseCount} pet diary regression tests.`);
}
