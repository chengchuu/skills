# Output workflows

Apply the common safeguards first: establish the requested output, isolate protected technical content, distinguish supplied facts from assumptions, and report unresolved conflicts. For any workflow that creates, normalizes, proofreads, or assesses Chinese prose, read `personal-style.md`, apply its required conventions by default, and distinguish them from optional tendencies and universal grammar rules. When a workflow creates or edits a Markdown table, apply the [Markdown 表格对齐与宽度规则](writing-guidelines.md#表格); for review-only work, report alignment or display-width violations without rewriting the table or file.

## Punctuation check before delivery

Apply this check to Chinese headings, outlines, plans, prose, and proposed wording before delivery, including short replies. The normative rules are [冒号](writing-guidelines.md#冒号) and [引号](writing-guidelines.md#引号-1).

1. Inspect editable prose for `：`, `“`, and `”`. Treat matches as candidates, not unconditional replacement targets. Exclude code blocks, inline code, commands, URLs, identifiers, punctuation demonstrations, and quotations that must remain verbatim.
2. Normalize prose colons to `:` with one following space when text continues on the same line. Normalize prose quotation marks to straight ASCII double quotes. Preserve an explicit user instruction to retain different punctuation; the presence of full-width punctuation in a draft alone is not such an instruction.
3. If heading spacing changes, check the document's table of contents and affected anchors. Update matching index labels only within the authorized scope. Check links after updating anchors.
4. Review the final diff or proposed text. Confirm protected content stayed unchanged and every remaining candidate has a reason to remain. For review-only requests, report corrections without modifying files.

Use these cases when evaluating changes to the skill; structural validators alone do not prove writing behavior:

- A new tutorial with an icon section uses `## Icon: 消息图标` from the first draft.
- Polishing `点击“继续”：完成操作。` produces `点击"继续": 完成操作。`.
- A code example containing `console.log("昵称：", value)` stays byte-for-byte unchanged during a prose punctuation edit.
- Changing `## Icon：消息图标` to `## Icon: 消息图标` also updates a local TOC target from `#icon消息图标` to `#icon-消息图标` when using GitHub-style anchors.
- A review-only request identifies the same prose issues but leaves files unchanged. An explicit request to quote a title verbatim preserves its punctuation.

## Write a new article

1. Confirm the purpose, document type, audience, scope, tone, and required facts from the prompt.
2. Choose a structure from `document-types.md`; omit sections that lack evidence.
3. Use user-provided or verified facts only. Mark missing facts instead of inventing them.
4. Draft in natural `zh-CN`, then apply the formal guidelines and required personal conventions. Apply optional personal-style tendencies only when the user requests the author's usual style or style adaptation would materially help.
5. Review technical boundaries, logical progression, examples, verification, and conclusion.

Expected output: the finished article, followed only when useful by a short list of unresolved factual inputs.

## Rewrite or polish

1. Preserve meaning, qualifications, uncertainty, facts, and protected technical content.
2. Repair structure before sentence-level wording when the original organization is weak.
3. Improve clarity, concision, transitions, terminology, and consistency.
4. Do not silently delete caveats, limitations, failure modes, or prerequisites.

Expected output: the revised text. If changes are extensive or constrained, add a concise change note.

## English-to-Chinese translation

1. Identify protected identifiers, terms that should remain English, and terminology requiring a stable Chinese rendering.
2. Translate meaning rather than English word order; preserve modality, conditions, warnings, and technical behavior.
3. Keep wholly English sentences and protected technical content under English conventions unless translation is requested for them.
4. Review Chinese punctuation, spacing, headings, and terminology consistency.

Expected output: a natural Simplified Chinese translation, plus a short terminology or ambiguity note when necessary.

## Proofread

1. Locate specific punctuation, spacing, grammar, sentence-length, heading, paragraph, number, unit, and terminology problems.
2. Correct only what is supported by the formal guidelines, required personal conventions, and context.
3. Preserve authorial intent and technical content.

Expected output: corrected text, or a findings list with location, issue, rationale, and suggested correction when the user asks for review only.

## Style review

Separate formal-guideline violations, required personal-style inconsistencies, and optional style improvements. Do not present a personal convention as a universal grammar rule.

Expected output: prioritized findings, each with evidence and an actionable revision; do not present preferences as errors.

## Structural review

Evaluate purpose, audience fit, information order, heading hierarchy, paragraph focus, examples, verification, and closing. Compare only with examples of the same or a closely related document type.

Expected output: a proposed outline and focused findings. Do not rewrite the entire document unless asked.

## Technical-document summarization

Preserve scope, prerequisites, conclusions, conditions, risks, and exact identifiers. Remove repetition without turning uncertain claims into facts.

Expected output: a concise summary at the requested depth, with unresolved technical ambiguities called out separately.

## Convert conversation notes into an article

1. Separate decisions, facts, hypotheses, commands, outcomes, and open questions.
2. Choose the document type that matches the intended use, not the conversational order.
3. Remove conversational repetition and unsupported speculation.
4. Preserve attribution or uncertainty when it matters.

Expected output: a coherent article plus an “待确认” section only when essential inputs remain missing.

## Technical review boundary

Language review does not establish technical correctness. If prose conflicts with code, commands, configuration, or identifiers, preserve the protected content and report the conflict. Do not claim a technical statement is wrong without sufficient evidence.
