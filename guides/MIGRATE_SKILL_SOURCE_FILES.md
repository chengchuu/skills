# Migrate Skill Source Files

## Migration status

On 2026-09-01, publication was approved for all 133 recovered sources. The migration preserves one canonical tracked copy per file: 58 architecture articles, 25 additional Chinese-writing articles, 49 restaurant-review sources, and one complete pet-diary source. Every copy is recorded with its historical path, byte size, SHA-256, owner, and decision in `sources/SOURCE_MIGRATION_MAP.md`.

No personal English sources are currently registered. All 58 architecture provenance articles are now recovered. The complete pet source was recovered from its tracked source repository using the explicitly approved uncommitted working-tree bytes; its 66 sections include the six cases formerly maintained as supplemental examples. The four historical Bootstrap lesson sources were recovered from the tracked `chengchuu/bootstrap-blueprints` checkout. The procedures below remain the recovery and future-maintenance contract.

## Objective

Move approved public maintenance sources from ignored or device-local directories into Git-trackable directories under `sources/` without making individually installed skills depend on the original files.

The migration must preserve source content, provenance, historical path compatibility, generated-content ownership, and existing unrelated work. It must not stage, commit, push, publish, install plugins, or delete the source files on the original device.

## Scope

The migration covers source material used by these skills:

- `pet-diary-notes`
- `zh-restaurant-reviews`
- `en-technical-writing`, when personal English examples exist
- `design-project-architecture`, when the recorded source articles are available and approved for publication
- Any other public skill that references an ignored or device-local maintenance source discovered during the inventory

The completed source layout should use these roots:

```plain
sources/
├── design-project-architecture/
├── en-technical-writing/
├── pet-diary-notes/
├── zh-restaurant-reviews/
└── zh-technical-writing/
```

Do not place complete maintenance sources under `skills/`. Files under `sources/` support repository maintenance and provenance; they are not runtime dependencies of the distributable skills.

## Confirmed source state

The migration status above is authoritative for this checkout. Use the other device only to recover sources still listed as unavailable, then inventory and approve them before any later migration.

| Skill                         | Known source state                                                                                       | Primary risk                                                                                  |
|:------------------------------|:---------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|
| `pet-diary-notes`             | The complete 66-section source is tracked at `sources/pet-diary-notes/pet.md`; six former supplemental examples now use their canonical source headings. | Preserve byte identity, source-heading coverage, and standalone-skill validation. |
| `zh-restaurant-reviews`       | All 49 recorded Markdown files were recovered and migrated with historical compatibility mappings. | Future drift must be caught by the focused source validator. |
| `zh-technical-writing`        | All 79 historical source records now have tracked canonical copies; 54 are shared architecture sources and 25 live under its own root. | Keep compatibility mappings and canonical paths aligned. |
| `en-technical-writing`        | No personal English source directory is present; future approved inputs use `sources/en-technical-writing/`. | Do not create an empty source root or copy third-party documentation. |
| `design-project-architecture` | All 58 provenance articles were recovered and migrated. | Historical claims remain provenance rather than current authority. |

## Safety requirements

1. Read the repository's `AGENTS.md` completely and inspect `git status` before changing files.
2. Inventory candidate sources before copying or renaming them.
3. Preserve the original files on the other device. Create repository copies instead of moving or deleting the originals.
4. Confirm publication approval for every source. Do not copy private, ambiguous, or unapproved material into tracked files.
5. Scan each source for credentials, private keys, access tokens, cookies, real passwords, and personal information that is not already approved for publication.
6. Preserve source bytes exactly. Do not reformat Markdown, normalize line endings, fix spelling, update technical claims, or edit code while migrating a file.
7. Compare each copy with its original by SHA-256 and byte comparison before updating provenance records.
8. Preserve unrelated work. Do not stage, commit, push, publish, install dependencies, or update the local plugin.

## Inventory the source files

Create an inventory before mutation. Record these fields for every candidate:

- Original absolute path
- Owning skill
- Current filename
- Proposed repository-relative path
- File size
- SHA-256
- Document title or subject
- Document type
- Language
- Existing references from builders, validators, examples, or manifests
- Duplicate, near-duplicate, version, or translation relationship
- Publication approval
- Sensitive-data review result
- Unresolved questions

Treat files as exact duplicates only when their hashes match. Similar titles, subjects, or structures are insufficient evidence of duplication.

## Classify and rename copies

Use this default layout:

```plain
sources/<skill-name>/<project-or-topic>/<filename>.md
```

Apply these naming rules:

1. Prefer stable, descriptive, lowercase kebab-case names.
2. Preserve recognizable product names, package names, API names, and version numbers.
3. Add a `YYYY-MM-DD` prefix only when the date is supported by the source or its established filename.
4. Use explicit language suffixes such as `zh-CN`, `en`, or `ja-JP` for language variants when needed.
5. Resolve collisions with project, topic, language, date, or version information. Do not use ambiguous suffixes such as `copy`, `new`, `final`, or `final-2`.
6. Keep an existing filename when it is already stable and clear.
7. Rename only the repository copy. Do not rename or reorganize the original file on the other device.

Record every path change in a migration map:

| Original path | New repository path | SHA-256 | Skill   | Decision | Notes   |
|:--------------|:--------------------|:--------|:--------|:---------|:--------|
| Pending       | Pending             | Pending | Pending | Pending  | Pending |

## Migrate `pet-diary-notes`

1. Copy `temp/pet-examples/pet.md` to an appropriate path under `sources/pet-diary-notes/`.
2. Verify that the copy is byte-identical to the original.
3. Update `skills/pet-diary-notes/scripts/build-reference-corpus.mjs` so its repository default points to the tracked source.
4. Preserve support for an explicit source path supplied through the builder's existing command-line argument.
5. Update the validator so a Git checkout rejects a missing or unregistered tracked source.
6. Keep standalone validation functional without `sources/`, but make it clear that source-to-corpus comparison was skipped when the original is unavailable.
7. Preserve compatibility with historical `temp/pet-examples/pet.md` provenance.
8. Regenerate builder-owned examples and `source-manifest.md` through the builder. Do not hand-edit generated output independently.
9. Confirm that all 66 source sections remain represented once, including the six former supplemental examples under their canonical source headings.

## Migrate `zh-restaurant-reviews`

1. Locate all 49 Markdown files recorded in `skills/zh-restaurant-reviews/references/source-manifest.md`.
2. Produce an explicit missing-file list if fewer than 49 files are recovered. Do not reconstruct originals from curated examples or lower the expected count.
3. Copy recovered files into suitable subdirectories under `sources/zh-restaurant-reviews/`.
4. Preserve metadata-only, excluded, duplicate, translated, template, and non-restaurant source files when they are part of the recorded provenance.
5. Update example metadata and `source-manifest.md` to use the new paths while retaining historical `temp/examples/...` compatibility.
6. Add a focused validator that checks source registration, manifest uniqueness, curated-source coverage, destination existence, and tracked-source existence in a Git checkout.
7. Keep standalone skill validation independent of the repository-level `sources/` directory.
8. Preserve original reviews, uncertainty, omitted metadata, duplicate decisions, and non-curated decisions without inference.

## Update `en-technical-writing`

1. Create `sources/en-technical-writing/` only when personal English source files are present and approved for publication.
2. Replace future maintenance guidance that directs new sources to `temp/english-writing-examples/` with the tracked source policy.
3. Do not copy complete Google, Microsoft, or React documentation. Preserve their URLs and the existing derived guidance.
4. Update the validator only when a durable tracked-source invariant is introduced.
5. Preserve the skill's standalone installation and copyright boundaries.

## Review `design-project-architecture`

1. Match recovered articles to the provenance labels in `skills/design-project-architecture/references/source-manifest.md`.
2. Copy only sources that are both available and explicitly approved for publication.
3. Keep unavailable or private entries as provenance labels and report them as unresolved. Do not create replacement content.
4. Do not promote historical technical claims as current authority.
5. Update paths and validation only for sources that are intentionally tracked.

## Update repository guidance

Update `AGENTS.md`, affected `references/README.md` files, source manifests, and maintenance guides to establish these rules:

- New approved public maintenance sources belong under `sources/<skill-name>/`.
- `temp/` is limited to legacy compatibility and private or unapproved local inputs.
- Complete source articles must remain outside `skills/`.
- Individually installed skills must not depend on `sources/`.
- Git checkouts must validate the tracked sources used for repository maintenance.
- Historical `temp/...` provenance remains readable during migration.

Change `README.md` and `README.zh-CN.md` only if public discovery, installation, or documented behavior changes. Keep both files aligned when either file changes.

## Validate the migration

Run every affected skill validator, then run the repository checks:

```bash
npm run validate
npm test
git diff --check
```

Complete these targeted checks:

1. Confirm that each migrated file appears exactly once in its source manifest.
2. Confirm that every curated source appears in its manifest.
3. Confirm that every manifest destination exists.
4. Compare every repository copy with its original by SHA-256 and byte comparison.
5. Confirm that `sources/` is not ignored and that every new source appears in `git status --short --untracked-files=all`.
6. Confirm that no absolute machine-specific path was added to tracked documentation or skill files.
7. Scan new sources for secrets and unapproved personal information.
8. Validate temporary standalone copies of the affected `skills/<skill-name>/` directories without `sources/` or `temp/`.
9. Confirm that a Git-checkout fixture rejects a missing tracked source and an unregistered tracked Markdown source.
10. Confirm that historical `temp/...` provenance records remain accepted.
11. Do not remove manifest entries, reduce expected counts, or weaken checks to hide missing sources.

## Completion criteria

The migration is complete when:

- Every approved and available source has a verified tracked copy under the correct `sources/<skill-name>/` directory.
- Every source path change has a recorded old-to-new mapping.
- Builders and validators use the tracked source in repository checkouts.
- Standalone skills remain functional without repository-level sources.
- Historical provenance remains compatible.
- Missing, private, or unapproved sources are explicitly reported.
- All targeted and repository validation passes.
- The original files on the other device remain unchanged.
- No files have been staged, committed, pushed, published, or deleted.

## Final report

Report:

1. The number of sources found, migrated, skipped, and missing for each skill.
2. Every original path, new path, hash, and rename decision.
3. Duplicate, version, and translation decisions.
4. Publication and sensitive-data review results.
5. Every builder, validator, manifest, example, and guide changed.
6. Every validation command and result.
7. Remaining blockers and recovery requirements.
8. New files that still require user review and Git staging.
