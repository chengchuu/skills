# AGENTS.md

## Purpose

This repository publishes six reusable Codex skills as the skill-only `chengchuu-skills` plugin. It has no application server or runtime bundle. Codex discovers the manifest, evaluates skill metadata, and loads a matching skill on demand.

## Repository map

- `.codex-plugin/plugin.json` is the plugin entry point. Preserve the `chengchuu-skills` name and `"skills": "./skills/"` path; keep interface metadata aligned with the public skills.
- `skills/<skill-name>/SKILL.md` is each skill's entry point. Its frontmatter `name` must match the kebab-case directory, and `description` controls activation.
- `skills/*/agents/openai.yaml` contains user-facing metadata. `references/` holds API maps, rules, taxonomies, source manifests, and curated examples. `scripts/` contains corpus builders or reference validators.
- `scripts/validate-skills.mjs` is the repository validator. `package.json` maps both `npm run validate` and `npm test` to this validation flow.
- `README.md` defines shared documentation structure and behavior; `README.zh-CN.md` is its synchronized localization.
- `.editorconfig` defines formatting. `.github/workflows/validate.yml` runs validation with Node.js 22 on pull requests and pushes to `main`.

## Startup and data flow

Codex follows this path:

`plugin.json` → `skills/` → `SKILL.md` frontmatter → selected `SKILL.md` body → linked `references/` or bundled `scripts/` → generated guidance or artifact

Corpus-backed skills flow from read-only source material through maintenance scripts into tracked `references/examples/` and `source-manifest.md`. Run the relevant skill validator after corpus changes; do not hand-edit generated reference output independently.

## Change rules

Keep `SKILL.md` concise and link detailed material directly from it. Do not add secrets, absolute machine-specific paths, symlinks, editor state, temporary files, or unrelated dependencies.

`skills/prefer-mazey/` is synchronized from Mazey's `.agents/skills/prefer-mazey/`; `skills/prefer-layer/` is synchronized from layer-esm's `.agents/skills/prefer-layer/`. Change the owning repository first, run its synchronization command, and review each Git repository separately.

Keep both README files aligned in heading order, examples, commands, URLs, and identifiers. Preserve fenced code blocks across translations unless the example itself changes. Never commit a local Codex cachebuster to the source manifest.

## Build and validation

There is no compile step and no dependency installation is required. From the repository root, run:

```bash
npm run validate
git diff --check
```

The validator checks the manifest, skill layout, frontmatter, local Markdown links, temporary files, machine-specific paths, and likely secrets. Never stage, commit, push, publish, or modify another repository automatically.
