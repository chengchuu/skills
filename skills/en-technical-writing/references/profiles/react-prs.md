# React pull request profile

- Profile: React PR titles and descriptions
- Role: Optional ecosystem guidance, separate from [React documentation](react-docs.md)
- Applies to: Contributions to the React repository, or an explicit request for React-style PR writing
- Does not apply automatically to: Applications using React, unrelated projects, tutorials, or API documentation
- Last reviewed: 2026-10-17

Apply the [general PR workflow](../pull-requests.md) and existing precedence rules. History provides examples of writing decisions, not current React behavior or evidence that another change passes tests.

## Template and title

Read the target checkout's current template. The pinned snapshot used for this study has **Summary** and **How did you test this change?** headings. Preserve those headings when that template applies; an explicit user format or newer repository convention takes precedence.

Subsystem prefixes occur in the sample, but their spelling and use vary. Use a relevant prefix only when it helps match the target area's conventions. Do not copy a historical PR number or force Conventional Commits syntax.

## Reviewer context

Describe the trigger, consequence, and resulting behavior before implementation detail. Name the affected renderer, release channel, compiler backend, or environment when the distinction matters and the evidence establishes it. Do not assume a change applies to all React renderers, production builds, or compiler integrations.

Cover tooling, build/CI, tests, DevTools, and compiler contributions as well as runtime behavior. For test-only work, explain the coverage gained. For maintenance work, identify the concrete inconsistency or obstacle removed. A meaningful invariant or before/after scenario is usually more useful than a file inventory.

Keep relevant feature-flag boundaries, compatibility tradeoffs, and remaining limitations. Reverts need enough context to explain why restoration is necessary and which problem remains. Larger API proposals may need usage and rationale sections; that is not the default for a small fix.

## Verification

Report the checks actually run for the final change and the behavior they verify. Preserve channel, mode, backend, and environment qualifications. Compiler fixture or intermediate-representation comparisons do not establish browser behavior; a DevTools unit test does not establish extension behavior in every browser.

Do not transplant historical commands, counts, benchmarks, or “all tests pass” claims. Read available current evidence. Mention untested paths when material, and preserve uncertain performance conclusions as uncertain.

## Evidence boundaries

The [source manifest](../source-manifest.md#react-pr-history) records the pinned snapshot and selected commits. The [analysis](../react-pr-history-analysis.md) separates observed patterns, counterexamples, and editorial recommendations. Accepted descriptions include terse internal references, duplicated templates, generated release lists, and development chronology; acceptance alone is not an endorsement of those formats.
