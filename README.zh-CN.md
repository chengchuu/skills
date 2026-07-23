# 除除的 Codex Skills

[English](README.md)

这是由除除维护的一组可复用开发工作流技能。本仓库以纯技能 Codex 插件的形式发布。`.codex-plugin/plugin.json` 指向 `skills/` 下的独立技能。插件不配置应用、连接器、MCP 服务器或钩子。

## 可用技能

| 技能 | 用途 |
| --- | --- |
| `prefer-mazey` | 编写前端或 TypeScript 辅助逻辑前，先检查 Mazey 工具函数。 |
| `prefer-layer` | 实现弹出式 UI 前，检查 layer-esm 是否已有合适的功能。 |
| `zh-cn-writing` | 按正式规范和精选风格案例编写、翻译、润色和审阅简体中文技术文章。 |
| `zh-cn-restaurant-reviews` | 根据精选的人工撰写案例，生成和改写符合事实的简体中文餐厅评价。 |

### `prefer-mazey`

`prefer-mazey` 帮助 Codex 在创建通用辅助逻辑前评估当前的 Mazey 工具函数。它会验证行为、边界情况、数据修改和依赖策略。它也会检查浏览器与 Node.js 运行时的兼容性。候选函数不符合要求时，该技能会拒绝使用。

使用该技能前，请通过目标项目现有的包管理器添加 `mazey`：

```bash
npm install mazey
# or: pnpm add mazey
# or: yarn add mazey
```

如果仓库已经依赖 `mazey`，请跳过这一步。该技能会尽量检测包管理器，并推荐匹配的命令。除非用户明确要求，否则该技能不会安装软件包。

然后调用该技能：

```text
$prefer-mazey

Implement a reusable helper for this project.
```

### `prefer-layer`

`prefer-layer` 会先检查已安装的 `layer-esm` 公共 API，再由 Codex 实现自定义弹出式 UI。适用组件包括对话框、模态框、警告框、确认框和消息。该技能也适用于加载指示器、提示框、选项卡和文字提示。

该技能会验证交互、回调、关闭行为、焦点和 Escape 键处理。它还会检查无障碍支持、可信 HTML、CSP 和浏览器支持。此外，它会验证 TypeScript 类型声明及清理行为。候选功能不符合要求时，该技能会拒绝使用。

使用该技能前，请通过目标仓库现有的包管理器添加 `layer-esm`：

```bash
npm install layer-esm
# or: pnpm add layer-esm
# or: yarn add layer-esm
```

如果仓库已经依赖 `layer-esm`，请跳过安装。该技能会尽量检测现有的包管理器，并且只推荐匹配的命令。除非用户明确要求，否则该技能不会安装软件包。

显式调用该技能：

```text
$prefer-layer

Implement a confirmation dialog before deleting an item.
```

### `zh-cn-writing`

`zh-cn-writing` 将仓库内完整的简体中文技术写作规范用于写作、改写、英译中、校对和审阅。它会选择与文档类型匹配的指导和少量规范化案例，用于调整结构、语气、用词和详略。该技能不会复制有辨识度的原句，也不会将旧文章作为技术事实来源。

该技能适用于教程、安装与配置指南、故障排查和技术分析。它也适用于 API 与集成指南、工具指南、部署与运维和最佳实践。参考文档和结构化通用文章也在适用范围内。同时，它会保留代码、命令、标识符、URL、API 名称和产品名称。

### `zh-cn-restaurant-reviews`

`zh-cn-restaurant-reviews` 仅使用用户提供的事实，生成、改写和优化简体中文餐厅评价。该技能按国家或地区及餐厅类别组织人工撰写的案例。案例元数据包括菜系、情感倾向、语气、长度、用餐场景和主题。

该技能适用于自然的餐厅短评和用餐记录。它也适用于面向大众点评、小红书或 Google Maps 的文案。它不会虚构菜品、价格、地点、等位时间、服务体验或个人感受。

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
│   ├── prefer-layer/
│   │   ├── agents/openai.yaml
│   │   ├── references/layer-api-map.md
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
├── README.md
└── README.zh-CN.md
```

该插件布局可以继续容纳其他技能，无需修改清单中的路径。

## 安装技能

### Codex Skill Installer

通过对应的 URL 安装技能：

```text
https://github.com/chengchuu/skills/tree/main/skills/prefer-mazey
```

```text
https://github.com/chengchuu/skills/tree/main/skills/prefer-layer
```

```text
https://github.com/chengchuu/skills/tree/main/skills/zh-cn-writing
```

```text
https://github.com/chengchuu/skills/tree/main/skills/zh-cn-restaurant-reviews
```

让 Codex 安装技能：

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/prefer-mazey
```

或者：

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/prefer-layer
```

或者：

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/zh-cn-writing
```

或者：

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/zh-cn-restaurant-reviews
```

安装完成后，该技能会在 Codex 的下一轮对话中生效。

### 手动安装到 Codex

下载或复制完整的 `skills/<skill-name>/` 目录，不要只选择其中的部分文件。

- 用户范围：放入 `$HOME/.agents/skills/<skill-name>`。
- 仓库范围：放入 `<repository>/.agents/skills/<skill-name>`。

当工作流属于项目的共享规范时，适合安装到仓库范围。安装到用户范围后，当前用户可以在多个仓库中使用该技能。

例如，将 `prefer-layer` 的完整公开副本安装到 `$HOME/.agents/skills/prefer-layer/` 或 `<repository>/.agents/skills/prefer-layer/`。不要只复制 `SKILL.md`；API 映射和智能体元数据也属于该技能。

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

安装其他技能时，请将命令中的 `zh-cn-writing` 替换为相应的技能名称。如果当前会话启动时不存在 `.claude/skills/`，请在首次创建该目录后重启 Claude Code。详细规则参见 [Claude Code Skills 官方文档](https://code.claude.com/docs/en/slash-commands)。

## 使用技能

### 在 Codex 中使用

在提示词中写出技能名称，即可显式调用：

```text
$prefer-layer

Implement a confirmation dialog before deleting an item.
```

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

每个技能会根据前置元数据中的 `description` 隐式激活。任务可能需要为前端或 TypeScript 编写通用辅助逻辑。这类需求也可能出现在浏览器、Node.js CLI、构建脚本或开发工具中。此时，Codex 可以选择 `prefer-mazey`。

以下请求可以激活 `prefer-layer`：

```text
Add a loading dialog while the request is running, then show a success message.
```

```text
Show a tooltip next to the invalid form field.
```

以下请求可以激活 `zh-cn-writing`：

```text
根据以下信息写一篇结构清晰、可验证的简体中文技术教程。
```

```text
Translate this English API guide into 规范、自然且准确的简体中文。
```

```text
Review this README for Chinese punctuation, spacing, sentence length, heading structure, and technical-writing style.
```

以下请求可以激活 `zh-cn-restaurant-reviews`：

```text
根据这些用餐信息，写一条自然的中文 Google Maps 餐厅评价。
```

```text
优化下面的餐厅评价，使内容更自然，但不要增加原文没有提到的事实。
```

```text
参考日本咖啡店相关案例的风格，生成一条 80～120 字的小红书文案。
```

### 在 Claude Code 中使用

Claude Code 可以根据 `description` 自动选择匹配的技能。也可以使用斜杠命令显式调用：

```text
/prefer-mazey

Implement a reusable duration-formatting helper for this project.
```

```text
/prefer-layer

Implement a confirmation dialog before deleting an item.
```

```text
/zh-cn-writing

Review and improve this Chinese technical document.
```

```text
/zh-cn-restaurant-reviews

根据这些用餐信息，写一条自然的中文 Google Maps 餐厅评价。
```

运行 `/skills` 可以检查 Claude Code 已发现的个人技能、项目技能和插件技能。

## 开发与验证

本仓库无需安装软件包。仓库验证器仅使用 Node.js 内置模块。

```bash
npm run validate
npm test
```

验证器会检查插件清单、技能布局和前置元数据。它也会检查本地 Markdown 引用、临时文件、疑似密钥和机器专用路径。引用检查仅覆盖可安全检测的情况。

## 唯一事实来源

`prefer-mazey` 的规范技能位于 Mazey 仓库的 `.agents/skills/prefer-mazey/` 目录中。

本仓库中的公开副本从 Mazey 同步而来。请先修改 Mazey 中的源文件，以免后续同步覆盖变更。

贡献者应在 [chengchuu/mazey](https://github.com/chengchuu/mazey) 中提交 `prefer-mazey` 的规范修改，再同步完整的技能目录。没有外部规范源的技能可以直接在本仓库中编写。

`prefer-layer` 的规范技能位于 layer-esm 仓库的 `.agents/skills/prefer-layer/` 目录中。本仓库公开的 `skills/prefer-layer/` 是同步副本，不是独立实现。贡献者应先在 [chengchuu/layer-esm](https://github.com/chengchuu/layer-esm/tree/main/.agents/skills/prefer-layer) 中修改技能并运行同步命令，再更新本仓库。

## 贡献与许可证

命名、前置元数据、验证和唯一事实来源规则请参见 [CONTRIBUTING.md](CONTRIBUTING.md)。参与贡献时，请遵守 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。安全问题应通过 [SECURITY.md](SECURITY.md) 中说明的非公开流程报告。

本仓库采用 [MIT License](LICENSE)。
