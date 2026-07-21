# Output workflows

Apply the common safeguards first: establish the requested output, isolate protected technical content, distinguish supplied facts from assumptions, and report unresolved conflicts.

## Write a new article

1. Confirm the purpose, document type, audience, scope, tone, and required facts from the prompt.
2. Choose a structure from `document-types.md`; omit sections that lack evidence.
3. Use user-provided or verified facts only. Mark missing facts instead of inventing them.
4. Draft in natural `zh-CN`, then apply the formal guidelines. Read and apply personal-style tendencies when the user requests the author's usual style or style adaptation would materially help.
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
2. Correct only what is supported by the formal guidelines and context.
3. Preserve authorial intent and technical content.

Expected output: corrected text, or a findings list with location, issue, rationale, and suggested correction when the user asks for review only.

## Style review

Separate mandatory guideline violations from optional style improvements. Explain which personal tendencies are applicable and which are not.

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
