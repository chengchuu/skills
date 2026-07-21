---
name: zh-cn-restaurant-reviews
description: Generate, rewrite, and review Simplified Chinese restaurant reviews using factual dining details and curated handwritten examples organized by country, cuisine, category, platform, sentiment, tone, and length. Use for 大众点评、小红书、Google Maps、餐厅短评、用餐记录和餐饮评价. Do not use for code reviews, technical writing, or unrelated product reviews.
---

# 简体中文餐厅评价

根据用户提供的事实和按地域、餐厅类型整理的手写案例，生成自然的简体中文餐厅评价。

## 工作流程

1. 识别目标平台、国家或地区、菜系、餐厅类型、情感倾向、语气和篇幅。未指定的维度标为 `unknown`，不要自行猜测。
2. 提取用户明确提供的事实。逐字保留店名、菜名、地点、价格、日期、时间和其他专有信息。
3. 阅读 [references/README.md](references/README.md)，再完整阅读 [references/writing-rules.md](references/writing-rules.md)。
4. 依据路由索引选择最小且最相关的案例文件。需要确定标签或格式时，再读取 [references/taxonomy.md](references/taxonomy.md) 或 [references/output-formats.md](references/output-formats.md)。
5. 学习案例的结构、节奏、语气和细节密度，不复制具有辨识度的句子，也不要把不同案例的事实移入新评价。
6. 仅使用用户提供的事实生成或改写自然的简体中文内容。不得虚构菜品、价格、地点、排队时间、服务经历、环境观察或个人感受。
7. 按目标平台和篇幅调整结构。除非用户要求分析、备选版本或说明，否则只返回所需成品。

## 信息不足时

- 使用中性措辞，并省略缺乏依据的细节。
- 不把常见餐厅体验、地域印象或案例内容当作当前餐厅的事实。
- 不把“满意”“一般”或“不满意”等整体态度展开成未经提供的具体感受，例如搭配协调、吃得舒服、值得再来或性价比高。
- 仅当缺失信息会让成品产生误导时提问；轻微缺失不阻塞任务，直接给出最佳事实版本。
- 改写现有评价时，不改变原意、情感倾向或事实强度。无法确认的原文主张可以保留，但不得进一步强化。

## 参考资料

- 案例路由与文件说明: [references/README.md](references/README.md)
- 写作规律与事实边界: [references/writing-rules.md](references/writing-rules.md)
- 输出格式: [references/output-formats.md](references/output-formats.md)
- 分类标签: [references/taxonomy.md](references/taxonomy.md)
- 来源与去重记录: [references/source-manifest.md](references/source-manifest.md)
