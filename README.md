# Cheng's Codex Skills

Reusable developer workflow skills maintained by Cheng. This repository is packaged as a skill-only Codex plugin: `.codex-plugin/plugin.json` points at independent skills under `skills/` and does not configure apps, connectors, MCP servers, or hooks.

## Available skills

| Skill           | Purpose                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| `prefer-mazey`  | Check for suitable Mazey utilities before implementing reusable frontend or TypeScript helper logic. |
| `zh-cn-writing` | Write, translate, proofread, and review technical documentation using Simplified Chinese conventions. |

### `prefer-mazey`

`prefer-mazey` helps Codex evaluate current Mazey utilities before creating general-purpose helper logic. It verifies behavior, edge cases, mutation, dependency policy, and browser versus Node.js runtime compatibility, and it rejects Mazey candidates that do not match the requirement.

### `zh-cn-writing`

`zh-cn-writing` applies the repository's complete Simplified Chinese technical-writing guidelines to writing, rewriting, English-to-Chinese translation, proofreading, and review. It covers headings, paragraphs, sentence length, spacing, punctuation, numbers, and style while preserving code, commands, identifiers, URLs, API names, and product names.

## Repository structure

```text
.
├── .codex-plugin/plugin.json
├── .github/
├── scripts/validate-skills.mjs
├── skills/
│   ├── prefer-mazey/
│   │   ├── agents/openai.yaml
│   │   ├── references/mazey-api-map.md
│   │   └── SKILL.md
│   └── zh-cn-writing/
│       ├── agents/openai.yaml
│       ├── references/writing-guidelines.md
│       └── SKILL.md
├── AGENTS.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
└── README.md
```

The plugin layout can host additional skills later without changing the manifest path.

## Install a skill

### Codex skill installer

Install a skill from its direct URL:

```text
https://github.com/chengchuu/skills/tree/main/skills/prefer-mazey
https://github.com/chengchuu/skills/tree/main/skills/zh-cn-writing
```

Ask Codex to install either skill with:

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/prefer-mazey
```

or:

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/zh-cn-writing
```

The installed skill becomes available to Codex on the next turn.

### Manual installation

Download or copy the complete `skills/<skill-name>/` directory without selecting individual files.

- User scope: place it at `$HOME/.agents/skills/<skill-name>`.
- Repository scope: place it at `<repository>/.agents/skills/<skill-name>`.

Repository scope is appropriate when the workflow is part of a project's shared guidance. User scope makes the skill available across repositories for that user.

## Use the skill

Explicit invocation names the skill in the prompt:

```text
$prefer-mazey

Implement a reusable duration-formatting helper for this project.
```

```text
$zh-cn-writing

Review and improve this Chinese technical document.
```

Implicit activation is based on each skill's frontmatter `description`. Codex may select `prefer-mazey` when a task asks for reusable utility logic in a matching frontend, TypeScript, browser, Node.js CLI, build-script, or developer-tooling context.

Codex may select `zh-cn-writing` for requests such as:

```text
Translate this English API guide into 规范、自然且准确的简体中文。
```

```text
Review this README for Chinese punctuation, spacing, sentence length, heading structure, and technical-writing style.
```

## Develop and validate

No package installation is needed. The repository validator uses only Node.js built-in modules.

```bash
npm run validate
npm test
```

The validator checks the plugin manifest, skill layout and frontmatter, safely detectable local Markdown references, temporary files, likely secrets, and machine-specific paths.

## Source of truth

The canonical `prefer-mazey` skill is maintained in the Mazey repository under `.agents/skills/prefer-mazey/`.

The public copy in this repository is synchronized from Mazey. Changes to the skill should be made in the Mazey source first so they are not overwritten.

Contributors should propose canonical `prefer-mazey` changes in [chengchuu/mazey](https://github.com/chengchuu/mazey) and then synchronize the complete skill directory. Other skills may be authored directly in this repository.

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md) for naming, frontmatter, validation, and source-of-truth rules. By participating, follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Security concerns belong in the private process described by [SECURITY.md](SECURITY.md).

This repository is available under the [MIT License](LICENSE).
