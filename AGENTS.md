# AGENTS.md

## Purpose

This repository publishes six reusable Codex skills as the skill-only `chengchuu-skills` plugin: `prefer-mazey`, `prefer-layer`, `pet-diary-notes`, `en-technical-writing`, `zh-cn-writing`, and `zh-cn-restaurant-reviews`. It has no application server, compile step, or runtime bundle. Codex discovers the manifest, evaluates skill metadata, and loads a matching skill on demand.

## Repository map

- `.codex-plugin/plugin.json` is the plugin entry point. Preserve the `chengchuu-skills` name and `"skills": "./skills/"` path; keep its version aligned with `package.json`, keep interface metadata aligned with the public skills, and record releases in `CHANGELOG.md`.
- `skills/<skill-name>/SKILL.md` is each skill's entry point. Its frontmatter `name` must match the kebab-case directory, and `description` controls activation.
- `skills/*/agents/openai.yaml` contains user-facing metadata. `references/` holds API maps, rules, taxonomies, source manifests, and curated examples. `scripts/` contains corpus builders or reference validators.
- `scripts/validate-skills.mjs` validates the plugin and every public skill. `npm run validate` runs it directly; `npm test` runs it and then executes the `en-technical-writing` validator regression suite.
- `skills/en-technical-writing/scripts/` contains its reference validator and validator regression tests. `skills/pet-diary-notes/scripts/` contains its corpus builder and reference validator. `skills/zh-cn-writing/scripts/` contains its reference validator.
- `README.md` defines shared documentation structure and behavior; `README.zh-CN.md` is its synchronized localization.
- `assets/logo.png` is referenced by the plugin interface. Keep manifest asset paths repository-relative.
- `.editorconfig` defines formatting. `.github/workflows/validate.yml` runs validation with Node.js 22 on pull requests and pushes to `main`.

## Startup and data flow

Codex follows this path:

`plugin.json` → `skills/` → `SKILL.md` frontmatter → selected `SKILL.md` body → linked `references/` or bundled `scripts/` → generated guidance or artifact

Corpus-backed skills keep distributable examples and provenance under `references/examples/` and `source-manifest.md`. `pet-diary-notes` generates these files from its read-only source through `build-reference-corpus.mjs`; do not hand-edit builder-owned output independently. Other curated corpora may be maintained directly, but examples, taxonomy, routing, and source manifests must stay consistent. Run the relevant skill validator after any corpus or reference change.

## Change rules

Keep `SKILL.md` concise and link detailed material directly from it. Do not add secrets, absolute machine-specific paths, symlinks, editor state, temporary files, or unrelated dependencies.

`skills/prefer-mazey/` is synchronized from Mazey's `.agents/skills/prefer-mazey/`; `skills/prefer-layer/` is synchronized from layer-esm's `.agents/skills/prefer-layer/`. Change the owning repository first, run its synchronization command, and review each Git repository separately.

Keep both README files aligned in heading order, examples, commands, URLs, and identifiers. Preserve fenced code blocks across translations unless the example itself changes. Never commit a local Codex cachebuster to the source manifest.

Use only the builder and validator that belong to the skill being changed. Do not run a corpus builder merely to validate unrelated documentation, and do not assume local files under `temp/` are distributable skill content.

## Build and validation

No dependency installation is required; all repository and skill maintenance scripts use Node.js built-ins. From the repository root, run:

```bash
npm run validate
npm test
git diff --check
```

The repository validator checks the manifest, skill layout, frontmatter, local Markdown links, temporary files, symlinks, machine-specific paths, and likely secrets. `npm test` additionally runs the `en-technical-writing` reference-validator regression suite.

Run a skill-specific validator after changing its bundled references or corpus:

```bash
node skills/en-technical-writing/scripts/validate-references.mjs
node skills/pet-diary-notes/scripts/validate-references.mjs
node skills/zh-cn-writing/scripts/validate-references.mjs
```

Corpus validators may compare ignored source material under `temp/` when it is present. In that mode, provide the complete source set named by the skill's manifest; do not weaken the validator or remove provenance entries merely to accommodate an incomplete local source directory.

Never stage, commit, push, publish, or modify another repository automatically.
