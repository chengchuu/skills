---
name: pet-diary-notes
description: Generate, rewrite, translate, and review diary-style pet titles, captions, descriptions, short records, BGM notes, and hashtags for Plogs and Vlogs in Simplified Chinese, English, and Japanese using factual user input and curated handwritten examples. Use for 宠物日记、猫咪日常、Plog、Vlog、照片文案、短视频文案、成长记录、治愈内容、搞笑内容、健康记录和 AI 宠物故事. Do not use for veterinary diagnosis, long-form unrelated creative writing, restaurant reviews, or technical documentation.
---

# Multilingual pet diary notes

Create natural `zh-CN`, `en`, and `ja-JP` diary-style captions, short pet records, Plog notes, Vlog notes, and photo or video copy from user facts and curated handwritten style evidence.

## Workflow

1. Identify the requested languages, target platform, artifact type, content form (`plog`, `vlog`, `photo-caption`, `video-caption`, or general `diary-note`), length, and whether the scene is real-life or AI-generated. Identify category, country, location, mood, and tone only when supported; use `unknown` rather than guessing.
2. Extract only supplied facts. Retain exact pet names for identity and grammatical gender, but include a name in the artifact only when the user explicitly requests naming or branding. Preserve dates, places, BGM titles, health facts, campaign tags, and version identifiers.
3. Read [references/README.md](references/README.md) and follow its progressive routing.
4. Read [references/pet-profile.md](references/pet-profile.md) only when Dudu's identity or stable profile matters. Never assume an unnamed cat is Dudu.
5. Read the relevant sections of [references/writing-rules.md](references/writing-rules.md), [references/language-guides.md](references/language-guides.md), and [references/output-formats.md](references/output-formats.md).
6. Select the smallest relevant example file, normally one. Learn structure, rhythm, tone, vocabulary, and hashtag practice without copying distinctive sentences or transferring example facts.
7. Draft each language naturally from the same fact set. Adapt rather than translate literally, but keep the event, places, dates, BGM, health status, and fictional status consistent. If naming was explicitly requested, keep the name consistent too.
8. Deduplicate hashtags, keep language blocks separate, and create a no-space compact version only when requested. Add `#shorts` only for a requested or clearly required Shorts format.
9. Verify that no behavior, emotion, health condition, location, food, date, treatment, recovery timeline, photo detail, or video event was invented.
10. Return only the requested artifact unless the user asks for explanation, analysis, or alternatives.

## Fact boundaries

- Use only current user facts and applicable stable facts in the pet profile.
- Do not infer country from caption language or location from the pet profile.
- Do not infer feelings, love, trust, fear, understanding, diagnosis, or recovery from appearance.
- Treat supplied interpretations as the user's framing; do not strengthen them.
- Keep generated or fictional scenes explicit. Never present them as real pet history.
- Treat a pet identity field such as `猫咪：嘟嘟` as context, not permission to print the name. By default, omit pet names and name-derived possessives from titles, descriptions, and hashtags in every language. Add them only when the user explicitly requests naming, attribution, or branded tags.
- Do not add BGM, copyright text, platform tags, or medical detail without support or a direct request.
- Use neutral wording for minor omissions. Ask only when ambiguity about identity, required language, platform format, health status, or real versus generated content would make the result misleading.

## References

- Routing index: [references/README.md](references/README.md)
- Pet identity and conflicts: [references/pet-profile.md](references/pet-profile.md)
- Writing and factual rules: [references/writing-rules.md](references/writing-rules.md)
- Chinese, English, and Japanese guidance: [references/language-guides.md](references/language-guides.md)
- Output schemas: [references/output-formats.md](references/output-formats.md)
- Classification labels: [references/taxonomy.md](references/taxonomy.md)
- Source coverage and duplicate decisions: [references/source-manifest.md](references/source-manifest.md)
