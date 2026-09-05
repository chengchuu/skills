---
name: en-technical-writing
description: Write, rewrite, translate, proofread, and review English technical documentation in American English using project conventions, protected technical facts, personal style overrides, mature developer-documentation guidance, and optional ecosystem profiles such as React. Use for AGENTS.md files, READMEs, quickstarts, tutorials, how-to, installation, configuration, API, CLI, troubleshooting, migration, release, architecture, contributing, and Chinese-to-English technical content. Preserve code, commands, identifiers, paths, URLs, package names, API names, versions, and documented behavior unless the user explicitly requests technical changes. Do not use for marketing, creative writing, unrelated business communication, or code review.
---

# English Technical Writing

Create accurate, clear, and usable technical documentation in American English. Preserve technical meaning and repository conventions while applying only the guidance relevant to the requested document.

## Resolve the task

1. Identify the workflow: write, rewrite, translate, proofread, review, condense, or expand.
2. Identify the audience, document type, technical level, target repository, ecosystem, required format, requested length, and existing style guide.
3. Default to `en-US` unless the user or repository explicitly requires another variant.
4. Extract technical facts and protected literals.
5. Inspect only the target repository sources relevant to the document, such as local instructions, existing documentation, manifests, configuration, workflows, source entry points, and tests.
6. Ask only for information whose absence would materially change the result. Otherwise, state a narrow assumption and proceed.
7. Read [references/README.md](references/README.md), then read [references/rule-precedence.md](references/rule-precedence.md).
8. Match every applicable router row, then load only the relevant workflow, document type, foundation, profile, and personal-style sections.

## Apply rules in order

Follow [references/rule-precedence.md](references/rule-precedence.md). In brief:

1. Preserve facts, documented behavior, protected literals, and uncertainty.
2. Follow current user instructions.
3. Follow the target project's discoverable conventions.
4. Apply explicitly documented personal style overrides.
5. Apply a matching ecosystem profile.
6. Apply the Google-derived technical-writing foundation.
7. Apply the Microsoft-derived editorial voice.
8. Fall back to general `en-US` conventions.

Never copy source prose merely to imitate style. Convert guidance into original wording, and do not invent product behavior, prerequisites, results, or citations.

## Produce the requested output

- Default to en-US spelling, punctuation, and terminology unless the user or project specifies another variant.
- Keep fenced and inline code, commands, CLI flags, environment variables, paths, URLs, identifiers, API and package names, versions, configuration values, error messages, quotations, and generated content unchanged unless the user explicitly requests changing that protected content.
- Prefer active voice, present tense, direct second person, concise sentences, descriptive headings, and explicit actors.
- Use imperative steps for procedures and put conditions before actions when they affect whether a step applies.
- Use consistent terminology. Define necessary unfamiliar terms and remove avoidable jargon, idioms, and culture-specific references.
- Make headings, links, lists, tables, notices, and callouts accessible and scannable.
- Preserve uncertainty. Flag unverifiable claims instead of silently strengthening them.
- Do not add introductions, summaries, callouts, examples, or sections unless they help the document's purpose.
- Detect unsupported claims and ambiguities instead of converting them into facts.

## Complete the workflow

Use [references/output-workflows.md](references/output-workflows.md) for task-specific output:

- Writing and rewriting return publication-ready content unless the user asks for commentary.
- Translation preserves meaning, structure, identifiers, and technical constraints rather than translating mechanically.
- Proofreading makes narrow corrections and avoids unnecessary restructuring.
- Review-only requests report findings and recommendations without editing files or presenting a rewritten document as completed work.

Before finishing, verify technical fidelity, completeness, terminology, headings, procedures, code references, the selected language variant, and the user's requested output format. Return only the requested artifact unless the user requests analysis or alternatives. For repository edits, run the relevant project checks and inspect the final diff.

## References

- Route tasks with [references/README.md](references/README.md).
- Resolve conflicts with [references/rule-precedence.md](references/rule-precedence.md).
- Apply general mechanics from [references/writing-guidelines.md](references/writing-guidelines.md).
- Normalize terms with [references/terminology.md](references/terminology.md).
- Structure content with [references/document-types.md](references/document-types.md).
- Follow task behavior in [references/output-workflows.md](references/output-workflows.md).
- Apply optional preferences from [references/personal-style.md](references/personal-style.md).
- Audit provenance in [references/source-manifest.md](references/source-manifest.md).

## Maintenance

After changing the skill or its references, run these commands from the skill directory:

```bash
node scripts/validate-references.mjs
node scripts/test-validate-references.mjs
```
