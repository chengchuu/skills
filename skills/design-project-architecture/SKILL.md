---
name: design-project-architecture
description: Design and review project architecture using Cheng's experienced full-stack background while respecting the target repository, product requirements, delivery constraints, and current technical evidence. Use when Cheng asks to choose a technology stack, define service or module boundaries, map repository structure and entry points, explain component or data flow, plan a new full-stack system, compare architecture options, prepare an architecture decision, or evolve an existing project. Do not use for implementation-only tasks whose architecture is already settled.
---

# Design Project Architecture

Design an architecture that Cheng can build, operate, and evolve. Treat familiar technologies as useful leverage, not mandatory defaults. Prefer explicit product constraints and evidence from the target repository over this profile.

## Required References

Read [references/technical-profile.md](references/technical-profile.md) for every architecture task.

Read [references/architecture-decisions.md](references/architecture-decisions.md) when selecting technologies, defining boundaries, planning delivery, or comparing alternatives. Read [references/package-project-patterns.md](references/package-project-patterns.md) when designing or customizing a reusable package, its examples, documentation site, generated artifacts, or release workflow. Read [references/frontend-eslint-defaults.md](references/frontend-eslint-defaults.md) when a design defines frontend JavaScript or TypeScript linting, formatting, or coding conventions. Read [references/frontend-theme-system.md](references/frontend-theme-system.md) when a design defines theming, design tokens, color schemes, Bootstrap theme integration, browser chrome, or PWA appearance. Also read [references/frontend-blue-theme-preset.md](references/frontend-blue-theme-preset.md) when a design needs ready-made blue colors or Cheng's preferred theme preset. Read [references/frontend-browser-theme-color.md](references/frontend-browser-theme-color.md) when a design defines browser `theme-color`, preference resolution, early theme initialization, or dynamic theme synchronization. Read [references/frontend-project-icons.md](references/frontend-project-icons.md) when a design defines a PWA manifest, installable-app icons, maskable assets, a project icon system, or icon delivery architecture. Read [references/source-manifest.md](references/source-manifest.md) only when the task benefits from knowing which sources support the profile.

## Workflow

1. Define the outcome and constraints: users, core workflows, scale, latency, availability, data sensitivity, deployment environment, integrations, budget, schedule, team, maintenance horizon, and required platforms. Distinguish confirmed facts, preferences, assumptions, and unknowns.
2. For an existing repository, inspect its applicable `AGENTS.md`, manifests, lockfiles, source entry points, configuration, workflows, tests, deployment files, and current component boundaries. Identify authoritative configuration, derived values, generated outputs, published artifacts, and runtime data before proposing changes. Preserve established choices unless the task justifies changing them.
3. Read the required references. Use Cheng's experience to reduce delivery and maintenance risk, but do not infer proficiency, preference, or a project requirement beyond what the profile records.
4. Identify the smallest architecture that satisfies the confirmed requirements. Start with a modular monolith or a small number of deployable units unless independent scaling, isolation, ownership, availability, or release needs justify more services.
5. Define the system concretely: clients, runtime components, module or service ownership, APIs and events, data stores, trust boundaries, configuration, build outputs, deployment topology, observability, failure handling, backup or recovery, and upgrade path.
6. Compare material alternatives. Evaluate implementation fit, operational burden, performance, security, portability, ecosystem maturity, migration cost, and reversibility. Include an unfamiliar option when it is materially better; explain the learning or staffing cost.
7. Verify time-sensitive claims against current official documentation or installed project contracts. Treat the article-derived profile as evidence of experience and working style, not as a current version catalog.
8. Deliver a decision-ready design. State the recommendation first, then the structure, data flow, technology choices, trade-offs, validation plan, staged delivery, risks, and unresolved questions.

## Decision Rules

- Do not force Go, Node.js, PHP, React, Vue.js, Bootstrap, jQuery, Docker, Webpack, or another familiar technology when it conflicts with the requirement or repository.
- Prefer technologies already used successfully in the target project when they satisfy the requirement and reduce operational diversity.
- Keep source code, generated output, deployment configuration, and runtime data ownership explicit.
- Keep the product runtime independent from examples, documentation, playgrounds, and deployment-only features unless their coupling is an intentional product contract.
- Prefer clear module contracts and a flat public API over wrappers or layers that add no policy, isolation, or domain meaning.
- Make data ownership and consistency guarantees explicit before choosing storage, queues, caches, or service boundaries.
- Design performance, security, observability, testing, deployment, rollback, and recovery with the architecture rather than appending them after implementation.
- Preserve compatibility and incremental migration paths when modernizing an existing system.
- Validate the artifacts users install or deploy, not only source compilation; inspect package contents, generated documentation, static output, migrations, or deployment bundles as applicable.
- Keep lint and formatting ownership explicit. Do not recommend configurations that produce conflicting fixes or require unrelated repositories to adopt Cheng's greenfield defaults.
- Prefer reversible delivery: versioned artifacts, controlled migrations, staged rollout, explicit rollback, and retained compatibility where justified.
- Avoid speculative scale, premature distribution, fashionable dependencies, and infrastructure that the project cannot operate confidently.

## Output Contract

Scale the response to the decision. For a substantial design, include:

1. **Recommendation**: architecture style and why it fits.
2. **Assumptions and drivers**: confirmed constraints, preferences, and open questions.
3. **System structure**: components, responsibilities, entry points, and repository layout.
4. **Data flow**: requests, events, storage, caches, external systems, and failure paths.
5. **Technology choices**: selected options, rejected alternatives, and trade-offs.
6. **Cross-cutting design**: security, observability, testing, performance, deployment, rollback, and recovery.
7. **Delivery plan**: the smallest useful slice followed by staged evolution.
8. **Risks and validation**: architecture spikes, load or compatibility tests, operational checks, and decisions still requiring evidence.

Use a compact tree for repository layout. Use a Mermaid flow or sequence diagram only when three or more components or state transitions are materially easier to understand visually. If evidence is insufficient, present a provisional design and name the missing decisions instead of inventing requirements.

## Boundaries

Do not:

- treat an old article, example version, CDN URL, package command, or deployment procedure as current authority;
- expose private source locations, secrets, hostnames, credentials, tokens, or unpublished project details;
- recommend a rewrite when a focused evolution of the current system is safer;
- split a system into services without explicit ownership, scaling, isolation, or release reasons;
- select a database, framework, cloud provider, or deployment platform solely because Cheng has used it before;
- implement the architecture unless the user also requests implementation.
