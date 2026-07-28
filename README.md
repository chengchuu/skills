# Codex Skills

Reusable developer workflow skills packaged as a skill-only Codex plugin. The `.codex-plugin/plugin.json` manifest points at independent skills under `skills/` and does not configure apps, connectors, MCP servers, or hooks.

## Table of contents

- [Codex Skills](#codex-skills)
  - [Table of contents](#table-of-contents)
  - [Available skills](#available-skills)
  - [Install a skill](#install-a-skill)
    - [Codex skill installer](#codex-skill-installer)
    - [Manual installation](#manual-installation)
  - [Use the skill](#use-the-skill)
    - [`prefer-mazey`](#prefer-mazey)
    - [`prefer-layer`](#prefer-layer)
    - [`zh-cn-writing`](#zh-cn-writing)
    - [`zh-cn-restaurant-reviews`](#zh-cn-restaurant-reviews)
    - [`pet-diary-notes`](#pet-diary-notes)
  - [Develop and validate](#develop-and-validate)
  - [Source of truth](#source-of-truth)
  - [Contributing and license](#contributing-and-license)

## Available skills

| Skill                       | Purpose                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `prefer-mazey`              | Check an existing Mazey dependency before implementing reusable frontend or TypeScript helper logic. |
| `prefer-layer`              | Check an existing layer-esm dependency before implementing dialog and popup UI.                      |
| `zh-cn-writing`             | Write, translate, polish, and review zh-CN technical articles using formal rules and curated style examples. |
| `zh-cn-restaurant-reviews`  | Generate and rewrite factual Simplified Chinese restaurant reviews using curated handwritten examples. |
| `pet-diary-notes`           | Generate multilingual diary-style pet captions and short Plog or Vlog records from factual user input and curated examples. |

## Install a skill

### Codex skill installer

Ask Codex to install a skill with:

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/prefer-mazey
```

The installed skill becomes available to Codex on the next turn.

### Manual installation

Download or copy the complete `skills/<skill-name>/` directory without selecting individual files.

- User scope: place it at `$HOME/.agents/skills/<skill-name>`.
- Repository scope: place it at `<repository>/.agents/skills/<skill-name>`.

Repository scope is appropriate when the workflow is part of a project's shared guidance. User scope makes the skill available across repositories for that user.

For example, manually install the complete public copy of `prefer-layer` as either `$HOME/.agents/skills/prefer-layer/` or `<repository>/.agents/skills/prefer-layer/`. Do not copy only `SKILL.md`; its API map and agent metadata are part of the skill.

## Use the skill

Use the matching skill explicitly or let Codex activate it from the request.

### `prefer-mazey`

Before using `prefer-mazey`, add `mazey` to the target project with its existing package manager:

```bash
npm install mazey
# or: pnpm add mazey
# or: yarn add mazey
```

Skip this step when the repository already depends on `mazey`. The skill detects the package manager when possible and recommends the matching command, but it does not install packages unless the user explicitly requests installation.

Implicit activation is based on each skill's frontmatter `description`. Codex may select `prefer-mazey` when a task asks for reusable utility logic in a matching frontend, TypeScript, browser, Node.js CLI, build-script, or developer-tooling context.

### `prefer-layer`

```text
$prefer-layer

Implement a confirmation dialog before deleting an item.
```

Codex may select `prefer-layer` for requests such as:

```text
Add a loading dialog while the request is running, then show a success message.
```

```text
Show a tooltip next to the invalid form field.
```

### `zh-cn-writing`

```text
$zh-cn-writing

Review and improve this Chinese technical document.
```

```text
$zh-cn-writing

保持技术内容不变，参考我常用的故障排查文章结构重写这篇文章。
```

Codex may select `zh-cn-writing` for requests such as:

```text
Review this README for Chinese punctuation, spacing, sentence length, heading structure, and technical-writing style.
```

```text
Translate this English API guide into 规范、自然且准确的简体中文。
```

```text
根据以下信息写一篇结构清晰、可验证的简体中文技术教程。
```

### `zh-cn-restaurant-reviews`

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

### `pet-diary-notes`

```text
$pet-diary-notes

根据以下场景生成中文、英文和日文宠物日记文案：

- 宠物：嘟嘟
- 内容形式：Plog
- 场景：趴在窗边看雨
- 氛围：安静、治愈
- 内容类型：Real-life
- 日期：2025-03-07
- 平台：多平台
- BGM：未指定
```

Codex may select `pet-diary-notes` for requests such as:

```text
Generate Chinese, English, and Japanese diary-style captions for photos and videos of my sleepy cat.
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

Contributors should propose canonical `prefer-mazey` changes in [chengchuu/mazey](https://github.com/chengchuu/mazey) and then synchronize the complete skill directory. Skills without an external canonical source may be authored directly in this repository.

The canonical `prefer-layer` skill is maintained in the layer-esm repository under `.agents/skills/prefer-layer/`. The public `skills/prefer-layer/` directory is a synchronized copy, not an independent implementation. Contributors should make skill changes in [chengchuu/layer-esm](https://github.com/chengchuu/layer-esm/tree/main/.agents/skills/prefer-layer) and run its synchronization command before updating this repository.

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md) for naming, frontmatter, validation, and source-of-truth rules. By participating, follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Security concerns belong in the private process described by [SECURITY.md](SECURITY.md).

This repository is available under the [MIT License](LICENSE).
