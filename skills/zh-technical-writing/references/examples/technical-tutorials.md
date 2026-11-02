# Technical tutorial examples

These normalized examples capture reusable structure and style without reproducing distinctive source prose. Source articles are not factual authorities.

## Example: JavaScript Promise 的演进与实现

- Document type: Technical tutorial
- Subject: JavaScript, TypeScript, and Node.js
- Audience: Frontend and Node.js developers
- Tone: Analytical and explanatory
- Formality: Medium to high
- Length: Long
- Source: `sources/design-project-architecture/articles/20-0619_Promise.md`

### Structural characteristics

- 先明确学习目标和前置知识，再按概念、实现、示例、验证和总结推进。
- 从历史动机和回调问题进入主题，逐步扩展到实现、错误处理、取消与异步语法。

### Reusable style characteristics

- 让解释紧邻代码或结果；用短段落连接各个实践步骤。
- 大量对照代码支撑解释；应压缩过深标题和过长句子。

## Example: Go 开源库创建流程

- Document type: Technical tutorial
- Subject: Go and desktop tooling
- Audience: Go developers
- Tone: Practical and procedural
- Formality: Medium to high
- Length: Medium
- Source: `sources/design-project-architecture/articles/Go/23-1024_Go_Library.md`; `sources/zh-technical-writing/legacy/TCloud/23-1024_Go_Library.md`

### Structural characteristics

- 先明确学习目标和前置知识，再按概念、实现、示例、验证和总结推进。
- 以创建、测试、发布和使用的完整链路组织教程。

### Reusable style characteristics

- 让解释紧邻代码或结果；用短段落连接各个实践步骤。
- 步骤标题清楚，命令紧随解释；平台版本中的声明不纳入风格。

## Example: 使用 Wails 构建 Go 桌面应用

- Document type: Technical tutorial
- Subject: Go and desktop tooling
- Audience: Go developers
- Tone: Practical and explanatory
- Formality: Medium to high
- Length: Medium
- Source: `sources/design-project-architecture/articles/Go/24-0219_Go_Wails.md`

### Structural characteristics

- 先明确学习目标和前置知识，再按概念、实现、示例、验证和总结推进。
- 从工具定位和环境准备进入项目创建与运行。

### Reusable style characteristics

- 让解释紧邻代码或结果；用短段落连接各个实践步骤。
- 用可执行步骤降低新工具的上手成本，并保留产品名和命令。

## Example: 渐进式 Web 应用入门

- Document type: Technical tutorial
- Subject: PWA and service workers
- Audience: Frontend developers
- Tone: Explanatory and practical
- Formality: Medium to high
- Length: Long
- Source: `sources/design-project-architecture/articles/PWA/21-0309_PWA.md`

### Structural characteristics

- 先明确学习目标和前置知识，再按概念、实现、示例、验证和总结推进。
- 按概念、能力、实现组成和实践示例展开。

### Reusable style characteristics

- 让解释紧邻代码或结果；用短段落连接各个实践步骤。
- 概念解释与浏览器技术示例交替；历史事实只作为源文章内容，不作为规则。

## Example: 使用 Bootstrap 3 实现瀑布流布局

- Document type: Technical tutorial
- Subject: Frontend and web performance
- Audience: Beginners and frontend developers
- Tone: Practical and explanatory
- Formality: Medium to high
- Length: Long
- Source: `sources/zh-technical-writing/legacy/bootstrap-blueprints/lesson-first-waterfall/README.md`

### Structural characteristics

- 先说明案例目标，再介绍栅格、缩略图和响应式图片等基础组件，随后组合成完整页面。
- 先给出纯样式方案，再补充脚本扩展、演示地址和源码入口，形成从基础到进阶的学习路径。

### Reusable style characteristics

- 将概念说明、代码和效果图放在相邻位置，使读者可以立即核对实现结果。
- 多步骤配置使用有序列表，替代方案按实现成本逐层展开；版本相关内容不作为写作事实。

## Example: 使用 Bootstrap 3 实现响应式导航与轮播

- Document type: Technical tutorial
- Subject: Frontend and web performance
- Audience: Beginners and frontend developers
- Tone: Practical and explanatory
- Formality: Medium to high
- Length: Long
- Source: `sources/zh-technical-writing/legacy/bootstrap-blueprints/lesson-second-navigation/README.md`

### Structural characteristics

- 将最终页面拆分为导航和轮播两个组件，分别讲解基础形式、增强形式和响应式形式。
- 在组件知识之后安排组合实践，再提供不同屏幕下的结果和项目入口。

### Reusable style characteristics

- 使用编号步骤解释元素、样式和属性之间的对应关系，并让代码紧随操作说明。
- 用大屏和小屏效果对照呈现响应式结果；框架版本相关结论仅作为源文章内容。

## Example: 使用 Bootstrap 3 构建注册和登录模块

- Document type: Technical tutorial
- Subject: Frontend and web performance
- Audience: Beginners and frontend developers
- Tone: Practical and explanatory
- Formality: Medium to high
- Length: Long
- Source: `sources/zh-technical-writing/legacy/bootstrap-blueprints/lesson-third-login/README.md`

### Structural characteristics

- 围绕可切换的注册和登录模块，依次介绍标签页、按钮和表单，再将组件组合成完成案例。
- 每个组件从基础用法逐步扩展到布局、状态或交互变体，保持由局部到整体的推进顺序。

### Reusable style characteristics

- 通过小幅修改前一个示例引入新能力，并明确说明需要替换或新增的样式与属性。
- 操作步骤、代码和效果图保持对应；过深标题层级和版本相关实现不作为通用规则。

## Example: 使用 Bootstrap 3 构建评论列表

- Document type: Technical tutorial
- Subject: Frontend and web performance
- Audience: Beginners and frontend developers
- Tone: Practical and explanatory
- Formality: Medium to high
- Length: Long
- Source: `sources/zh-technical-writing/legacy/bootstrap-blueprints/lesson-fourth-comment/README.md`

### Structural characteristics

- 先列出媒体对象的组成部分，再按位置、嵌套、对齐和列表形态逐项扩展。
- 以单个组件为主线，从最小示例推进到多层评论和完成页面，范围集中且递进明确。

### Reusable style characteristics

- 使用短段落解释一个变化，并在相邻位置给出代码和效果图，便于比较不同形态。
- 对替代写法、适用限制和不建议使用的方案单独提示；具体兼容性结论不作为写作事实。
