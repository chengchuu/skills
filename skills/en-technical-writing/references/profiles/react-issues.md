# React issue profile

- Applies to: Issues for the React repository, or explicit requests for React-style issue writing
- Does not activate merely because: An application uses React
- Last reviewed: 2026-10-19

Apply [the general issue workflow](../issues.md). Keep this profile separate from the React documentation and PR profiles.

## Choose the destination and form

Check the target repository's current issue configuration when available. At review time, React provides runtime, compiler, and DevTools bug templates; its configuration directs documentation reports to the React documentation tracker and support questions to community help. Do not automatically file every React-related problem in the React core tracker. The general feature-request workflow does not imply that React offers a feature-request form; check the destination's contribution guidance.

Use the applicable form's title prefix and field names. Preserve supplied automated DevTools fields as instructed by that form, including version, error, and stack information. Do not fabricate values for empty automated fields or copy template example steps as if the reporter performed them.

## Bug-report bodies

Apply these details when drafting or reviewing a bug-report body. For title-only requests, use the applicable title prefix without requiring body fields or appending a verification checklist. Feature requests use the general workflow and the destination's applicable guidance, not the bug-form requirements below.

- **Runtime:** Record the affected React packages and versions, the reproduction, and actual versus expected behavior. Preserve relevant renderer, server/client, hydration, Strict Mode, and development/production conditions when known; do not demand every field for every report.
- **Compiler:** Identify the affected tool, exact React and compiler versions when supplied, reproduction steps and frequency, and a shareable Playground or repository example. Distinguish incorrect generated behavior from an installation, build, lint, or healthcheck problem. Preserve any observed compiler-enabled versus disabled comparison without inventing one.
- **DevTools:** Identify the app or reproduction, steps, frequency, and relevant browser/package/version information. Preserve the distinction between extension and standalone tooling. A local URL alone is not a shareable reproduction for maintainers.

The runtime template asks reporters to check the latest relevant release. Report that check only if performed; otherwise leave it as an outstanding step. A merged fix and an installed package containing that fix are different facts.

## Evidence

The [source manifest](../source-manifest.md#react-issue-history) records the templates and historical sample. [The analysis](../react-issue-history-analysis.md) distinguishes template requirements from editorial recommendations. Historical reports are writing evidence, not current API guarantees or verified causes.
