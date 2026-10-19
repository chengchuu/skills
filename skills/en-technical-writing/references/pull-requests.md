# Pull request titles and descriptions

Use this workflow for writing, rewriting, translating, condensing, or reviewing PR prose. Apply the existing [output workflow](output-workflows.md) and [rule precedence](rule-precedence.md). Review-only requests return findings, not a replacement draft or code review.

## Establish the evidence

Identify whether the user wants a title, a body, or both. Read the target repository's PR template and relevant contribution instructions when available. A repository that uses React is not necessarily the React project; load [the React PR profile](profiles/react-prs.md) only for React contributions or an explicit style request.

When deriving content from repository changes, establish the intended PR scope before extracting facts: the target base branch and comparison range, and whether the request includes staged, unstaged, or untracked changes. Use the supplied PR, diff, or explicit scope when available; otherwise inspect the repository and session context. Keep unrelated working-tree changes outside the description. Ask only if the intended scope remains ambiguous. A prose-only rewrite or title request does not require repository inspection when the supplied material is sufficient.

Use the available supplied facts, scoped diff, relevant code, and actual check results to establish:

- The concrete problem or motivation, including the trigger and consequence when known.
- What changes for users, contributors, or maintainers, and why the chosen implementation produces that result.
- Verification actually performed, its result, and any material untested paths or remaining limitations.

Commit descriptions and linked issues can provide context, but do not prove the current diff's behavior or testing. Distinguish a test being added from a test being run. If only a title or sparse notes are available, draft only supported claims and identify missing evidence. Do not infer passing checks from a merged PR, a test filename, or a historical example.

## Write proportionately

Write a specific title naming the action and affected behavior. Use a subsystem prefix or Conventional Commits syntax only when requested or supported by the target project. Do not append historical PR numbers, copy merge suffixes, or impose an arbitrary character limit.

Follow the target template and requested format. If neither provides a structure, use **Summary** and **Testing** for a body. A title-only request returns only a title. A small change usually needs one or two summary sentences and relevant validation; add sections only when the decision or behavior needs them.

Lead the summary with the problem and resulting behavior. Include a concrete before/after example when it makes the change easier to assess. Explain implementation details only when they establish correctness, clarify a tradeoff, or help the reviewer navigate a substantial change. Group related changes by purpose instead of listing every file or narrating each development step.

Describe the final change. Remove abandoned approaches and review chronology unless they explain a consequential decision. Keep issue links that establish context, but make the summary understandable without opening them. Retain supported compatibility limits, remaining bugs, performance costs, and uncertainty; do not add generic risk or rollout sections to every PR.

## Report verification faithfully

State the actual commands or manual scenarios, results, and relevant scope. Preserve distinctions such as focused versus full-suite checks, development versus production, baseline failures versus new failures, and fixture comparison versus browser execution. Attribute a pre-existing failure to the baseline only when a comparison supports it.

If verification was not provided, say that it was not provided. Say tests were not run only when that is known; give the reason when supplied. Keep proposed testing separate from completed testing. Do not turn a documentation-only change into a claim that checks are unnecessary.

For performance claims, preserve the measured workload, comparison, and uncertainty. For reverts, explain the reason, restored behavior, and any known problem that remains. Do not infer either from the word “revert” alone.

## Finish in the requested mode

For translation and rewriting, preserve identifiers, commands, links, technical meaning, and the strength of claims. Preserve a requested structure; otherwise adapt it only to improve reviewer comprehension. Return copy-ready prose without a preface unless commentary was requested.

Before delivering, trace each factual and testing claim to the current evidence, check the template and output scope, and remove repetition. PR prose work does not authorize implementation, test execution, posting comments, or creating or updating a remote PR.

The [history analysis](react-pr-history-analysis.md) documents the evidence and limits behind these editorial recommendations. It is maintenance material, not required context for drafting.
