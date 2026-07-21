# Document-type guidance

Select a type from the actual corpus. Combine types only when the document genuinely serves both purposes.

## Contents

- [Technical tutorial](#technical-tutorial)
- [Installation and configuration guide](#installation-and-configuration-guide)
- [Troubleshooting guide](#troubleshooting-guide)
- [Technical analysis and concept explanation](#technical-analysis-and-concept-explanation)
- [API and integration guide](#api-and-integration-guide)
- [Product and tool guide](#product-and-tool-guide)
- [Deployment and operations guide](#deployment-and-operations-guide)
- [Best-practices guide](#best-practices-guide)
- [Reference document and cheat sheet](#reference-document-and-cheat-sheet)
- [General article](#general-article)

## Technical tutorial

- **Purpose:** teach a concept or implementation through a reproducible path.
- **Typical audience:** learners and developers with stated prerequisites.
- **Recommended structure:** goal and outcome; prerequisites; concept or architecture; ordered implementation; examples; verification; limitations; summary.
- **Tone:** practical, explanatory, medium-to-high formality.
- **Required inputs:** learning goal, environment, prerequisites, facts, and runnable material.
- **Optional sections:** alternatives, performance notes, exercises, references.
- **Common mistakes:** unexplained jumps, code without context, invented behavior, excessive heading depth.
- **Examples:** `examples/technical-tutorials.md`.

## Installation and configuration guide

- **Purpose:** establish a working environment or apply a controlled configuration change.
- **Typical audience:** developers, maintainers, and system administrators.
- **Recommended structure:** target state; applicability; prerequisites; backup or risk notice; steps; configuration; verification; rollback or troubleshooting.
- **Tone:** procedural and precise.
- **Required inputs:** operating system, versions, paths, permissions, exact commands, and expected result.
- **Optional sections:** alternatives, automation, security notes.
- **Common mistakes:** hidden prerequisites, unsafe defaults, missing verification, changing commands during editing.
- **Examples:** `examples/installation-and-configuration-guides.md`.

## Troubleshooting guide

- **Purpose:** move from an observable symptom to a verified resolution.
- **Typical audience:** developers and operators responding to a failure.
- **Recommended structure:** symptom; environment; impact; likely causes; diagnostic steps; confirmed cause; fix; verification; prevention or remaining risks.
- **Tone:** diagnostic, restrained, and evidence-led.
- **Required inputs:** exact error, reproduction conditions, environment, diagnostics, and observed results.
- **Optional sections:** decision tree, rollback, escalation criteria.
- **Common mistakes:** guessing the cause, presenting one workaround as universal, omitting destructive-operation warnings.
- **Examples:** `examples/troubleshooting-guides.md`.

## Technical analysis and concept explanation

- **Purpose:** explain mechanisms, trade-offs, history, or design choices.
- **Typical audience:** developers seeking understanding before implementation.
- **Recommended structure:** conclusion or question; scope; definitions; mechanism; examples; alternatives or trade-offs; recommendation; summary.
- **Tone:** analytical and explanatory.
- **Required inputs:** defined scope and supported claims.
- **Optional sections:** timeline, comparison table, implementation sketch.
- **Common mistakes:** long unscoped background, unsupported causal claims, confusing examples with evidence.
- **Examples:** `examples/technical-analysis.md`.

## API and integration guide

- **Purpose:** enable a consumer to connect systems or use an interface correctly.
- **Typical audience:** API consumers and integration developers.
- **Recommended structure:** use case; prerequisites and authentication; interface or workflow; parameters; request; response; errors; complete example; verification.
- **Tone:** formal, exact, and task-oriented.
- **Required inputs:** authoritative interface names, schemas, behavior, and examples.
- **Optional sections:** rate limits, pagination, compatibility, SDK notes.
- **Common mistakes:** translating identifiers, mismatched request/response examples, omitting error behavior.
- **Examples:** `examples/api-and-integration-guides.md`.

## Product and tool guide

- **Purpose:** explain what a tool does and how to use it for a concrete job.
- **Typical audience:** developers evaluating or adopting the tool.
- **Recommended structure:** problem and use case; tool scope; setup; core workflow; examples; limitations; next steps.
- **Tone:** practical and balanced.
- **Required inputs:** verified capabilities, constraints, and exact UI or command names.
- **Optional sections:** comparison, migration, pricing or platform notes when supplied.
- **Common mistakes:** promotional superlatives, stale feature claims, feature lists without workflow context.
- **Examples:** `examples/product-and-tool-guides.md`.

## Deployment and operations guide

- **Purpose:** deliver, automate, run, or maintain a system reliably.
- **Typical audience:** developers, DevOps engineers, and administrators.
- **Recommended structure:** objective and topology; prerequisites; security and permissions; procedure; automation/configuration; verification; rollback; monitoring.
- **Tone:** procedural and risk-aware.
- **Required inputs:** environment, credentials boundary, commands, artifacts, and success criteria.
- **Optional sections:** CI/CD diagram, failure recovery, operational checklist.
- **Common mistakes:** exposing secrets, omitting rollback, assuming one platform or shell silently.
- **Examples:** `examples/deployment-and-operations-guides.md`.

## Best-practices guide

- **Purpose:** recommend a convention or approach with stated reasoning and scope.
- **Typical audience:** maintainers and teams making repeatable decisions.
- **Recommended structure:** recommendation first; applicability; options; criteria; examples; exceptions; adoption checklist.
- **Tone:** concise, comparative, and non-dogmatic.
- **Required inputs:** decision context and evidence for trade-offs.
- **Optional sections:** migration plan, team policy template.
- **Common mistakes:** presenting preference as fact, absolute wording, ignoring exceptions.
- **Examples:** `examples/best-practices-guides.md`.

## Reference document and cheat sheet

- **Purpose:** make known information easy to retrieve.
- **Typical audience:** users who already understand the domain basics.
- **Recommended structure:** scope; conventions; grouped entries; exact examples; cautions; index or links.
- **Tone:** concise and reference-oriented.
- **Required inputs:** authoritative commands, keys, parameters, or values.
- **Optional sections:** quick-start sequence, comparison table.
- **Common mistakes:** unexplained destructive commands, inconsistent grouping, silently modernizing identifiers.
- **Examples:** `examples/reference-documents.md`.

## General article

- **Purpose:** explain or reflect on a broad non-technical or cross-domain topic.
- **Typical audience:** general readers.
- **Recommended structure:** central question; clear sections; concrete examples; balanced conclusion.
- **Tone:** explanatory or reflective, usually medium formality.
- **Required inputs:** supported claims and an explicit audience.
- **Optional sections:** narrative opening, comparison, practical implications.
- **Common mistakes:** importing technical-document rigidity or treating personal observation as universal evidence.
- **Examples:** `examples/general-articles.md`.
