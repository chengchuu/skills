#!/usr/bin/env node

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = [
  'SKILL.md',
  'agents/openai.yaml',
  'references/README.md',
  'references/rule-precedence.md',
  'references/writing-guidelines.md',
  'references/terminology.md',
  'references/document-types.md',
  'references/output-workflows.md',
  'references/personal-style.md',
  'references/source-manifest.md',
  'references/foundations/google-style.md',
  'references/foundations/microsoft-voice.md',
  'references/profiles/react-docs.md',
  'scripts/validate-references.mjs',
];

const errors = [];
const warnings = [];
const contents = new Map();

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function stripFencedCode(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '');
}

function stripMarkdownCode(markdown) {
  return stripFencedCode(markdown).replace(/`[^`\n]*`/g, '');
}

function markdownAnchors(markdown) {
  const anchors = new Set();
  const counts = new Map();
  const prose = stripFencedCode(markdown);

  for (const line of prose.split(/\r?\n/)) {
    const heading = /^(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/.exec(line);
    if (heading) {
      const base = heading[2]
        .replace(/!?\[([^\]]*)]\([^)]+\)/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/[`*_~]/g, '')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s_-]/gu, '')
        .trim()
        .replace(/\s+/g, '-');
      if (base) {
        const count = counts.get(base) ?? 0;
        anchors.add(count === 0 ? base : `${base}-${count}`);
        counts.set(base, count + 1);
      }
    }

    for (const match of line.matchAll(/\bid=["']([^"']+)["']/g)) {
      anchors.add(match[1]);
    }
  }

  return anchors;
}

async function inspectTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const relativeDirectory = path.relative(skillRoot, directory) || '.';
  if (relativeDirectory !== '.' && entries.length === 0) {
    errors.push(`Empty directory: ${relativeDirectory}`);
  }

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(skillRoot, absolutePath);
    if (entry.isSymbolicLink()) {
      errors.push(`${relativePath} must not be a symbolic link.`);
      continue;
    }
    if (entry.isDirectory()) {
      await inspectTree(absolutePath);
      continue;
    }
    if (!entry.isFile()) {
      continue;
    }

    const fileStat = await stat(absolutePath);
    if (fileStat.size === 0) {
      errors.push(`${relativePath} must not be empty.`);
      continue;
    }
    if (!contents.has(relativePath)) {
      const content = await readFile(absolutePath);
      if (!content.includes(0)) {
        contents.set(relativePath, content.toString('utf8'));
      }
    }
  }
}

for (const relativePath of requiredFiles) {
  const absolutePath = path.join(skillRoot, relativePath);
  try {
    const fileStat = await stat(absolutePath);
    if (!fileStat.isFile() || fileStat.size === 0) {
      errors.push(`${relativePath} must be a non-empty file.`);
      continue;
    }
    contents.set(relativePath, await readFile(absolutePath, 'utf8'));
  } catch {
    errors.push(`Missing required file: ${relativePath}`);
  }
}

await inspectTree(skillRoot);

try {
  const referenceEntries = await readdir(path.join(skillRoot, 'references'));
  if (referenceEntries.includes('examples')) {
    errors.push('references/examples/ is not part of this skill design.');
  }
} catch {
  // The missing references directory is already reported through required files.
}

const layerReferencePaths = [];
for (const [directory, requiredEntries] of [
  ['references/foundations', ['google-style.md', 'microsoft-voice.md']],
  ['references/profiles', ['react-docs.md']],
]) {
  try {
    const entries = (await readdir(path.join(skillRoot, directory))).sort();
    for (const requiredEntry of requiredEntries) {
      if (!entries.includes(requiredEntry)) {
        errors.push(`${directory} is missing required file: ${requiredEntry}`);
      }
    }
    for (const entry of entries) {
      if (!entry.endsWith('.md')) {
        errors.push(`${directory} contains a non-Markdown layer file: ${entry}`);
        continue;
      }
      layerReferencePaths.push(`${directory.replace(/^references\//, '')}/${entry}`);
    }
  } catch {
    errors.push(`Missing required directory: ${directory}`);
  }
}

const skill = contents.get('SKILL.md') ?? '';
if (!/^---\nname: en-technical-writing\n/m.test(skill)) {
  errors.push('SKILL.md must declare name: en-technical-writing.');
}
if (!/^description: .*(American English|en-US)/m.test(skill)) {
  errors.push('SKILL.md description must identify its American English or en-US scope.');
}

const agent = contents.get('agents/openai.yaml') ?? '';
for (const value of [
  'display_name: "English Technical Writing"',
  'short_description:',
  'default_prompt:',
  '$en-technical-writing',
]) {
  if (!agent.includes(value)) {
    errors.push(`agents/openai.yaml must include ${value}`);
  }
}

const router = contents.get('references/README.md') ?? '';
for (const reference of [
  'rule-precedence.md',
  'writing-guidelines.md',
  'document-types.md',
  'output-workflows.md',
  'foundations/google-style.md',
  'foundations/microsoft-voice.md',
  'profiles/react-docs.md',
]) {
  if (!router.includes(reference)) {
    errors.push(`Reference router must link to ${reference}.`);
  }
}

const precedence = contents.get('references/rule-precedence.md') ?? '';
for (const layer of ['Current user instructions', 'Target repository or project conventions', 'Personal style overrides', 'Selected ecosystem profile', 'Google developer documentation foundation', 'Microsoft editorial voice', 'General American English defaults']) {
  if (!precedence.includes(layer)) {
    errors.push(`Rule precedence must include the ${layer} layer.`);
  }
}

const terminology = contents.get('references/terminology.md') ?? '';
if (!terminology.includes('American English (`en-US`)')) {
  errors.push('Terminology guidance must declare en-US as the default.');
}

const writingGuidelines = contents.get('references/writing-guidelines.md') ?? '';
for (const marker of [
  'default every table column to left alignment',
  'Use a leading colon in every separator cell',
  'Normalize each column to a consistent visual width',
  'Pad shorter cells with spaces so the pipes align vertically',
  'CJK ideographs, kana, Hangul syllables, and full-width forms as two',
  'separator cell the same display width as the padded cells',
  'fenced code blocks, block quotations, generated files, or protected source content',
  'For review-only requests',
]) {
  if (!writingGuidelines.includes(marker)) {
    errors.push(`Writing guidelines must include the Markdown table rule marker: ${marker}`);
  }
}

const outputWorkflows = contents.get('references/output-workflows.md') ?? '';
for (const marker of [
  '[Markdown table alignment and width rule](writing-guidelines.md#lists-tables-and-notices)',
  'In review-only mode, report alignment or visual-width violations without rewriting',
]) {
  if (!outputWorkflows.includes(marker)) {
    errors.push(`Output workflows must include the Markdown table behavior marker: ${marker}`);
  }
}

const manifest = contents.get('references/source-manifest.md') ?? '';
for (const marker of [
  'All sources were reviewed on 2026-07-30',
  'developers.google.com/style',
  'learn.microsoft.com/en-us/style-guide',
  'react.dev/learn',
  'Source type:',
  'Interpretation notes:',
  'Confidence:',
  'Last validation date:',
  'Personal overrides',
]) {
  if (!manifest.includes(marker)) {
    errors.push(`Source manifest must include ${marker}`);
  }
}
for (const referencePath of layerReferencePaths) {
  if (!router.includes(`(${referencePath})`)) {
    errors.push(`Reference router must register ${referencePath}.`);
  }
  if (!manifest.includes(`(${referencePath})`)) {
    errors.push(`Source manifest must register ${referencePath}.`);
  }
}

const markdownFiles = [...contents.entries()].filter(([relativePath]) => relativePath.endsWith('.md'));
const markdownLinkPattern = /!?\[[^\]]*]\(\s*(<[^>\n]+>|[^\s)\n]+)(?:\s+(?:"[^"\n]*"|'[^'\n]*'|\([^)\n]*\)))?\s*\)/g;
const referenceDefinitionPattern = /^[ \t]{0,3}\[([^\]]+)]:[ \t]*(<[^>\n]+>|[^\s]+)(?:[ \t]+(?:"[^"\n]*"|'[^'\n]*'|\([^)\n]*\)))?[ \t]*$/gm;
const referenceLinkPattern = /!?\[([^\]]+)]\[([^\]]*)]/g;

function normalizeReferenceLabel(label) {
  return label.trim().replace(/\s+/g, ' ').toLowerCase();
}

async function validateLocalDestination(relativePath, rawDestination) {
  let destination = rawDestination.trim();
  if (destination.startsWith('<')) {
    destination = destination.slice(1, -1);
  }
  if (!destination || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(destination) || destination.startsWith('//')) {
    return;
  }

  const hashIndex = destination.indexOf('#');
  const encodedFragment = hashIndex === -1 ? '' : destination.slice(hashIndex + 1);
  const encodedTarget = (hashIndex === -1 ? destination : destination.slice(0, hashIndex)).split('?', 1)[0];

  let target;
  let fragment;
  try {
    target = encodedTarget ? decodeURIComponent(encodedTarget) : '';
    fragment = encodedFragment ? decodeURIComponent(encodedFragment) : '';
  } catch {
    errors.push(`${relativePath} contains an invalid encoded local link: ${destination}`);
    return;
  }

  const sourcePath = path.join(skillRoot, relativePath);
  const targetPath = target
    ? path.resolve(path.dirname(sourcePath), target)
    : sourcePath;
  if (!isInside(skillRoot, targetPath)) {
    errors.push(`${relativePath} links outside the skill directory: ${destination}`);
    return;
  }

  let targetStat;
  try {
    targetStat = await stat(targetPath);
  } catch {
    errors.push(`${relativePath} links to missing local target: ${destination}`);
    return;
  }
  if (fragment && targetStat.isFile() && targetPath.endsWith('.md')) {
    const targetMarkdown = await readFile(targetPath, 'utf8');
    if (!markdownAnchors(targetMarkdown).has(fragment)) {
      errors.push(`${relativePath} links to missing Markdown anchor: ${destination}`);
    }
  }
}

for (const [relativePath, content] of markdownFiles) {
  const prose = stripMarkdownCode(content);
  for (const match of prose.matchAll(markdownLinkPattern)) {
    await validateLocalDestination(relativePath, match[1]);
  }

  const definitions = new Map();
  for (const match of prose.matchAll(referenceDefinitionPattern)) {
    const label = normalizeReferenceLabel(match[1]);
    definitions.set(label, match[2]);
    await validateLocalDestination(relativePath, match[2]);
  }
  for (const match of prose.matchAll(referenceLinkPattern)) {
    const label = normalizeReferenceLabel(match[2] || match[1]);
    if (!definitions.has(label)) {
      errors.push(`${relativePath} uses an undefined Markdown reference: ${match[2] || match[1]}`);
    }
  }
}

for (const [relativePath, content] of contents) {
  if (/\/Users\/[^/\s]+\/|\/home\/[^/\s]+\/|[A-Z]:\\Users\\/i.test(content)) {
    errors.push(`${relativePath} contains a machine-specific path.`);
  }
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bAKIA[0-9A-Z]{16}\b|\bgh[pousr]_[A-Za-z0-9_]{20,}\b|\bsk-[A-Za-z0-9_-]{20,}\b/.test(content)) {
    errors.push(`${relativePath} contains a likely secret.`);
  }
}

for (const [relativePath, content] of markdownFiles) {
  if (/\b(?:TODO|TBD|FIXME)\b|\[TODO/i.test(content)) {
    errors.push(`${relativePath} contains placeholder text.`);
  }
  if (/temp\/(?:writing-examples|zh-cn-writing|source-dump)\//.test(content)) {
    errors.push(`${relativePath} contains an obsolete temporary source path.`);
  }
  if (/(?:^> .+\n){5,}/m.test(content)) {
    errors.push(`${relativePath} contains a possible copied source dump.`);
  }
}

const prose = markdownFiles
  .filter(([relativePath]) => relativePath !== 'references/terminology.md')
  .map(([, content]) => content)
  .join('\n')
  .replace(/```[\s\S]*?```/g, '')
  .replace(/`[^`]+`/g, '')
  .replace(/https?:\/\/\S+/g, '');
for (const [american, alternative] of [
  ['behavior', 'behaviour'],
  ['color', 'colour'],
  ['organization', 'organisation'],
  ['initialize', 'initialise'],
]) {
  if (new RegExp(`\\b${american}\\b`, 'i').test(prose) && new RegExp(`\\b${alternative}\\b`, 'i').test(prose)) {
    warnings.push(`Mixed spelling forms detected: ${american}/${alternative}. Review intentional examples and names.`);
  }
}

if (warnings.length > 0) {
  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`Error: ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Validated ${requiredFiles.length} required files for en-technical-writing.`);
}
