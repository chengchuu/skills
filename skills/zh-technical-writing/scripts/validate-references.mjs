#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillDir = resolve(scriptDir, '..');
const repositoryDir = resolve(skillDir, '..', '..');
const referencesDir = resolve(skillDir, 'references');
const examplesDir = resolve(referencesDir, 'examples');
const manifestPath = resolve(referencesDir, 'source-manifest.md');
const writingGuidelinesPath = resolve(referencesDir, 'writing-guidelines.md');
const outputWorkflowsPath = resolve(referencesDir, 'output-workflows.md');
const sourceReferencePattern = '`((?:sources\\/zh-technical-writing|temp\\/writing-examples)\\/[^`]+\\.md)`';
const trackedSourcePrefix = 'sources/zh-technical-writing/';
const legacySourcePrefix = 'temp/writing-examples/';
const errors = [];

function fail(message) {
  errors.push(message);
}

function markdownFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return markdownFiles(path);
      return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
    })
    .sort();
}

function relativePath(path) {
  return relative(repositoryDir, path).split('\\').join('/');
}

function sourceReferences(content) {
  return [...content.matchAll(new RegExp(sourceReferencePattern, 'g'))].map((match) => match[1]);
}

function isNormalizedSourceReference(source) {
  const prefix = source.startsWith(trackedSourcePrefix)
    ? trackedSourcePrefix
    : source.startsWith(legacySourcePrefix)
      ? legacySourcePrefix
      : undefined;
  if (!prefix || source.includes('\\')) return false;
  const segments = source.slice(prefix.length).split('/');
  return segments.length > 0 && segments.every((segment) => segment !== '' && segment !== '.' && segment !== '..');
}

function validateLinks(path) {
  const content = readFileSync(path, 'utf8');
  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
  for (const match of content.matchAll(linkPattern)) {
    const target = match[1].trim().split('#', 1)[0];
    if (!target || /^[a-z]+:/i.test(target) || target.startsWith('#')) continue;
    if (!existsSync(resolve(dirname(path), target))) {
      fail(`${relativePath(path)} links to missing file ${target}`);
    }
  }
}

const exampleFiles = markdownFiles(examplesDir);
if (exampleFiles.length === 0) fail('No curated example files found.');

const exampleTitles = new Set();
const curatedSources = new Set();
for (const path of exampleFiles) {
  const content = readFileSync(path, 'utf8');
  if (!content.trim()) fail(`${relativePath(path)} is empty.`);
  if (/\/Users\//.test(content)) fail(`${relativePath(path)} contains a machine-specific path.`);

  const headings = [...content.matchAll(/^## Example: (.+)$/gm)];
  if (headings.length === 0) fail(`${relativePath(path)} has no normalized examples.`);
  headings.forEach((heading, index) => {
    const title = heading[1].trim();
    const start = heading.index;
    const end = headings[index + 1]?.index ?? content.length;
    const block = content.slice(start, end);
    if (exampleTitles.has(title)) fail(`Duplicate example title: ${title}`);
    exampleTitles.add(title);
    for (const label of ['Document type', 'Subject', 'Audience', 'Tone', 'Length', 'Source']) {
      if (!block.includes(`- ${label}:`)) fail(`${title} is missing ${label} metadata.`);
    }
    for (const source of sourceReferences(block)) {
      curatedSources.add(source);
    }
  });
}

const manifest = readFileSync(manifestPath, 'utf8');
if (/\/Users\//.test(manifest)) fail('source-manifest.md contains a machine-specific path.');
const manifestSources = sourceReferences(manifest);
const uniqueManifestSources = new Set(manifestSources);
if (manifestSources.length !== uniqueManifestSources.size) fail('source-manifest.md contains duplicate source paths.');
const declaredSourceCount = Number(/^- Source Markdown files analyzed: \*\*(\d+)\*\*\.$/m.exec(manifest)?.[1]);
if (!Number.isInteger(declaredSourceCount)) {
  fail('source-manifest.md is missing a valid source count.');
} else if (declaredSourceCount !== uniqueManifestSources.size) {
  fail(`source-manifest.md declares ${declaredSourceCount} sources, found ${uniqueManifestSources.size}.`);
}
const declaredExampleCount = Number(/^- Curated normalized examples: \*\*(\d+)\*\*\.$/m.exec(manifest)?.[1]);
if (!Number.isInteger(declaredExampleCount)) {
  fail('source-manifest.md is missing a valid curated example count.');
} else if (declaredExampleCount !== exampleTitles.size) {
  fail(`source-manifest.md declares ${declaredExampleCount} curated examples, found ${exampleTitles.size}.`);
}
for (const source of uniqueManifestSources) {
  if (!isNormalizedSourceReference(source)) fail(`source-manifest.md contains an invalid source path: ${source}`);
}

for (const line of manifest.split('\n')) {
  const source = line.match(new RegExp(`^\\| ${sourceReferencePattern} \\|`, 'i'))?.[1];
  if (!source || line.includes('| Not curated |')) continue;
  if (!curatedSources.has(source)) fail(`Curated manifest source missing from examples: ${source}`);
}

for (const destination of manifest.matchAll(/`(references\/examples\/[^`]+\.md)`/g)) {
  if (!existsSync(resolve(skillDir, destination[1]))) fail(`Missing manifest destination ${destination[1]}`);
}

const trackedSourceDir = resolve(repositoryDir, 'sources', 'zh-technical-writing');
const repositoryGitPath = resolve(repositoryDir, '.git');
if (existsSync(trackedSourceDir)) {
  const actualSources = new Set(markdownFiles(trackedSourceDir).map(relativePath));
  for (const path of actualSources) {
    if (!uniqueManifestSources.has(path)) fail(`Source missing from manifest: ${path}`);
  }
}

if (existsSync(repositoryGitPath) || existsSync(trackedSourceDir)) {
  for (const path of uniqueManifestSources) {
    if (isNormalizedSourceReference(path) && path.startsWith(trackedSourcePrefix) && !existsSync(resolve(repositoryDir, path))) {
      fail(`Manifest source does not exist: ${path}`);
    }
  }
}

const legacySourceDir = resolve(repositoryDir, 'temp', 'writing-examples');
if (existsSync(legacySourceDir)) {
  const actualSources = new Set(markdownFiles(legacySourceDir).map(relativePath));
  for (const path of actualSources) {
    const trackedEquivalent = path.replace(/^temp\/writing-examples\//, trackedSourcePrefix);
    if (!uniqueManifestSources.has(path) && !uniqueManifestSources.has(trackedEquivalent)) {
      fail(`Source missing from manifest: ${path}`);
    } else if (uniqueManifestSources.has(trackedEquivalent) && existsSync(resolve(repositoryDir, trackedEquivalent))) {
      const legacyContent = readFileSync(resolve(repositoryDir, path));
      const trackedContent = readFileSync(resolve(repositoryDir, trackedEquivalent));
      if (!legacyContent.equals(trackedContent)) {
        fail(`Legacy source differs from tracked source: ${path}`);
      }
    }
  }
  for (const path of uniqueManifestSources) {
    if (path.startsWith(legacySourcePrefix) && !actualSources.has(path)) {
      fail(`Manifest source does not exist: ${path}`);
    }
  }
}

for (const path of curatedSources) {
  if (!uniqueManifestSources.has(path)) fail(`Curated source missing from manifest: ${path}`);
}

const writingGuidelines = readFileSync(writingGuidelinesPath, 'utf8');
for (const marker of [
  '普通正文遵循“一段一行”',
  '仅在 Markdown 语义需要时换行',
  '不要使用 `<br>`、行尾双空格或单个源码换行实现视觉排版',
  '内容过长时，拆分为新的语义段落，不要在同一段内插入硬换行',
]) {
  if (!writingGuidelines.includes(marker)) fail(`writing-guidelines.md 缺少正文换行规则: ${marker}`);
}

for (const marker of [
  '创建纯文本围栏代码块时，使用 `plain` 信息字符串，不要使用 `text`',
  '不得修改代码块中的内容',
  '对于仅审阅任务，只报告不符合此约定的纯文本代码块',
]) {
  if (!writingGuidelines.includes(marker)) fail(`writing-guidelines.md 缺少纯文本内容块规则: ${marker}`);
}

for (const marker of [
  '默认将所有表格列设为左对齐',
  '在每个分隔单元格的开头添加冒号',
  '规范为一致的显示宽度',
  '使竖线在源码中垂直对齐',
  '中日韩表意文字、假名、韩文音节和全角字符按 2 个显示宽度计算',
  '分隔单元格必须与该列补齐后的单元格使用相同显示宽度',
  '代码块、引用块、生成文件或受保护源内容中的表格',
  '对于仅审阅任务',
]) {
  if (!writingGuidelines.includes(marker)) fail(`writing-guidelines.md 缺少 Markdown 表格规则: ${marker}`);
}

const outputWorkflows = readFileSync(outputWorkflowsPath, 'utf8');
for (const marker of [
  '[Markdown 表格对齐与宽度规则](writing-guidelines.md#表格)',
  'for review-only work, report alignment or display-width violations without rewriting',
]) {
  if (!outputWorkflows.includes(marker)) fail(`output-workflows.md 缺少 Markdown 表格工作流规则: ${marker}`);
}

for (const path of [resolve(skillDir, 'SKILL.md'), resolve(referencesDir, 'README.md'), writingGuidelinesPath, outputWorkflowsPath, ...exampleFiles]) {
  validateLinks(path);
}

for (const entry of readdirSync(examplesDir)) {
  const path = resolve(examplesDir, entry);
  if (statSync(path).isDirectory() && readdirSync(path).length === 0) {
    fail(`Empty example category directory: ${relativePath(path)}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log(`Validated ${uniqueManifestSources.size} source files and ${exampleTitles.size} curated examples.`);
