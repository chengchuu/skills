# Personal style

These are explicit personal overrides. Apply them after technical facts, current user instructions, and discoverable project conventions, but before an ecosystem profile, the general foundations, and `en-US` defaults. They never override a higher-priority layer.

## Language

- Use American English.
- Prefer concise, direct technical prose.
- Avoid marketing language.
- Preserve exact technical identifiers.
- Do not over-explain basic concepts to experienced developers.

## Structure

- Put conclusions, requirements, or actions early.
- Keep introductions short.
- Use examples only when they clarify behavior.
- Avoid repetitive summaries.
- Prefer practical, production-oriented guidance.

## Vocabulary

Prefer concrete verbs and specific nouns. Avoid inflated or promotional wording unless the source requires it.

## Future customization

Future updates can record preferred README openings, heading patterns, tutorial flow, API descriptions, troubleshooting structure, command presentation, release-note format, terminology, reusable patterns, and patterns that must not be reused.

Approved personal Markdown examples can later be stored under `sources/en-technical-writing/`; the repository-level directory is not a runtime dependency and must not be created empty. Private or unapproved local inputs may remain outside tracked files, but `temp/english-writing-examples/` is a legacy compatibility location rather than the destination for new public sources. A future ingestion workflow should:

1. Confirm publication approval, scan each source for sensitive data, and preserve the original bytes.
2. Extract document type, audience, tone, structure, and recurring patterns.
3. Detect potentially outdated technical claims.
4. Separate style evidence from technical facts.
5. Deduplicate repeated examples.
6. Create curated examples only when they provide reusable evidence.
7. Update this file and [source-manifest.md](source-manifest.md).
8. Avoid converting accidental mistakes into rules.

Classify learned patterns as **Strong recurring pattern**, **Optional tendency**, **Document-specific pattern**, **Inconsistent pattern**, or **Do not reuse automatically**. Do not infer preferences or create fictitious examples.
