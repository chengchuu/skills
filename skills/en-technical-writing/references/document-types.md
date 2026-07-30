# Document types

Classify content at two levels, then apply the matching deliverable pattern. Do not treat every document as a tutorial.

## Topic type

| Type | Reader need |
| --- | --- |
| Concept | Understand what something is, why it matters, and how to reason about it |
| Task | Complete a specific goal |
| Reference | Look up exact, complete information |
| Troubleshooting | Diagnose and recover from an observed problem |

## Deliverable selection

| Deliverable | Purpose and audience | Required inputs | Recommended structure, opening, and heading patterns |
| --- | --- | --- | --- |
| README | Help prospective and current users evaluate and start using a project | Purpose, audience, prerequisites, install and first-use facts | Lead with what the project does; use *Install*, *Usage*, *Configuration*, and *Support* as relevant |
| Quickstart | Produce a first successful result for new users | Minimal prerequisites, install command, working example, expected result | Lead with the result; use *Prerequisites*, task headings, and *Verify the result* |
| Installation guide | Install a product in supported environments | Platforms, versions, dependencies, commands, permissions | Lead with supported scope; use *Prerequisites*, platform task headings, and *Verify the installation* |
| Configuration guide | Set valid options for a goal | Keys, defaults, allowed values, precedence, reload behavior | Lead with the configuration goal; group settings by task or component and end with verification |
| Tutorial | Teach concepts by building a result | Audience level, goal, prerequisites, examples, verification | State the goal and useful learning outcomes; use incremental task headings and a recap when substantial |
| How-to guide | Help an informed reader complete one goal | Preconditions, actions, decision points, result | Lead with the goal; use imperative task headings and verification without a long conceptual opening |
| API reference | Support exact lookup of public interfaces | Signatures, parameters, returns, errors, side effects, caveats | Open with a concise action summary; use stable member, parameter, return, caveat, and example headings |
| CLI reference | Support exact command and option lookup | Syntax, arguments, flags, defaults, exit behavior, examples | Open with purpose and syntax; use consistent command, option, exit-status, and example headings |
| Troubleshooting guide | Diagnose symptoms and recover safely | Exact symptom, possible causes, diagnostics, fixes, risks | Lead with the symptom; use *Possible causes*, diagnostic tasks, corrective actions, and verification |
| Migration guide | Move readers between versions or systems | Source and target versions, breaking changes, sequence, rollback | Lead with scope and impact; use *Before you migrate*, ordered tasks, *Verify*, and *Roll back* |
| Release notes | Explain user-visible changes in a version | Version, changes, compatibility, migration, known issues | Lead with impact; group *Added*, *Changed*, *Fixed*, *Deprecated*, and *Known issues* consistently |
| Architecture overview | Explain system boundaries and interactions | Components, responsibilities, data flow, constraints, decisions | Lead with purpose and scope; use *Context*, *Components*, *Data flow*, *Constraints*, and *Decisions* |
| Design document | Enable review of a proposed technical decision | Problem, goals, non-goals, constraints, options, decision, risks | Lead with decision context; use *Goals*, *Non-goals*, *Options*, *Decision*, *Risks*, and *Open questions* |
| Contributing guide | Help contributors make valid changes | Setup, workflow, checks, conventions, submission process | Lead with prerequisites; use task headings from setup through tests and submission |
| Security guidance | Help readers avoid, report, or respond to risk | Threat, supported versions, safe procedure, disclosure path | Lead with risk and scope; use *Supported versions*, *Report a vulnerability*, and safe task headings |
| Operations guide | Run and maintain a system reliably | Environments, permissions, routine procedures, monitoring, recovery | Lead with operational scope; use task headings for monitoring, maintenance, recovery, and escalation |
| Deployment guide | Release a system to an environment safely | Target, permissions, artifact, sequence, health checks, rollback | Lead with target and risk; use *Prerequisites*, deployment tasks, *Verify*, and *Roll back* |

## Delivery expectations

| Deliverable | Code examples | Verification | Common mistakes | React profile | “You will learn” | Summary or recap |
| --- | --- | --- | --- | --- | --- | --- |
| README | Minimal first use | Recommended | Marketing-first opening; missing prerequisites | Sometimes | Rarely | Rarely |
| Quickstart | Small and runnable | Required | Too much theory; no expected result | Sometimes | Optional | Rarely |
| Installation guide | Copyable commands | Required | Missing platform or version scope | Rarely | No | Optional |
| Configuration guide | Exact, focused examples | Required for consequential settings | Missing defaults or precedence | Sometimes | No | Optional |
| Tutorial | Incremental and runnable | Required | Exhaustive reference; unexplained jumps | Yes for React topics | Appropriate when substantial | Appropriate when substantial |
| How-to guide | Only what the task needs | Required when the result is not obvious | Long concept lesson; hidden actions | Sometimes | No | Rarely |
| API reference | Minimal usage examples | Demonstrate behavior without invented output | Tutorial-only structure; incomplete caveats | Yes for React APIs | No | No |
| CLI reference | Copyable commands; output separate | Include exit or observable result when known | Prompt markers; invented output | No | No | No |
| Troubleshooting guide | Diagnostic and repair commands | Required | Treating a possible cause as confirmed | Sometimes | No | Optional |
| Migration guide | Before/after snippets | Required, plus rollback when available | Missing version boundary or irreversible risk | Yes for React migrations | No | Recommended |
| Release notes | Only for migration or changed behavior | State upgrade checks when needed | Promotional wording; hidden breaking changes | No | No | No |
| Architecture overview | Illustrative snippets only | Validate diagrams and stated flows | Internal detail without reader context | Sometimes | No | Optional |
| Design document | Prototypes only when relevant | Define acceptance evidence | Omitting alternatives, risks, or non-goals | Sometimes | No | Recommended |
| Contributing guide | Exact setup and check commands | Required | Unverified setup; missing contribution checks | Sometimes | No | Optional |
| Security guidance | Minimal safe commands | Required | Putting warnings after risky actions | Rarely | No | Optional |
| Operations guide | Exact operational commands | Required, with health and recovery checks | Missing permissions, monitoring, or escalation | Rarely | No | Recommended |
| Deployment guide | Exact release commands | Required, with health and rollback checks | Missing target scope, artifact, or rollback | Rarely | No | Recommended |

## Special patterns

For API entries, describe each public item in scope with a precise verb such as *Creates*, *Returns*, *Checks*, *Sets*, *Updates*, *Deletes*, or *Registers*. Include signatures, parameters, returns, exceptions, errors, side effects, caveats, and related APIs when supported.

For troubleshooting, preserve exact error text, distinguish confirmed and possible causes, use blameless language, and put data-loss or security risks before the corrective action.
