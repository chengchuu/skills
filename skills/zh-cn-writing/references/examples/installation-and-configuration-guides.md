# Installation and configuration guide examples

These normalized examples capture reusable structure and style without reproducing distinctive source prose. Source articles are not factual authorities.

## Contents

- TypeScript 项目环境搭建
- Babel 与 TypeScript 配置
- macOS 局域网访问配置
- 使用 scutil 管理 macOS 网络设置
- 配置 GitLab Runner
- 配置 GitHub SSH 密钥
- 在 CentOS 上安装 PHP 环境
- 在 Debian 上部署 Docker 与 Nginx
- 在 Debian 上安装 MySQL
- 在 Debian 上配置 Docker 环境
- 配置 Workbox 构建产物
- 合并 webpack 配置

## Example: TypeScript 项目环境搭建

- Document type: Installation and configuration guide
- Subject: JavaScript, TypeScript, and Node.js
- Audience: Frontend and Node.js developers
- Tone: Practical and procedural
- Formality: Medium to high
- Length: Medium
- Source: `temp/writing-examples/20-0818_TypeScript_Project.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 从目录、依赖和配置文件逐步建立可运行项目。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 以文件和命令为骨架，解释配置项的作用。

## Example: Babel 与 TypeScript 配置

- Document type: Installation and configuration guide
- Subject: Build tooling and package management
- Audience: Frontend developers
- Tone: Formal and explanatory
- Formality: Medium to high
- Length: Medium
- Source: `temp/writing-examples/20-0828_TypeScript_Babel.md`; `temp/writing-examples/TCloud/20-0828_Babel_TypeScript_TencentCloud.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 先说明工具分工，再给出安装、配置和构建流程。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 通过配置片段和命令串联概念；合并发布版本但不学习平台声明。

## Example: macOS 局域网访问配置

- Document type: Installation and configuration guide
- Subject: macOS and networking
- Audience: Developers
- Tone: Practical and procedural
- Formality: Medium to high
- Length: Short
- Source: `temp/writing-examples/26-0612-macOS-LAN.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 以目标、网络条件、配置步骤和验证为主线。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 结论直接，命令集中；不复用源文件中不完整的代码围栏。

## Example: 使用 scutil 管理 macOS 网络设置

- Document type: Installation and configuration guide
- Subject: macOS and networking
- Audience: Developers and system administrators
- Tone: Concise and reference-oriented
- Formality: Medium to high
- Length: Short
- Source: `temp/writing-examples/26-0613-macOS-scutil.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 围绕一个系统工具组织常用配置与检查步骤。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 命令精确，说明简短；在新内容中补足风险和恢复信息。

## Example: 配置 GitLab Runner

- Document type: Installation and configuration guide
- Subject: Git, CI/CD, and release engineering
- Audience: DevOps engineers and system administrators
- Tone: Practical and procedural
- Formality: Medium to high
- Length: Medium
- Source: `temp/writing-examples/Git/20-0911_GitLab_Runner.md`; `temp/writing-examples/TCloud/20-0911_GitLab_TencentCloud.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 按安装、注册、配置和执行流程组织。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 使用分步说明连接 CI 概念与命令。

## Example: 配置 GitHub SSH 密钥

- Document type: Installation and configuration guide
- Subject: Git, CI/CD, and release engineering
- Audience: Developers
- Tone: Practical and procedural
- Formality: Medium to high
- Length: Medium
- Source: `temp/writing-examples/Git/21-0225_GitHub_SSH_Keys.md`; `temp/writing-examples/TCloud/21-0225_GitHub_SSH_Keys.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 从密钥生成、平台配置到连接验证依次展开。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 对路径、命令和平台字段保持精确，适合短步骤式指南。

## Example: 在 CentOS 上安装 PHP 环境

- Document type: Installation and configuration guide
- Subject: Linux and server operations
- Audience: Developers and system administrators
- Tone: Practical and procedural
- Formality: Medium to high
- Length: Medium
- Source: `temp/writing-examples/Linux/17-0518_CentOS_PHP.md`; `temp/writing-examples/TCloud/17-0518_Linux_PHP_TCloud.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 以服务器环境准备、安装和配置为主线。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 命令密集且直接；技术版本可能过时，不能作为事实模板。

## Example: 在 Debian 上部署 Docker 与 Nginx

- Document type: Installation and configuration guide
- Subject: Linux and server operations; Docker and containers
- Audience: DevOps engineers and system administrators
- Tone: Practical and procedural
- Formality: Medium to high
- Length: Medium
- Source: `temp/writing-examples/Linux/23-0625_Debian_Docker.md`; `temp/writing-examples/TCloud/23-0625_Debian.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 把系统准备、容器安装、Web 服务配置和检查组合成完整环境指南。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 分级标题按组件组织；新版与发布版合并记录。

## Example: 在 Debian 上安装 MySQL

- Document type: Installation and configuration guide
- Subject: Databases and algorithms; Linux and server operations
- Audience: Developers and system administrators
- Tone: Practical and procedural
- Formality: Medium to high
- Length: Short
- Source: `temp/writing-examples/Linux/23-0708_Debian.md`; `temp/writing-examples/TCloud/23-0708_Debian.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 用准备、安装、初始化和连接验证组织步骤。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 命令优先，说明克制；需在新文档中显式处理安全配置。

## Example: 在 Debian 上配置 Docker 环境

- Document type: Installation and configuration guide
- Subject: Docker and containers; Linux and server operations
- Audience: Developers and system administrators
- Tone: Practical and procedural
- Formality: Medium to high
- Length: Medium
- Source: `temp/writing-examples/Linux/26-0104_Debian_Docker.md`; `temp/writing-examples/TCloud/26-0104_Debian_Docker.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 以当前环境、安装路径、镜像配置和验证为主线。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 较新的文章更强调环境信息、可验证结果和注意事项。

## Example: 配置 Workbox 构建产物

- Document type: Installation and configuration guide
- Subject: PWA and service workers
- Audience: Frontend developers
- Tone: Formal and explanatory
- Formality: Medium to high
- Length: Long
- Source: `temp/writing-examples/PWA/26-0503_Workbox_ZH.md`; `temp/writing-examples/PWA/26-0503_Workbox_EN.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 从目标和文件结构进入配置、构建、缓存行为与验证。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 中英文版本用于翻译对齐；中文版本作为主要风格样本。

## Example: 合并 webpack 配置

- Document type: Installation and configuration guide
- Subject: Build tooling and package management
- Audience: Frontend developers
- Tone: Practical and explanatory
- Formality: Medium to high
- Length: Medium
- Source: `temp/writing-examples/webpack/20-0828_webpack_Merge.md`; `temp/writing-examples/TCloud/20-0828_webpack_TencentCloud.md`

### Structural characteristics

- 先界定目标环境和预期状态，再给出步骤、配置、验证和必要的风险说明。
- 按问题、配置拆分、合并方式和使用命令组织。

### Reusable style characteristics

- 命令和配置保持原样；每一步说明目的或可观察结果。
- 配置示例与说明一一对应，适合构建工具迁移或整理。
