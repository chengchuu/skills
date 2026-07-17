---
name: zh-cn-writing
description: Write, rewrite, translate, proofread, and review Chinese technical documentation in Simplified Chinese (zh-CN) using the bundled writing guidelines. Use for Chinese or English-to-Chinese READMEs, API guides, tutorials, reference documentation, release notes, help text, and reviews involving punctuation, spacing, sentence length, headings, paragraphs, numbers, terminology, or technical-writing style; keep unchanged code and wholly English sentences under their own conventions.
---

# 简体中文技术写作

将 [references/writing-guidelines.md](references/writing-guidelines.md) 视为唯一规范来源。开始写作、改写、翻译、校对或审阅前，完整阅读该文件，并将所有适用规则用于简体中文 (`zh-CN`) 内容。

## 工作流程

1. 确认任务类型、目标读者、文档范围和用户要求的输出形式。
2. 区分中文叙述、完整英文句子、代码块、行内代码及技术标记，仅对适用内容执行中文规范。
3. 按参考文件检查标题层级、段落结构、句长、语态、措辞、空格、标点、数字、单位、范围和引用。
4. 写作或翻译时，优先保证原意、技术事实和受保护内容准确，再改善自然度、清晰度与一致性。不得补充原文没有依据的事实；仅做语言优化时，不得删除或改变无法核实的技术主张，应保留并报告疑点。
5. 校对或审阅时，按用户要求提供问题清单、修改建议或修订结果。用户未指定输出形式时，先报告具体问题、对应规则和建议修改，不要擅自修改文件。
6. 完成后复查中文规范与技术内容保护边界。

## 内容边界

- 将技术准确性和受保护内容置于行文规范之上。如果规范化会改变技术内容，则保留原文并报告问题。
- 使用简体中文 (`zh-CN`) 撰写中文叙述。
- 除非用户明确要求修改，否则逐字保留代码块、行内代码和命令，即使它们疑似错误、互相矛盾或不能运行；只报告疑点。
- 原样保留参数、文件路径、配置键、代码标识符、URL、API 名称、产品名称、版本号和其他必须精确匹配的技术标记，包括大小写、拼写与内部标点。
- 不要为满足中文空格或标点规则而改变技术标记内部的字符。
- 除非任务明确要求翻译，否则保留完整英文句子，并使用英文空格和半角标点规则；对含英文术语的中文句子使用参考文件中的中文规则。
- 翻译时保留不可翻译的专有名称，并确保示例、输入、输出和程序行为不发生变化。
- 叙述与代码、命令或标识符不一致时，不要猜测哪一项正确，也不要擅自统一；保留受保护内容并明确列出冲突。
- 不要推断或添加平台、Shell、参数、重定向、文件名、输出或程序行为。

## 冲突与不确定性

用户的明确要求与参考规范冲突时，遵循用户要求并说明偏离项。参考文件中的规则彼此冲突、表述含糊或无法客观判断时，明确报告涉及的规则和影响；必要时请求用户选择，不得自行发明新约定。对参考文件允许多种写法的项目，选择一种适合现有文档的写法并在全文保持一致。
