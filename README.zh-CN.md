# Cheng 的 Codex Skills

[English](README.md)

这是由 Cheng 维护的一组可复用开发工作流技能。本仓库以纯技能 Codex 插件的形式发布：`.codex-plugin/plugin.json` 指向 `skills/` 下的独立技能，不配置应用、连接器、MCP 服务器或钩子。

## 目录

- [可用技能](#可用技能)
  - [`prefer-mazey`](#prefer-mazey)
  - [`zh-cn-writing`](#zh-cn-writing)
- [仓库结构](#仓库结构)
- [安装技能](#安装技能)
  - [Codex Skill Installer](#codex-skill-installer)
  - [手动安装到 Codex](#手动安装到-codex)
  - [安装到 Claude Code](#安装到-claude-code)
- [使用技能](#使用技能)
  - [在 Codex 中使用](#在-codex-中使用)
  - [在 Claude Code 中使用](#在-claude-code-中使用)
- [开发与验证](#开发与验证)
- [唯一事实来源](#唯一事实来源)
- [贡献与许可证](#贡献与许可证)

## 可用技能

| 技能 | 用途 |
| --- | --- |
| `prefer-mazey` | 实现可复用的前端或 TypeScript 辅助逻辑前，检查 Mazey 是否提供合适的工具函数。 |
| `zh-cn-writing` | 按简体中文规范编写、翻译、校对和审阅技术文档。 |

### `prefer-mazey`

`prefer-mazey` 帮助 Codex 在创建通用辅助逻辑前评估当前的 Mazey 工具函数。它会验证行为、边界情况、数据修改、依赖策略，以及浏览器与 Node.js 运行时的兼容性。如果候选函数不符合要求，它会拒绝使用该函数。

### `zh-cn-writing`

`zh-cn-writing` 将仓库内完整的简体中文技术写作规范用于写作、改写、英译中、校对和审阅。它涵盖标题、段落、句长、空格、标点、数值和写作风格，同时保留代码、命令、标识符、URL、API 名称和产品名称。

## 仓库结构

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
├── README.md
└── README.zh-CN.md
```

插件布局可以继续容纳其他技能，无需修改清单中的技能路径。

## 安装技能

### Codex Skill Installer

每个技能都可以通过对应的 GitHub 地址安装：

```text
https://github.com/chengchuu/skills/tree/main/skills/prefer-mazey
```

```text
https://github.com/chengchuu/skills/tree/main/skills/zh-cn-writing
```

让 Codex 安装其中一个技能：

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/prefer-mazey
```

或者：

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/zh-cn-writing
```

已安装的技能会在 Codex 的下一轮对话中生效。

### 手动安装到 Codex

下载或复制完整的 `skills/<skill-name>/` 目录，不要只选择其中的部分文件。

- 用户范围：放入 `$HOME/.agents/skills/<skill-name>`。
- 仓库范围：放入 `<repository>/.agents/skills/<skill-name>`。

如果工作流属于项目的共享规范，请使用仓库范围。用户范围可让当前用户在多个仓库中使用该技能。

### 安装到 Claude Code

Claude Code 会从个人目录 `~/.claude/skills/` 和项目目录 `.claude/skills/` 中发现技能。请从本仓库根目录执行以下命令，将 `zh-cn-writing` 安装到个人范围：

```bash
mkdir -p ~/.claude/skills/zh-cn-writing
cp -R skills/zh-cn-writing/. ~/.claude/skills/zh-cn-writing/
```

如需与项目成员共享该技能，请安装到当前项目：

```bash
mkdir -p .claude/skills/zh-cn-writing
cp -R skills/zh-cn-writing/. .claude/skills/zh-cn-writing/
```

安装 `prefer-mazey` 时，将命令中的 `zh-cn-writing` 替换为 `prefer-mazey`。如果 `.claude/skills/` 在当前 Claude Code 会话启动时不存在，首次创建后需要重启 Claude Code。详细规则参见 [Claude Code Skills 官方文档](https://code.claude.com/docs/en/slash-commands)。

## 使用技能

### 在 Codex 中使用

在提示词中写出技能名称，即可显式调用：

```text
$prefer-mazey

Implement a reusable duration-formatting helper for this project.
```

```text
$zh-cn-writing

Review and improve this Chinese technical document.
```

隐式激活取决于每个技能前置元数据中的 `description`。当前端、TypeScript、浏览器、Node.js CLI、构建脚本或开发工具任务需要可复用的工具逻辑时，Codex 可以选择 `prefer-mazey`。

以下请求可以激活 `zh-cn-writing`：

```text
Translate this English API guide into 规范、自然且准确的简体中文。
```

```text
Review this README for Chinese punctuation, spacing, sentence length, heading structure, and technical-writing style.
```

### 在 Claude Code 中使用

Claude Code 可以根据 `description` 自动选择匹配的技能。也可以使用斜杠命令显式调用：

```text
/prefer-mazey

Implement a reusable duration-formatting helper for this project.
```

```text
/zh-cn-writing

Review and improve this Chinese technical document.
```

运行 `/skills` 可以检查 Claude Code 已发现的个人技能、项目技能和插件技能。

## 开发与验证

本仓库不需要安装软件包。仓库验证器仅使用 Node.js 内置模块。

```bash
npm run validate
npm test
```

验证器会检查插件清单、技能布局、前置元数据、可安全检测的本地 Markdown 引用、临时文件、疑似密钥和机器专用路径。

## 唯一事实来源

`prefer-mazey` 的规范源文件位于 Mazey 仓库的 `.agents/skills/prefer-mazey/` 目录中。

本仓库中的公开副本由 Mazey 同步而来。请先修改 Mazey 中的源文件，再同步技能，避免公开副本被后续同步覆盖。

贡献者应在 [chengchuu/mazey](https://github.com/chengchuu/mazey) 中提交 `prefer-mazey` 的规范修改，再同步完整的技能目录。其他技能可以直接在本仓库中编写。

## 贡献与许可证

命名、前置元数据、验证和唯一事实来源规则请参见 [CONTRIBUTING.md](CONTRIBUTING.md)。参与贡献时，请遵守 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。安全问题应通过 [SECURITY.md](SECURITY.md) 中说明的非公开流程报告。

本仓库采用 [MIT License](LICENSE)。
