# Issue titles and bodies

Use this workflow for bug reports and feature requests, together with the selected [output workflow](output-workflows.md) and [rule precedence](rule-precedence.md). It covers writing, rewriting, translation, and prose review; it does not establish technical correctness.

## Establish the task and evidence

Identify the requested title, body, or review findings and the intended tracker. Follow its applicable issue template or form when available. Distinguish a reported defect from a feature request or support question; do not force all three into a bug-report template. Apply [the React issue profile](profiles/react-issues.md) only to reports for the React repository or explicit requests for React-style issue writing.

Work from supplied notes, reproduction material, and relevant observed results. Repository access, a complete reproduction, and a known cause are not prerequisites for drafting. Ask only when missing information prevents a meaningful result; otherwise draft supported content and identify the material gaps. Do not require body details for a title-only request.

## Bug reports

Use a descriptive title naming the symptom and distinguishing condition. Do not assert a cause, regression, severity, or affected version range without evidence. Follow a required title prefix when the target template specifies one; do not use commit-message syntax by default.

Lead with the observed problem and its impact. Follow the target template; without one, organize the available facts around reproduction, actual behavior, expected behavior, and relevant environment details. Keep a small report short rather than filling empty sections with boilerplate.

- Give ordered steps with the necessary setup, trigger, and observation point. Preserve conditions such as first versus later requests, development versus production, and intermittent versus consistent failures.
- Include the supplied minimal example or reproduction link and relevant versions or configuration. Distinguish an example supplied by the reporter from one actually run during the task. A screenshot or stack trace can support a report without establishing reproducibility.
- State what happened separately from what the reporter expected. Label an expectation based on an assumption as such; do not silently turn it into a documented guarantee.
- Keep suspected causes, workarounds, and proposed fixes separate from observations. For a claimed regression, include the known working and failing versions when available; do not invent a version boundary.

Preserve exact errors and meaningful reproduction details. If supplied code and prose conflict, flag the conflict rather than repairing the example during a writing-only task. Never invent reproduction URLs, environment values, successful checks, or claims of testing the latest release. Indicate missing information honestly; required form fields can remain unresolved in a draft, but do not describe that draft as ready to submit.

## Feature requests

Describe the concrete use case, the current limitation, and the desired improvement. A request may improve an existing workflow rather than enable an impossible task. Include the affected audience, an illustrative example, and any workaround and its limitations when supplied. Present a proposed API or implementation as a proposal, not the only acceptable solution. Discuss alternatives and compatibility concerns only when relevant and supported. Do not require bug reproduction steps or claim existing behavior is defective merely because a feature is missing.

## Finish in the requested mode

Return only the requested title, body, or findings. Preserve technical literals and uncertainty when rewriting or translating. When using an existing discussion, distinguish the opening report from later corrections and maintainer conclusions; closure alone does not establish a fix, duplicate, or invalid report. If related-issue research is requested, support any duplicate claim with the actual overlap in behavior.

Drafting alone does not authorize posting an issue or executing its reproduction; honor any separate authorization already given. Check factual support, template fit, and unresolved fields before delivery. See [the issue-history analysis](react-issue-history-analysis.md) only for maintenance evidence.
