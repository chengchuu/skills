# React PR history analysis

Reviewed on 2026-10-17. This is maintenance evidence for [the PR workflow](pull-requests.md) and [optional React PR profile](profiles/react-prs.md), not a runtime corpus or a React correctness audit.

## Snapshot and method

The source is the existing local `origin/main` snapshot, full SHA `098d2e87a1f7142947418d15f63f975b58c4685b`. The checkout's origin is the contributor fork `chengchuu/react`; its configured upstream is `react/react`. Both local tracking refs pointed at the same snapshot during inspection, but no fetch or exhaustive upstream-membership verification was performed. The latest commit is dated 2026-10-15.

The inventory used non-merge history reachable from that SHA, with Git's `--since=2023-10-17 --until=2026-10-18` filters. The requested window ends on 2026-10-17 inclusive. Period assignment uses each commit's `%cs` committer date: before 2024-10-17, before 2025-10-17, and the remaining window. These are commit-history dates, not PR creation or merge dates. For example, PR #26446 predates the requested period as a PR but its local commit is dated 2023-11-07. Imported history and rewritten dates can affect coverage.

All 4,416 commit subjects and bodies were inventoried. Empty bodies were kept in the denominator. Attribution trailers and Sapling stack footers were removed from reading copies; template HTML comments were omitted from prose review. Original objects were not changed. Counts of nonempty cleaned bodies are candidates for substantive review, not an assertion of useful content.

| Period                   | Commits | Empty bodies | Metadata-only bodies | Remaining bodies |
|:-------------------------|:--------|:-------------|:---------------------|:-----------------|
| 2023-10-17 to 2024-10-16 | 2260    | 399          | 9                    | 1852             |
| 2024-10-17 to 2025-10-16 | 1501    | 214          | 29                   | 1258             |
| 2025-10-17 to 2026-10-17 | 655     | 124          | 25                   | 506              |
| Total                    | 4416    | 737          | 63                   | 3616             |

A title heuristic flagged 70 nonempty-body candidates mentioning bump, Dependabot, or Renovate, and 319 bodies contained a Sapling footer. These are overlapping metadata signals, not mutually exclusive categories or proof of automated authorship. Routine updates outside that heuristic remain in the sample as counterexamples.

## Selection and coverage

Before deriving guidance, reserve four candidates per period for evaluation: runtime, compiler, tests, and revert, choosing the lowest full SHA in each bucket. From the remaining nonempty, unflagged candidates with a parenthesized PR number, select 30 per period: runtime 6, compiler 5, DevTools 4, tests 3, build/CI 4, documentation 3, tooling 3, and reverts 2. Sort each bucket by cleaned body word count and full SHA, then alternate shortest and longest until its quota is filled.

Buckets use subject keywords in this order: revert; compiler/forget; DevTools/Fusebox; test; build/CI/release/artifact/workflow; docs/README/comment/typo; ESLint/Flow/lint/script/dependency/bump/Prettier; runtime as the remainder. This deliberately coarse classification is a selection aid, not an ownership map. It places some cross-cutting commits in imperfect buckets. The 90 descriptions were reviewed for purpose, rationale, evidence, caveats, and unnecessary content; embedded generated diffs were treated as supporting artifacts rather than writing templates.

The sample contrasts terse and extensive descriptions rather than estimating population frequencies. It overrepresents length extremes and underrepresents ordinary mid-length descriptions. Empty bodies are inventoried but not among the 90. Internal references, imported PR numbers, and release lists are not silently treated as authoritative React PR prose. The registry records candidates, not a claim that every numbered suffix belongs to `react/react`.

## Findings and editorial decisions

- **Observed:** Concrete problem-and-result explanations appear in runtime, compiler, and infrastructure work. The HIR display correction (#29957), URL handling change (#34407), and sizebot change (#37322) connect a symptom to the relevant mechanism. **Recommendation:** Lead with the reviewer-relevant problem and result, then explain only consequential implementation choices.
- **Observed:** Larger proposals (#28491, #31975) use API examples and substantial rationale. Release lists (#31058, #28418) serve a different purpose. **Recommendation:** Scale the description to the change; neither API essays nor generated release inventories are defaults for fixes.
- **Observed:** Verification varies from brief manual notes to channel-specific commands, baseline comparisons, and benchmark qualifications (#28565, #31963, #37608, #37780). **Recommendation:** Preserve evidence and its limits. Historical assertions are not fresh validation, and missing evidence must remain missing.
- **Observed:** Reverts range from a bare reference (#29995) to an explanation of compatibility costs (#34747) or a deliberately restored regression (#37852). **Recommendation:** Explain the known reason and remaining problem without inventing them for sparse inputs.
- **Observed:** Some descriptions consist of a title reference, internal identifier, emoji, or generic acknowledgment (#28098, #30339, #32934). Others retain blank or duplicated template sections (#34407, #35623). **Recommendation:** Do not infer quality from merge status or reproduce these patterns.
- **Observed:** Benchmark and experimental-port descriptions explicitly constrain their claims (#37147, #36173). **Recommendation:** Keep workload, measured scope, and uncertainty; omit unsupported general performance promises.

These are qualitative observations and editorial judgments, not a statistically representative ranking or proof that the wording caused acceptance. Historical commands, APIs, and technical claims were not revalidated.

## Public PR cross-check

Six examples per period were selected from learning-sample positions 2, 8, 13, 20, 24, and 30. Public GitHub pages initially failed to load for 11 examples; unauthenticated GitHub API reads subsequently retrieved all 18 titles and bodies. No selected PR remained inaccessible. The API comparison removed HTML comments and normalized whitespace; commit-side attribution and stack footers had already been removed.

Sixteen bodies match under that normalization. PR #28491 changes the illustrative `useTransition` tuple binding from `setIsPending` in the commit to `startTransition` on GitHub. PR #31963 includes a Sapling footer on GitHub that was removed from the reading copy. Seventeen titles match after removing the commit's PR-number suffix; #31975 adds inline-code formatting around the component name. These comparisons establish correspondence for the selected examples, not every commit in the inventory. Current PR bodies can have edits made after merging; the comparison cannot date those edits.

The [source registry](source-manifest.md#react-pr-history) links every learning and held-out commit and records the 18 checks. No author emails, raw source dumps, or downloaded screenshots are included in the skill.

## Evaluation

See [the paired evaluation record](pr-writing-evaluation.md) for 12 held-out tasks and baseline/revised drafts. This is a same-session editorial evaluation, not an independent or blinded model benchmark. Structural checks complement it but cannot establish writing quality on their own.
