# Codex Skills

本仓库将可复用的开发工作流技能发布为纯技能 Codex 插件。`.codex-plugin/plugin.json` 清单指向 `skills/` 下相互独立的技能，不配置应用、连接器、MCP 服务器或钩子。

## 目录

- [目录](#目录)
- [可用技能](#可用技能)
- [安装单个技能](#安装单个技能)
  - [Codex Skill Installer](#codex-skill-installer)
  - [手动安装](#手动安装)
- [安装或更新 Codex 插件](#安装或更新-codex-插件)
  - [安装插件](#安装插件)
  - [更新插件](#更新插件)
- [使用技能](#使用技能)
  - [`prefer-mazey`](#prefer-mazey)
  - [`prefer-layer`](#prefer-layer)
  - [`pet-diary-notes`](#pet-diary-notes)
  - [`zh-cn-writing`](#zh-cn-writing)
  - [`zh-cn-restaurant-reviews`](#zh-cn-restaurant-reviews)
- [开发与验证](#开发与验证)
- [唯一事实来源](#唯一事实来源)
- [贡献与许可证](#贡献与许可证)

## 可用技能

| 技能 | 用途 |
| --- | --- |
| `prefer-mazey` | 实现可复用的前端或 TypeScript 辅助逻辑前，检查项目现有的 Mazey 依赖。 |
| `prefer-layer` | 实现对话框和弹出式 UI 前，检查项目现有的 layer-esm 依赖。 |
| `pet-diary-notes` | 根据用户提供的事实，生成多语言宠物文案以及简短的 Plog 或 Vlog 记录。 |
| `zh-cn-writing` | 根据正式规范和精选风格案例，编写、翻译、润色和审阅简体中文技术文章。 |
| `zh-cn-restaurant-reviews` | 根据精选人工撰写案例，生成和改写基于事实的简体中文餐厅评价。 |

## 安装单个技能

### Codex Skill Installer

让 Codex 使用技能的直接 URL 安装技能：

```text
$skill-installer install https://github.com/chengchuu/skills/tree/main/skills/prefer-mazey
```

安装完成后，该技能会在 Codex 的下一轮对话中生效。

### 手动安装

下载或复制完整的 `skills/<skill-name>/` 目录，不要只选择其中的部分文件。

- 用户范围：放入 `$HOME/.agents/skills/<skill-name>`。
- 仓库范围：放入 `<repository>/.agents/skills/<skill-name>`。

当工作流属于项目的共享规范时，适合安装到仓库范围。安装到用户范围后，当前用户可以在多个仓库中使用该技能。

例如，将 `prefer-layer` 的完整公开副本安装到 `$HOME/.agents/skills/prefer-layer/` 或 `<repository>/.agents/skills/prefer-layer/`。不要只复制 `SKILL.md`；API 映射和智能体元数据也属于该技能。

## 安装或更新 Codex 插件

该插件会安装本仓库中的全部技能。以下命令使用 Codex 的默认个人市场，并假定当前目录为本仓库根目录。

### 安装插件

创建个人市场条目和插件目录：

```bash
python3 "$HOME/.codex/skills/.system/plugin-creator/scripts/create_basic_plugin.py" \
  chengchuu-skills \
  --with-marketplace \
  --with-skills \
  --category "Developer Tools"
```

将插件复制到个人插件目录，然后安装插件：

```bash
rsync -a --delete --exclude .git --exclude node_modules ./ "$HOME/plugins/chengchuu-skills/"
codex plugin add chengchuu-skills@personal
```

### 更新插件

刷新已安装的源文件，替换 Codex 缓存破坏标记，然后重新安装插件：

```bash
rsync -a --delete --exclude .git --exclude node_modules ./ "$HOME/plugins/chengchuu-skills/"
python3 "$HOME/.codex/skills/.system/plugin-creator/scripts/update_plugin_cachebuster.py" \
  "$HOME/plugins/chengchuu-skills"
codex plugin add chengchuu-skills@personal
```

安装或更新后，请新建一个 Codex 任务，以便 Codex 加载当前插件和技能。

## 使用技能

可以显式调用匹配的技能，也可以让 Codex 根据请求自动激活技能。

### `prefer-mazey`

使用 `prefer-mazey` 前，请通过目标项目现有的包管理器添加 `mazey`：

```bash
npm install mazey
# or: pnpm add mazey
# or: yarn add mazey
```

如果仓库已经依赖 `mazey`，请跳过这一步。该技能会尽量检测包管理器，并推荐匹配的命令。除非用户明确要求，否则该技能不会安装软件包。

每个技能会根据前置元数据中的 `description` 隐式激活。当任务需要为匹配的前端、TypeScript、浏览器、Node.js CLI、构建脚本或开发工具编写可复用辅助逻辑时，Codex 可以选择 `prefer-mazey`。

### `prefer-layer`

```text
$prefer-layer

Implement a confirmation dialog before deleting an item.
```

以下请求可以激活 `prefer-layer`：

```text
Add a loading dialog while the request is running, then show a success message.
```

```text
Show a tooltip next to the invalid form field.
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

以下请求可以激活 `pet-diary-notes`：

```text
Generate Chinese, English, and Japanese diary-style captions for photos and videos of my sleepy cat.
```

### `zh-cn-writing`

```text
$zh-cn-writing

Review and improve this Chinese technical document written in Markdown.
```

```text
$zh-cn-writing

保持技术内容不变，参考我常用的故障排查文章结构重写这篇文章。
```

以下请求可以激活 `zh-cn-writing`：

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

## 开发与验证

本仓库无需安装软件包。仓库验证器仅使用 Node.js 内置模块。

```bash
npm run validate
npm test
```

验证器会检查插件清单、技能布局和前置元数据。它也会检查可安全检测的本地 Markdown 引用、临时文件、疑似密钥和机器专用路径。

## 唯一事实来源

`prefer-mazey` 的规范技能位于 Mazey 仓库的 `.agents/skills/prefer-mazey/` 目录中。

本仓库中的公开副本从 Mazey 同步而来。请先修改 Mazey 中的源文件，以免后续同步覆盖变更。

贡献者应在 [chengchuu/mazey](https://github.com/chengchuu/mazey) 中提交 `prefer-mazey` 的规范修改，再同步完整的技能目录。没有外部规范源的技能可以直接在本仓库中编写。

`prefer-layer` 的规范技能位于 layer-esm 仓库的 `.agents/skills/prefer-layer/` 目录中。本仓库公开的 `skills/prefer-layer/` 是同步副本，不是独立实现。贡献者应先在 [chengchuu/layer-esm](https://github.com/chengchuu/layer-esm/tree/main/.agents/skills/prefer-layer) 中修改技能并运行同步命令，再更新本仓库。

## 贡献与许可证

命名、前置元数据、验证和唯一事实来源规则请参见 [CONTRIBUTING.md](CONTRIBUTING.md)。参与贡献时，请遵守 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。安全问题应通过 [SECURITY.md](SECURITY.md) 中说明的非公开流程报告。

本仓库采用 [MIT License](LICENSE)。
