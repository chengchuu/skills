# Output workflows

Whenever a workflow creates or edits Markdown tables, apply the [Markdown table alignment and width rule](writing-guidelines.md#lists-tables-and-notices). In review-only mode, report alignment or visual-width violations without rewriting the table or file.

## Write

Gather the verified facts, audience, goal, document type, and constraints. Draft the smallest complete structure, then check accuracy and usability. Mark missing facts instead of inventing them.

Default output: publication-ready content.

## Rewrite

Preserve meaning, constraints, code, identifiers, and useful structure. Change organization or voice only as much as needed to meet the request. If the original is ambiguous, retain the ambiguity or flag it; do not silently choose a new technical meaning.

Default output: revised content, with a short change summary only when useful or requested.

## Translate to English

Translate meaning, not word order.

1. Identify repeated terms, product names, literals, and language that must remain unchanged.
2. Resolve terminology against project usage and official product terms.
3. Produce natural en-US sentences while preserving technical relationships and certainty.
4. Retain headings, code fences, links, and structural intent unless adaptation improves usability.
5. Review the result independently from the source to catch omissions and translation artifacts.

Default output: translated content. Mention unresolved terminology only when it affects correctness.

## Proofread

Correct spelling, grammar, punctuation, capitalization, spacing, and clear local inconsistencies. Preserve the author's structure and voice unless a sentence cannot be corrected safely without rewriting. Do not expand scope into a full redesign.

Default output: corrected content. If the user requests tracked findings, list each substantive change.

Check grammar, articles, number agreement, verb agreement, tense, prepositions, punctuation, American spelling, terminology, and heading consistency.

## Structural review

Check information order, audience assumptions, prerequisites, heading hierarchy, procedure design, code placement, verification, troubleshooting flow, repetition, and missing transitions. Recommend structural changes without presenting them as factual corrections.

## Review only

Do not edit files, replace the document, or claim to have fixed issues.

- Read the full relevant scope.
- Cite a file, heading, line, or quoted fragment for each finding.
- Explain the reader or technical impact.
- Recommend a concrete correction.
- Rank findings by severity.
- Distinguish confirmed defects from optional improvements.
- Say explicitly when no confirmed issues are found.

Classify findings as **Language issue**, **Structure issue**, **Terminology issue**, **Consistency issue**, **Potential technical conflict**, **Unsupported claim**, **Missing prerequisite**, or **Missing verification**. Use critical, major, minor, or suggestion severity only when it helps prioritization. Never present a possible technical conflict as a confirmed bug.

Default output: findings first, followed by assumptions or residual risks.

## Condense

Remove duplication, filler, weak openings, and unnecessary detail. Preserve required actions, caveats, compatibility constraints, safety information, and examples needed to complete or verify the task.

## Expand

Expand only from supported information. Mark requested placeholders and information gaps. Do not invent examples, output, behavior, prerequisites, or evidence.

## Repository edit

Inspect repository instructions before editing. Preserve unrelated changes. Make narrow patches, run proportionate checks, inspect the final diff, and report modified files and validation. Do not stage, commit, publish, or modify external repositories unless explicitly authorized.

## Response modes

Honor a user's output constraint over these defaults. In particular:

- *Output only the revised text* means no preface or summary.
- *Review only* means no mutation.
- *Keep formatting* means preserve Markdown shape unless a defect requires a targeted change.
- *Do not change code* includes inline code, fenced code, commands, and identifiers.
