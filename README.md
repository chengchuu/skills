# Cheng's Codex Skills

Reusable developer workflow skills maintained by Cheng. This repository is packaged as a skill-only Codex plugin: `.codex-plugin/plugin.json` points at independent skills under `skills/` and does not configure apps, connectors, MCP servers, or hooks.

## Available skills

| Skill                       | Purpose                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `prefer-mazey`              | Check an existing Mazey dependency before implementing reusable frontend or TypeScript helper logic. |
| `zh-cn-writing`             | Write, translate, polish, and review zh-CN technical articles using formal rules and curated style examples. |
| `zh-cn-restaurant-reviews`  | Generate and rewrite factual Simplified Chinese restaurant reviews using curated handwritten examples. |

### `prefer-mazey`

`prefer-mazey` helps Codex evaluate current Mazey utilities before creating general-purpose helper logic. It verifies behavior, edge cases, mutation, dependency policy, and browser versus Node.js runtime compatibility, and it rejects Mazey candidates that do not match the requirement.

Before using the skill, add `mazey` to the target project with its existing package manager:

```bash
npm install mazey
# or: pnpm add mazey
# or: yarn add mazey
```

Skip this step when the repository already depends on `mazey`. The skill detects the package manager when possible and recommends the matching command, but it does not install packages unless the user explicitly requests installation.

Then invoke the skill:

```text
$prefer-mazey

Implement a reusable helper for this project.
```

### `zh-cn-writing`

`zh-cn-writing` applies the repository's complete Simplified Chinese technical-writing guidelines to writing, rewriting, English-to-Chinese translation, proofreading, and review. It selects document-type guidance and a small set of normalized examples to adapt structure, tone, vocabulary, and detail without copying distinctive wording or treating old articles as technical facts. It covers tutorials, installation and configuration, troubleshooting, technical analysis, API and integration guides, tool guides, deployment and operations, best practices, reference documents, and structured general articles while preserving code, commands, identifiers, URLs, API names, and product names.

### `zh-cn-restaurant-reviews`

`zh-cn-restaurant-reviews` generates, rewrites, and improves Simplified Chinese restaurant reviews using only facts supplied by the user. Its handwritten examples are organized by country or region and restaurant category, with metadata for cuisine, sentiment, tone, length, occasion, and topics. It supports natural restaurant comments, dining records, and requests targeting 大众点评、小红书, or Google Maps without inventing dishes, prices, locations, waits, service experiences, or personal reactions.

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
│   ├── zh-cn-restaurant-reviews/
│   │   ├── agents/openai.yaml
│   │   ├── references/
│   │   │   ├── examples/
│   │   │   ├── output-formats.md
│   │   │   ├── README.md
│   │   │   ├── source-manifest.md
│   │   │   ├── taxonomy.md
│   │   │   └── writing-rules.md
│   │   └── SKILL.md
│   └── zh-cn-writing/
│       ├── agents/openai.yaml
│       ├── references/
│       │   ├── examples/
│       │   ├── document-types.md
│       │   ├── output-workflows.md
│       │   ├── personal-style.md
│       │   ├── README.md
│       │   ├── source-manifest.md
│       │   ├── taxonomy.md
│       │   └── writing-guidelines.md
│       ├── scripts/validate-references.mjs
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
```

```text
https://github.com/chengchuu/skills/tree/main/skills/zh-cn-writing
```

```text
https://github.com/chengchuu/skills/tree/main/skills/zh-cn-restaurant-reviews
```

Ask Codex to install either skill with:

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/prefer-mazey
```

or:

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/zh-cn-writing
```

or:

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/zh-cn-restaurant-reviews
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
$zh-cn-writing

Review and improve this Chinese technical document.
```

```text
$zh-cn-writing

保持技术内容不变，参考我常用的故障排查文章结构重写这篇文章。
```

```text
$zh-cn-restaurant-reviews

根据以下信息生成一条大众点评评价：

- 国家：日本
- 城市：东京
- 类型：日式烧肉
- 推荐菜：牛舌、横膈膜
- 人均：180 元
- 等位：20 分钟
- 整体评价：满意
```

Implicit activation is based on each skill's frontmatter `description`. Codex may select `prefer-mazey` when a task asks for reusable utility logic in a matching frontend, TypeScript, browser, Node.js CLI, build-script, or developer-tooling context.

Codex may select `zh-cn-writing` for requests such as:

```text
根据以下信息写一篇结构清晰、可验证的简体中文技术教程。
```

```text
Translate this English API guide into 规范、自然且准确的简体中文。
```

```text
Review this README for Chinese punctuation, spacing, sentence length, heading structure, and technical-writing style.
```

Codex may select `zh-cn-restaurant-reviews` for requests such as:

```text
根据这些用餐信息，写一条自然的中文 Google Maps 餐厅评价。
```

```text
优化下面的餐厅评价，使内容更自然，但不要增加原文没有提到的事实。
```

```text
参考日本咖啡店相关案例的风格，生成一条 80～120 字的小红书文案。
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
