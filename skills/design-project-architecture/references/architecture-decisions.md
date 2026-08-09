# Architecture Decisions

## Table of Contents

- [Evidence Order](#evidence-order)
- [Architecture Baseline](#architecture-baseline)
- [Technology Selection](#technology-selection)
- [System Boundaries](#system-boundaries)
- [Data and Integration](#data-and-integration)
- [Frontend and Delivery](#frontend-and-delivery)
- [Operations and Quality](#operations-and-quality)
- [Decision Record](#decision-record)

## Evidence Order

Apply evidence in this order:

1. Current user requirements and corrections.
2. Applicable repository instructions and observed project contracts.
3. Product, security, operational, regulatory, budget, and delivery constraints.
4. Current official documentation, installed contracts, and measured experiments.
5. Cheng's directly supplied technical profile.
6. Durable working preferences inferred from the reviewed sources.
7. General defaults.

Use higher sources to determine intent and verified technical evidence to determine feasibility. A preference does not override an incompatible project contract, measured result, security requirement, or platform constraint. State the conflict and the resulting trade-off.

## Architecture Baseline

Prefer the smallest deployable topology that meets the requirement:

- Start with one application or a modular monolith when a single team owns the product and components share release, scale, and availability needs.
- Separate a worker, scheduled job, CLI, or static frontend when its runtime or delivery lifecycle is genuinely different.
- Introduce services only for independent scaling, isolation, ownership, availability, security boundaries, or release cadence.
- Preserve existing architecture when the requested feature fits cleanly; avoid turning a focused change into a platform rewrite.

Define module boundaries by domain responsibility and data ownership, not by framework folders alone.

## Technology Selection

Use familiarity as a tie-breaker after requirements are satisfied.

### Backend

- Consider Go for a service, CLI, automation binary, or desktop backend when simple deployment, concurrency, predictable resource use, or native integration is important.
- Consider Node.js when shared JavaScript or TypeScript expertise, ecosystem integration, event-driven I/O, rapid product iteration, or frontend-backend code sharing provides real value.
- Consider PHP when extending an existing PHP system, fitting established hosting and operational constraints, or preserving a mature application boundary.
- Consider another runtime when its ecosystem or operating model materially fits better. State the adoption cost and validation needed.

Do not choose a runtime before defining workload shape, concurrency, latency, deployment, integration, and maintenance needs.

### Frontend

- Prefer TypeScript for a nontrivial maintained application when its type and tooling cost is justified.
- Select React.js or Vue.js from existing project conventions, product interaction needs, team ownership, and ecosystem requirements. Do not invent a framework preference between them.
- When React is selected for a new project, prefer React 19. For an existing project, preserve its current React version unless upgrading to React 19 is in scope and compatibility, migration effort, dependencies, tests, and deployment have been verified.
- Treat Bootstrap and jQuery as valid tools for incremental, legacy, content-oriented, or compatibility-focused systems. Do not introduce or remove them automatically.
- When Bootstrap is selected for a new project, prefer Bootstrap 5. For an existing project, preserve its current Bootstrap version unless upgrading to Bootstrap 5 is in scope and markup, JavaScript integrations, themes, browser support, visual regressions, and dependencies have been verified.
- Keep HTML, CSS, accessibility, browser behavior, and progressive enhancement visible beneath framework choices.

### Build and Packaging

- Reuse the repository's package manager, module format, bundler, linting, and test conventions when they meet the requirement.
- When webpack is selected for a new project, prefer webpack 5. For an existing project, preserve its current webpack version unless upgrading to webpack 5 is in scope and configuration, loader and plugin compatibility, dependencies, tests, generated assets, and deployment have been verified.
- Separate source configuration from generated output.
- Identify the authority for each identity or configuration value and derive dependent values instead of repeating them. Keep values distinct when their formats or scopes differ, such as package name, repository slug, browser global, artifact filename, site base path, cache namespace, and display name.
- Keep public entry points, implementations, types, tests, examples, documentation, package metadata, and generated artifacts synchronized as one consumer contract.
- Isolate development-only frameworks and site features from a framework-independent library or service runtime when that boundary is intentional.
- Use multiple build entries or configurations only when outputs have distinct contracts; share common configuration without hiding important differences.
- Measure bundle and build costs before adding optimization machinery.

## System Boundaries

For each component, record:

- responsibility and owning domain;
- public interface and callers;
- data owned, read, cached, or derived;
- runtime and deployment unit;
- failure behavior and retry or recovery policy;
- security and trust boundary;
- observability and validation surface.

Reject a boundary that only renames files or forwards calls without adding ownership, policy, isolation, or a stable contract.

## Data and Integration

- Define the system of record before adding caches, replicas, indexes, or search stores.
- State consistency, transaction, idempotency, retention, backup, migration, and recovery requirements.
- Prefer synchronous APIs for immediate request-response work and asynchronous jobs or events only when decoupling, retries, latency, or workload smoothing requires them.
- Document request and event schemas, authentication, authorization, error contracts, timeouts, retries, and observability.
- Validate third-party API and network assumptions; include degraded behavior when a dependency is unavailable.

## Frontend and Delivery

- Define routing, entry points, state ownership, data fetching, error states, accessibility, browser baseline, and rendering strategy.
- Version static assets and preserve old assets when cached documents may still reference them.
- Treat cache keys, invalidation, Service Worker updates, CDN behavior, and offline support as product decisions.
- Include performance budgets or measurable targets when loading experience matters.
- Prefer staged delivery and compatibility boundaries over all-at-once rewrites.

## Operations and Quality

Address these areas in proportion to risk:

- configuration and secret ownership;
- container or host boundaries;
- health checks, logs, metrics, traces, and alerts;
- TLS, DNS, firewall, proxy, and public exposure;
- CPU architecture, operating system, shell, permissions, and line endings;
- unit, integration, API, end-to-end, compatibility, migration, load, and recovery tests;
- CI/CD gates, versioning, immutable artifacts, rollback, and disaster recovery;
- dependency maintenance, generated output, and documentation ownership.

Prefer direct diagnostic evidence. A file existing is not proof that it is executable; a build succeeding is not proof that deployment, caching, migration, or rollback works.

## Decision Record

For each material choice, capture:

| Field | Content |
| --- | --- |
| Decision | The selected architecture or technology. |
| Drivers | Requirements and constraints that determine the choice. |
| Alternatives | Serious options considered. |
| Trade-offs | Benefits, costs, risks, and operational impact. |
| Evidence | Repository contracts, measurements, prototypes, or current documentation. |
| Reversibility | Migration boundary, rollback path, and lock-in. |
| Validation | Tests or experiments required before commitment. |

Do not manufacture numerical scale, cost, or performance claims. Mark unknown values and identify the measurement needed.
