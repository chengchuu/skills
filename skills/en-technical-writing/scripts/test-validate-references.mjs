#!/usr/bin/env node

import { appendFile, cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
let caseCount = 0;

async function runCase(name, mutate, expected) {
  caseCount += 1;
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), 'en-technical-writing-validator-'));
  const fixtureRoot = path.join(temporaryRoot, 'skill');

  try {
    await cp(sourceRoot, fixtureRoot, { recursive: true });
    await mutate(fixtureRoot);
    const result = spawnSync(process.execPath, [path.join(fixtureRoot, 'scripts/validate-references.mjs')], {
      encoding: 'utf8',
    });
    const output = `${result.stdout}${result.stderr}`;
    if (!expected(result.status, output)) {
      failures.push(`${name}\nexit: ${result.status}\n${output}`);
    }
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

await runCase('accepts the unmodified skill', async () => {}, status => status === 0);

await runCase(
  'rejects missing progressive-disclosure routing',
  async fixtureRoot => {
    const skillPath = path.join(fixtureRoot, 'SKILL.md');
    const content = await readFile(skillPath, 'utf8');
    await writeFile(skillPath, content.replace('Match every applicable router row', 'Read the router'));
  },
  (status, output) => status === 1
    && output.includes('SKILL.md must preserve progressive disclosure: Match every applicable router row'),
);

await runCase(
  'rejects a missing AGENTS.md router row',
  async fixtureRoot => {
    const routerPath = path.join(fixtureRoot, 'references/README.md');
    const content = await readFile(routerPath, 'utf8');
    await writeFile(routerPath, content.split('\n').filter(line => !line.startsWith('| `AGENTS.md` creation or update')).join('\n'));
  },
  (status, output) => status === 1
    && output.includes('Reference router must include an AGENTS.md creation or update row'),
);

await runCase(
  'rejects missing AGENTS.md deliverable rows',
  async fixtureRoot => {
    const documentTypesPath = path.join(fixtureRoot, 'references/document-types.md');
    const content = await readFile(documentTypesPath, 'utf8');
    await writeFile(documentTypesPath, content.split('\n').filter(line => !line.startsWith('| `AGENTS.md`')).join('\n'));
  },
  (status, output) => status === 1
    && output.includes('Document types must include AGENTS.md in both deliverable tables; found 0 rows'),
);

await runCase(
  'rejects missing AGENTS.md extraction guidance',
  async fixtureRoot => {
    const documentTypesPath = path.join(fixtureRoot, 'references/document-types.md');
    const content = await readFile(documentTypesPath, 'utf8');
    await writeFile(documentTypesPath, content.replace('`guides/<topic>.md`', 'a separate guide'));
  },
  (status, output) => status === 1
    && output.includes('AGENTS.md document-type guidance must include: `guides/<topic>.md`'),
);

await runCase(
  'rejects out-of-order style precedence',
  async fixtureRoot => {
    const precedencePath = path.join(fixtureRoot, 'references/rule-precedence.md');
    const content = await readFile(precedencePath, 'utf8');
    await writeFile(
      precedencePath,
      content.replace(
        '1. **Current user instructions.**\n2. **Target repository or project conventions**',
        '1. **Target repository or project conventions**\n2. **Current user instructions.**',
      ),
    );
  },
  (status, output) => status === 1
    && output.includes('Rule precedence layers must remain in the required order'),
);

await runCase(
  'ignores precedence-layer terms outside the ordered section',
  async fixtureRoot => {
    const precedencePath = path.join(fixtureRoot, 'references/rule-precedence.md');
    const content = await readFile(precedencePath, 'utf8');
    await writeFile(precedencePath, `General American English defaults remain below Current user instructions.\n\n${content}`);
  },
  status => status === 0,
);

await runCase(
  'ignores AGENTS.md table rows in fenced examples',
  async fixtureRoot => {
    await appendFile(
      path.join(fixtureRoot, 'references/document-types.md'),
      '\n```markdown\n| `AGENTS.md` | Example |\n|:------------|:--------|\n| Value       | Value   |\n```\n',
    );
  },
  status => status === 0,
);

await runCase(
  'rejects missing repository-convention guidance',
  async fixtureRoot => {
    const guidelinePath = path.join(fixtureRoot, 'references/writing-guidelines.md');
    const content = await readFile(guidelinePath, 'utf8');
    await writeFile(guidelinePath, content.replace('Do not invent conventional architecture layers', 'Do not invent architecture'));
  },
  (status, output) => status === 1
    && output.includes('repository or protected-content rule marker: Do not invent conventional architecture layers'),
);

await runCase(
  'rejects missing protected generated-content guidance',
  async fixtureRoot => {
    const guidelinePath = path.join(fixtureRoot, 'references/writing-guidelines.md');
    const content = await readFile(guidelinePath, 'utf8');
    await writeFile(guidelinePath, content.replace('quotations, generated content', 'quotations'));
  },
  (status, output) => status === 1
    && output.includes('repository or protected-content rule marker: quotations, generated content'),
);

await runCase(
  'rejects missing repository or user table-layout precedence',
  async fixtureRoot => {
    const guidelinePath = path.join(fixtureRoot, 'references/writing-guidelines.md');
    const content = await readFile(guidelinePath, 'utf8');
    await writeFile(guidelinePath, content.replace('user or target repository explicitly requires it', 'another table layout is valid'));
  },
  (status, output) => status === 1
    && output.includes('repository or protected-content rule marker: user or target repository explicitly requires it'),
);

await runCase(
  'rejects a missing repository-convention review classification',
  async fixtureRoot => {
    const workflowPath = path.join(fixtureRoot, 'references/output-workflows.md');
    const content = await readFile(workflowPath, 'utf8');
    await writeFile(workflowPath, content.replace('**Repository-convention issue**', '**Project issue**'));
  },
  (status, output) => status === 1
    && output.includes('Review-only workflow must include the Repository-convention issue classification'),
);

await runCase(
  'rejects missing AGENTS.md repository-edit routing',
  async fixtureRoot => {
    const workflowPath = path.join(fixtureRoot, 'references/output-workflows.md');
    const content = await readFile(workflowPath, 'utf8');
    await writeFile(workflowPath, content.replace('[document-type guidance](document-types.md#agentsmd)', 'document-type guidance'));
  },
  (status, output) => status === 1
    && output.includes('Repository-edit workflow must include the AGENTS.md behavior marker: [document-type guidance](document-types.md#agentsmd)'),
);

await runCase(
  'rejects personal style above repository conventions',
  async fixtureRoot => {
    const personalStylePath = path.join(fixtureRoot, 'references/personal-style.md');
    const content = await readFile(personalStylePath, 'utf8');
    await writeFile(personalStylePath, content.replace('before an ecosystem profile', 'after an ecosystem profile'));
  },
  (status, output) => status === 1
    && output.includes('Personal style must remain below repository conventions and above lower-priority guidance'),
);

await runCase(
  'rejects missing Markdown table alignment guidance',
  async fixtureRoot => {
    const guidelinePath = path.join(fixtureRoot, 'references/writing-guidelines.md');
    const content = await readFile(guidelinePath, 'utf8');
    await writeFile(guidelinePath, content.replace('default every table column to left alignment', 'format Markdown tables consistently'));
  },
  (status, output) => status === 1
    && output.includes('Markdown table rule marker: default every table column to left alignment'),
);

await runCase(
  'rejects missing CJK display-width guidance',
  async fixtureRoot => {
    const guidelinePath = path.join(fixtureRoot, 'references/writing-guidelines.md');
    const content = await readFile(guidelinePath, 'utf8');
    await writeFile(guidelinePath, content.replace('CJK ideographs, kana, Hangul syllables, and full-width forms as two', 'all visible characters as one'));
  },
  (status, output) => status === 1
    && output.includes('Markdown table rule marker: CJK ideographs, kana, Hangul syllables, and full-width forms as two'),
);

await runCase(
  'rejects missing review-only Markdown table behavior',
  async fixtureRoot => {
    const workflowPath = path.join(fixtureRoot, 'references/output-workflows.md');
    const content = await readFile(workflowPath, 'utf8');
    await writeFile(workflowPath, content.replace('In review-only mode, report alignment or visual-width violations without rewriting', 'In review-only mode, handle violations carefully'));
  },
  (status, output) => status === 1
    && output.includes('Markdown table behavior marker: In review-only mode, report alignment or visual-width violations without rewriting'),
);

await runCase(
  'accepts query strings and Markdown link titles',
  async fixtureRoot => {
    await appendFile(
      path.join(fixtureRoot, 'references/README.md'),
      '\n[Query](writing-guidelines.md?view=full)\n'
        + '[Double title](terminology.md "Terminology")\n'
        + "[Single title](terminology.md 'Terminology')\n"
        + '[Parenthesized title](terminology.md (Terminology))\n',
    );
  },
  status => status === 0,
);

await runCase(
  'reports malformed encoded links without crashing',
  async fixtureRoot => {
    await appendFile(path.join(fixtureRoot, 'references/README.md'), '\n[Malformed](broken%ZZ.md)\n');
  },
  (status, output) => status === 1
    && output.includes('invalid encoded local link')
    && !output.includes('URIError'),
);

await runCase(
  'rejects links outside the skill',
  async fixtureRoot => {
    await appendFile(path.join(fixtureRoot, 'references/README.md'), '\n[Outside](../../README.md)\n');
  },
  (status, output) => status === 1 && output.includes('links outside the skill directory'),
);

await runCase(
  'rejects missing Markdown anchors',
  async fixtureRoot => {
    await appendFile(path.join(fixtureRoot, 'references/README.md'), '\n[Missing anchor](writing-guidelines.md#missing-heading)\n');
  },
  (status, output) => status === 1 && output.includes('links to missing Markdown anchor'),
);

await runCase(
  'accepts anchors derived from inline code headings',
  async fixtureRoot => {
    await appendFile(
      path.join(fixtureRoot, 'references/README.md'),
      '\n## Use `widget`\n\n[Widget](#use-widget)\n',
    );
  },
  status => status === 0,
);

await runCase(
  'ignores link syntax in code examples',
  async fixtureRoot => {
    await appendFile(
      path.join(fixtureRoot, 'references/README.md'),
      '\n```markdown\n[Example](not-a-real-reference.md)\n```\n',
    );
  },
  status => status === 0,
);

await runCase(
  'rejects missing reference-style link targets',
  async fixtureRoot => {
    await appendFile(
      path.join(fixtureRoot, 'references/README.md'),
      '\n[Broken][missing-ref]\n\n[missing-ref]: missing-reference.md\n',
    );
  },
  (status, output) => status === 1 && output.includes('links to missing local target'),
);

await runCase(
  'accepts non-HTTP URI schemes',
  async fixtureRoot => {
    await appendFile(
      path.join(fixtureRoot, 'references/README.md'),
      '\n[Archive](ftp://example.com/archive)\n',
    );
  },
  status => status === 0,
);

await runCase(
  'accepts a registered future ecosystem profile',
  async fixtureRoot => {
    await writeFile(
      path.join(fixtureRoot, 'references/profiles/typescript-docs.md'),
      '# TypeScript documentation profile\n',
    );
    await appendFile(
      path.join(fixtureRoot, 'references/README.md'),
      '\n- [profiles/typescript-docs.md](profiles/typescript-docs.md) applies to TypeScript documentation.\n',
    );
    await appendFile(
      path.join(fixtureRoot, 'references/source-manifest.md'),
      '\n- Skill reference: [typescript-docs.md](profiles/typescript-docs.md)\n',
    );
  },
  status => status === 0,
);

await runCase(
  'rejects an unregistered future ecosystem profile',
  async fixtureRoot => {
    await writeFile(
      path.join(fixtureRoot, 'references/profiles/typescript-docs.md'),
      '# TypeScript documentation profile\n',
    );
  },
  (status, output) => status === 1
    && output.includes('Reference router must register profiles/typescript-docs.md')
    && output.includes('Source manifest must register profiles/typescript-docs.md'),
);

await runCase(
  'rejects empty directories',
  async fixtureRoot => {
    await mkdir(path.join(fixtureRoot, 'references/empty'));
  },
  (status, output) => status === 1 && output.includes('Empty directory: references/empty'),
);

await runCase(
  'rejects empty files',
  async fixtureRoot => {
    await writeFile(path.join(fixtureRoot, 'references/empty.md'), '');
  },
  (status, output) => status === 1 && output.includes('references/empty.md must not be empty'),
);

await runCase(
  'scans non-Markdown metadata for paths and secrets',
  async fixtureRoot => {
    await appendFile(
      path.join(fixtureRoot, 'agents/openai.yaml'),
      `\n# ${'/Users'}/alice/private.txt\n# ${'ghp_'}${'a'.repeat(24)}\n`,
    );
  },
  (status, output) => status === 1
    && output.includes('agents/openai.yaml contains a machine-specific path')
    && output.includes('agents/openai.yaml contains a likely secret'),
);

await runCase(
  'rejects the retired Simplified Chinese writing temporary path',
  async fixtureRoot => {
    await appendFile(
      path.join(fixtureRoot, 'references/README.md'),
      `\nLegacy source: temp/${'zh-cn'}-writing/private.md\n`,
    );
  },
  (status, output) => status === 1
    && output.includes('references/README.md contains an obsolete temporary source path'),
);

await runCase(
  'rejects the renamed Simplified Chinese writing temporary path',
  async fixtureRoot => {
    await appendFile(
      path.join(fixtureRoot, 'references/README.md'),
      '\nCurrent source: temp/zh-technical-writing/private.md\n',
    );
  },
  (status, output) => status === 1
    && output.includes('references/README.md contains an obsolete temporary source path'),
);

if (failures.length > 0) {
  console.error(`Validator regression tests failed with ${failures.length} case${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) {
    console.error(`\n${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Passed ${caseCount} en-technical-writing validator regression tests.`);
}
