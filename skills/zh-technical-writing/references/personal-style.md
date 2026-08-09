# Personal style tendencies

This file contains explicit author preferences and tendencies derived from the curated corpus. They never override user instructions, technical correctness, or protected technical content. Required personal conventions are author-specific defaults rather than universal Chinese grammar rules; optional tendencies do not override `writing-guidelines.md`.

## Contents

- [Author identity and attribution](#author-identity-and-attribution)
- [Required personal convention: software-entity pronouns](#required-personal-convention-software-entity-pronouns)
- [Strong recurring patterns](#strong-recurring-patterns)
- [Common but optional tendencies](#common-but-optional-tendencies)
- [Rare or context-specific tendencies](#rare-or-context-specific-tendencies)
- [Patterns that should not be reused](#patterns-that-should-not-be-reused)
- [Observed conflicts with the formal guidelines](#observed-conflicts-with-the-formal-guidelines)

## Author identity and attribution

Treat these names as writing-style context, not as general biographical data:

- Use `除除` when Simplified Chinese prose needs to identify the author by name.
- Use `Cheng` when English prose needs to identify the author by name.
- Preserve a name explicitly supplied by the user, even when it differs from these defaults.
- Do not insert an author name when attribution is unnecessary or was not requested.
- Do not translate or replace `Cheng` inside code, usernames, package names, URLs, email addresses, copyright identifiers, Git metadata, or other exact technical identifiers.
- Preserve names in quoted source material unless the user explicitly requests a change.
- When bilingual identification is relevant, use the natural form `除除 (Cheng)`; do not add it to Chinese-only or English-only attribution automatically.

Examples:

```markdown
作者：除除
```

```markdown
Written by Cheng
```

```markdown
作者：除除 (Cheng)
```

## Required personal convention: software-entity pronouns

Treat this as the author's personal style, not as a universal Chinese grammar rule. Apply it by default when writing, rewriting, translating, proofreading, or reviewing editable Simplified Chinese prose:

- When a pronoun's antecedent clearly refers to software, a tool, a system, or a service, use `他`, `他的`, and `他们` instead of `它`, `它的`, and `它们`.
- Determine the antecedent before editing; never perform an unscoped string replacement.
- If a human actor and a software entity occur together, or the referent is otherwise ambiguous, repeat the entity name or rewrite the sentence instead of forcing `他` or `他们`.
- Do not apply the convention inside code blocks, inline code, commands, paths, URLs, identifiers, configuration values, API fields, error messages, direct quotations, product names, or other protected technical content.
- Preserve the source meaning and number. Do not introduce a pronoun when repeating the entity name is clearer.

Task behavior:

- **Writing:** use the convention in newly generated Chinese prose.
- **Rewriting or translation:** normalize applicable narrative pronouns while preserving meaning and protected content.
- **Proofreading:** correct applicable violations and retain the author's intent.
- **Review only:** report the wording as a personal-style inconsistency without rewriting the source or calling it a universal grammar error.

Clear antecedent: `该服务完成初始化后，他会开始监听请求。`

Ambiguous actor: use `管理员启动系统后，系统会检查配置。`, not `管理员启动系统后，他会检查配置。`

## Strong recurring patterns

- Lead with the goal, conclusion, problem, or practical value before expanding the background.
- Organize technical material with descriptive headings. Use a table of contents for long documents, but keep ordinary articles at two or three heading levels.
- Prefer task-oriented progression: background or symptom, approach, implementation, verification, caveats, and summary.
- Place commands, configuration, code, tables, or concrete examples close to the prose that explains them.
- Write for developers and operators in a practical, explanatory tone with medium-to-high formality.
- Preserve English technical terms and identifiers, often pairing a Chinese explanation with the established English term when that improves recognition.
- Use lists and tables for parallel choices, steps, command groups, timelines, and comparisons.
- In newer articles, state the environment, scope, goal, risks, and verification method explicitly.

## Common but optional tendencies

- Use openings such as “背景”“问题”“目标” or a short summary paragraph.
- Use numbered sections for procedures or long analyses when order matters.
- End with a concise summary, checklist, recommendation, or reference section.
- Contrast alternatives in a table before explaining the recommended option.
- Use a runnable example or observable result to close the gap between explanation and practice.
- Introduce a concept from a real problem, then generalize it into reusable guidance.

Apply these only when they suit the document type and user request.

## Rare or context-specific tendencies

- First-person incident narratives such as “记一次……” suit postmortems, not neutral reference documentation.
- Bilingual Chinese and English editions are useful for translation alignment, but do not force bilingual headings into Chinese-only documents.
- “从零到一”“实战”“全流程”等标题模式适合教程，但容易显得宣传化，应按受众和发布渠道谨慎使用。
- Update notices, copyright footers, project links, and platform declarations are publication metadata, not general writing style.
- Chinese-numbered sections such as“一、”“二、” appear in older long-form articles; descriptive Markdown headings are usually clearer for technical documentation.

## Patterns that should not be reused

- Do not copy distinctive sentences, anecdotes, slogans, author signatures, copyright text, platform declarations, SEO blocks, or “（完）” endings.
- Do not learn technical facts, commands, compatibility claims, versions, or recommendations from an example without independent task evidence.
- Do not reproduce malformed code fences, excessive heading depth, multiple competing H1 headings, overlong sentences, or inconsistent spacing and punctuation.
- Do not imitate promotional claims such as “最佳”“强大”“玩转” unless the user explicitly wants marketing language and can substantiate the claim.

## Observed conflicts with the formal guidelines

- Several older articles use four or more heading levels; the formal guideline's shallower hierarchy remains the default.
- Long multi-clause sentences occur frequently in conceptual articles; split them according to the formal sentence-length guidance.
- Full-width and half-width parentheses, quotation marks, colons, and spaces are inconsistent across the corpus; follow the formal punctuation and spacing rules.
- Some headings use isolated numbering or vague labels; prefer descriptive headings that reveal section purpose.
- Some articles mix promotional or conversational phrases into otherwise formal prose; treat this as context-specific, not normative.
- A few source files contain malformed Markdown fences or heading-like text inside examples; do not reproduce those formatting errors.
