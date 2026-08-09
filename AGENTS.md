# AGENTS.md

## Purpose

This repository publishes seven reusable skills as the skill-only `cheng-skills` Codex plugin:

- `prefer-mazey`
- `prefer-layer`
- `design-project-architecture`
- `pet-diary-notes`
- `en-technical-writing`
- `zh-technical-writing`
- `zh-restaurant-reviews`

The repository has no application server, compile step, runtime bundle, apps, connectors, MCP servers, or hooks. Codex reads the plugin manifest, evaluates skill metadata, and loads a matching `SKILL.md` and its linked resources on demand.

## Repository map

- `.codex-plugin/plugin.json` is the plugin entry point. Preserve the `cheng-skills` name and `"skills": "./skills/"` path. Keep its clean release version aligned with `package.json`, keep its interface metadata aligned with the public skills, and keep asset paths repository-relative.
- `package.json` contains release metadata and the dependency-free `validate` and `test` commands. It defines no runtime dependencies or application build output.
- `skills/<skill-name>/SKILL.md` is each public skill's entry point. The frontmatter `name` must match the kebab-case directory name, and `description` controls activation.
- `skills/*/agents/openai.yaml` contains user-facing display metadata and optional icon paths. Keep prompts and descriptions consistent with the corresponding skill, and resolve icon paths from the metadata file without duplicating assets unnecessarily.
- `skills/*/references/` contains API maps, routing indexes, rules, taxonomies, provenance manifests, and curated examples. `skills/*/scripts/` contains corpus builders and reference validators owned by the corresponding skill.
- `scripts/validate-skills.mjs` validates the plugin path and public skill layout. Within each public skill, it checks frontmatter, local Markdown links, temporary files, symlinks, machine-specific paths, and likely secrets; it also rejects public `SKILL.md` files outside `skills/`.
- `README.md` documents skill discovery, individual installation, GitHub Copilot app installation, personal-marketplace plugin installation, usage, and contribution workflows. `README.zh-CN.md` is the corresponding Simplified Chinese localization and must stay aligned as described below.
- `CHANGELOG.md` records release-level changes. `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, and the files under `.github/` define the public contribution, reporting, and review workflows.
- `assets/logo.png` is the shared plugin logo and is also referenced by skill metadata where needed.
- `.editorconfig` defines UTF-8, LF line endings, two-space indentation, and final-newline behavior. Markdown files may retain trailing whitespace when it is meaningful.
- `.github/workflows/validate.yml` runs `npm run validate` with Node.js 22 for pull requests and pushes to `main`. It does not run the skill-specific validators, `npm test`, or `git diff --check`; run those locally when required below.

## Skill ownership and generated content

- `skills/prefer-mazey/` is synchronized from Mazey's `.agents/skills/prefer-mazey/` directory. Make canonical changes in Mazey first, run its synchronization command, and review the Mazey and skills repositories separately.
- `skills/prefer-layer/` is synchronized from layer-esm's `.agents/skills/prefer-layer/` directory. Make canonical changes in layer-esm first, run its synchronization command, and review both repositories separately.
- `skills/design-project-architecture/references/` is maintained in this repository. It contains Cheng's technical profile, architecture decision guidance, reusable package and project patterns, frontend ESLint defaults, and relative provenance labels distilled from a private article corpus. Do not add the corpus's machine-specific path or treat historical articles as current technical authority.
- `skills/pet-diary-notes/scripts/build-reference-corpus.mjs` owns the generated files under `skills/pet-diary-notes/references/examples/` and its `source-manifest.md`. The builder reads the ignored source at `temp/pet-examples/pet.md` and combines it with explicitly maintained supplemental examples. Do not hand-edit builder-owned output independently.
- `skills/en-technical-writing/` keeps its layered rules and source provenance directly under `references/`. Its validator requires the router and source manifest to register future profiles and rejects a `references/examples/` directory.
- `skills/zh-technical-writing/references/examples/` and `source-manifest.md` are directly curated distributable content. Its validator performs additional source-completeness checks when the full ignored `temp/writing-examples/` directory is present.
- `skills/zh-restaurant-reviews/references/` is directly curated. Keep examples, routing, taxonomy, output formats, and `source-manifest.md` consistent. This skill currently has no standalone validator, so use the repository validator and targeted corpus checks.

Files under `temp/` are read-only maintenance inputs, not distributable plugin content. Do not create, regenerate, or remove corpus data merely to validate an unrelated change.

## Discovery and data flow

Codex follows this path:

`plugin.json` → `skills/` → `SKILL.md` frontmatter → selected `SKILL.md` body → linked `references/` or bundled `scripts/` → generated guidance or artifact

Keep each `SKILL.md` concise and focused on its decision workflow. Move detailed rules and catalogs into directly linked references, and use progressive disclosure so routine tasks load only the smallest relevant reference set.

## Change rules

- Keep public skills self-contained. Do not add secrets, credentials, private data, absolute machine-specific paths, symlinks, editor state, temporary files, copied source dumps, or unrelated dependencies.
- Preserve code, commands, identifiers, paths, URLs, package names, API names, versions, and documented behavior unless the task explicitly changes them.
- Keep `README.md` and `README.zh-CN.md` aligned in heading order, installation methods, examples, commands, URLs, and identifiers. Preserve corresponding fenced code blocks unless the example itself changes.
- Keep `.codex-plugin/plugin.json` and `package.json` on the same clean release version, and record releases in `CHANGELOG.md`. Apply a Codex cachebuster only to the separate personal-marketplace copy during local installation; never commit it to this repository's manifest.
- Use only the builder and validator owned by the skill being changed. Do not run a corpus builder as a generic formatting or validation step.
- Keep changes narrow and preserve unrelated work. Never stage, commit, push, publish, or modify another repository automatically.

## Build and validation

No dependency installation is required. Repository and skill maintenance scripts use Node.js built-in modules.

Run the full repository checks from the repository root after changing `AGENTS.md`, plugin metadata, repository structure, a public skill, or shared documentation:

```bash
npm run validate
npm test
git diff --check
```

`npm test` reruns the repository validator and executes the `en-technical-writing` reference-validator regression suite.

After changing bundled references or corpus content, run the validator for the affected skill. The English skill also has a regression suite for its validator:

```bash
node skills/en-technical-writing/scripts/validate-references.mjs
node skills/en-technical-writing/scripts/test-validate-references.mjs
node skills/pet-diary-notes/scripts/validate-references.mjs
node skills/zh-technical-writing/scripts/validate-references.mjs
```

`zh-restaurant-reviews` has no standalone validator. Validate its reference links, taxonomy, formats, and source-manifest coverage with targeted checks in addition to the repository commands.

When the complete pet source is present and intentionally changed, rebuild and then validate its generated corpus:

```bash
node skills/pet-diary-notes/scripts/build-reference-corpus.mjs
node skills/pet-diary-notes/scripts/validate-references.mjs
```

If a validator enables source-completeness checks because an ignored `temp/` source directory exists, provide the complete source set named by the skill's manifest. Do not weaken the validator, delete provenance entries, or rebuild from an incomplete source directory merely to make validation pass.
