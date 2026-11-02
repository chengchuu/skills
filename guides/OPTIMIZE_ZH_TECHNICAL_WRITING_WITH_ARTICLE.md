Optimize the existing Codex skill at:

skills/zh-technical-writing/

Use the following Markdown article or articles as new style and structure evidence:

```plain
<ARTICLE_PATHS>
```

## Goal

Incorporate the articles into the curated, distributable references for `zh-technical-writing` so future writing, rewriting, translation, proofreading, and review tasks can benefit from their reusable structure and style.

Treat each article as evidence of writing habits, not as an authoritative source for technical facts. Preserve the skill name and keep the skill independently installable without access to the original articles, `sources/`, or `temp/`.

## Required inspection

Before editing:

1. Read `AGENTS.md` completely.
2. Resolve every supplied path and read every Markdown article completely.
3. Inspect the complete current skill, including:
   - `skills/zh-technical-writing/SKILL.md`
   - `skills/zh-technical-writing/agents/openai.yaml`
   - every top-level file under `skills/zh-technical-writing/references/`
   - the relevant files under `skills/zh-technical-writing/references/examples/`
   - `skills/zh-technical-writing/scripts/validate-references.mjs`
4. Inspect `.codex-plugin/plugin.json`, `README.md`, and `README.zh-CN.md`, but modify them only if discovery or documented behavior actually changes.
5. Review `git status` and preserve unrelated work.

## Source handling

- Accept either one Markdown path or multiple Markdown paths separated by newlines or supplied as a Markdown list.
- Verify that every entry in `<ARTICLE_PATHS>` identifies a readable Markdown file. Report invalid, unreadable, duplicate, or non-Markdown inputs clearly; do not silently omit them.
- Do not modify or delete the supplied articles.
- Do not place an absolute machine-specific path in the skill or tracked documentation.
- If an article is already under an owning skill root in `sources/`, use its repository-relative path as provenance. Shared architecture articles keep one canonical copy under `sources/design-project-architecture/`.
- If an article is recorded under the legacy `temp/writing-examples/` location, preserve that repository-relative provenance through the compatibility mapping unless the source remains unavailable.
- If an article is outside both source locations and may be stored publicly, create a maintenance copy under an appropriate subdirectory of `sources/zh-technical-writing/`. Use a stable, collision-safe filename and record only that repository-relative path in curated references.
- Confirm that a new external article may be published before adding its copy to the tracked source directory. Keep private or unapproved material outside tracked files.
- Treat tracked maintenance copies as provenance material outside the distributable skill. Do not place complete source articles under `skills/zh-technical-writing/`.
- Preserve the supplied order for reporting, but classify and curate each distinct source independently.

## Article analysis

Analyze every distinct article. Classify only what each article supports, and use a broader label or `unknown` instead of guessing.

Identify:

- document type;
- subject area;
- intended audience;
- purpose;
- tone and formality;
- length label;
- heading and paragraph structure;
- sentence and transition patterns;
- uses of lists, tables, code, commands, examples, quotations, and links;
- opening and closing patterns;
- terminology and English-term handling;
- technical depth;
- reusable structural and style characteristics;
- conflicts with `references/writing-guidelines.md`;
- exact duplicates, near duplicates, publication variants, translations, or newer versions within the supplied set and already represented in the corpus.

After the per-article analysis, compare the supplied set for recurring patterns and meaningful differences. Do not infer a recurring tendency solely because duplicate or near-duplicate versions repeat it.

Do not validate or promote the articles' technical claims unless the current task provides authoritative evidence for them.

## Curation rules

Use this precedence:

1. The user's explicit instructions for this task.
2. Technical correctness and protected technical content.
3. `references/writing-guidelines.md`.
4. Document-type guidance supported by the corpus.
5. Optional personal style tendencies.

Then update the smallest necessary reference set:

- Add or update normalized examples in the matching files under `references/examples/` only when an article contributes reusable evidence. Multiple distinct articles may produce multiple examples; duplicates or variants may map to one canonical example.
- Keep the normalized example concise. Describe structure and reusable tendencies instead of copying the complete article.
- Include the required metadata fields used by the existing examples and the repository-relative source path.
- Include a short representative excerpt only when it is essential, and avoid distinctive wording that could be copied into future output.
- Do not create one file per article, empty categories, placeholder files, or unnecessary nesting. Group examples by the existing document-type organization.
- Do not merge different articles merely because they discuss the same subject.
- For an exact duplicate, keep the existing canonical example and record the new source as a duplicate or variant.
- For a newer or more complete version, update the canonical characterization only when the new evidence materially improves it. Preserve useful differences and record the decision.
- Add every new maintenance source to `references/source-manifest.md`, including its destination, classification, extracted-example count, duplicate or merge decision, confidence, and uncertainty notes.
- Update summary counts and duplicate/version statistics in the manifest accurately.
- Update `references/taxonomy.md` or `references/document-types.md` only when the supplied articles support a genuinely new reusable category or change existing guidance.
- Update `references/personal-style.md` only for a pattern supported across the broader corpus. One article, or repeated copies and versions of one article, is not enough to establish a mandatory convention or strong recurring tendency.
- Keep habits that conflict with the formal guidelines optional or non-reusable, and record the conflict when useful.
- Keep `SKILL.md` concise. Change it only if activation, priority, protected-content handling, or the core workflow must change.
- Change `agents/openai.yaml` only if the skill's user-facing scope changes.
- Add or strengthen validator checks only for a durable structural invariant, not for article-specific wording or metadata.

## Technical-content boundaries

Unless explicitly requested otherwise, preserve exactly:

- code blocks and inline code;
- commands and CLI flags;
- file paths and URLs;
- configuration keys and values;
- environment variables;
- API, function, class, and package names;
- product names, versions, identifiers, and case-sensitive values;
- quoted source material and error messages.

Do not turn outdated, uncertain, or contradictory technical material into writing guidance. If prose conflicts with protected technical content, preserve the protected content and report the conflict.

## Validation

Run:

- `node skills/zh-technical-writing/scripts/validate-references.mjs`
- `npm run validate`
- `npm test`
- `git diff --check`

Also verify:

- every new distinct source appears exactly once in `references/source-manifest.md`;
- every curated source path appears in the manifest;
- every manifest destination exists;
- no absolute machine-specific path was added;
- no complete source article was copied into distributable references;
- no distinctive sentence was promoted as reusable output;
- no empty category directory exists;
- the installed skill works without repository-level `sources/` or `temp/writing-examples/`.

The validator treats explicitly recorded unavailable historical paths as provenance-only and verifies every migrated compatibility mapping when `temp/writing-examples/` is present. Do not remove unavailable entries or weaken tracked-source checks to hide missing material.

Fix all validation failures caused by this change. Do not make unrelated changes, install dependencies, stage files, commit, push, publish, or modify another repository.

## Final report

Provide:

1. Every supplied article path and its final repository-relative provenance path.
2. The classification and confidence for each distinct article.
3. Every curated example added or updated.
4. Duplicate or version decisions.
5. Reusable structural and style patterns extracted.
6. Conflicts with formal guidelines or uncertain classifications.
7. Every modified file.
8. Validation and test results, including any pre-existing incomplete-source limitation.
