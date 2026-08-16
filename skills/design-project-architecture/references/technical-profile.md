# Technical Profile

## Profile Status

This profile combines facts supplied directly by Cheng, durable themes extracted from 58 technical notes and articles, maintained architecture and static-site SEO conventions reviewed from Cheng's npm library template on 2026-08-01 and 2026-08-10, GitHub Actions conventions reviewed from the template on 2026-08-10, frontend linting conventions reviewed from Mazey on 2026-08-09, theme-system and PWA icon conventions reviewed from Cheng's profile site and Polestar theme on 2026-08-10, and official Bootstrap Icons guidance reviewed on 2026-08-16. Directly supplied facts are authoritative personal context. Source-derived themes indicate experience and working style; they are not mandatory technology choices or universal project rules.

## Directly Supplied Background

Cheng is an experienced full-stack developer with the following background:

- Backend: Go, Node.js, and PHP.
- Scripting and automation: Bash and PowerShell.
- Frontend languages: JavaScript and TypeScript.
- Frameworks and libraries: React.js, Vue.js, Bootstrap, and jQuery.
- React version preference: React 19 when React is selected and project constraints permit it.
- UI library version preference: Bootstrap 5 when Bootstrap is selected and project constraints permit it.
- Frontend build-tool version preference: webpack 5 when webpack is selected and project constraints permit it.
- Package-manager preference: use `pnpm install`, `pnpm add`, `pnpm update`, and `pnpm remove` only for local dependency operations; use npm for local development commands such as `npm run <script>` and `npm pack`; in GitHub Actions, use `npm install` and `npm run <script>` without npm dependency caching. Do not use `npm ci` or add a `packageManager` field to `package.json`.
- Frontend linting preference: for a greenfield JavaScript or TypeScript project without established conventions, start with the bundled framework-neutral ESLint formatting baseline at warning severity.
- Theme color preference: when a greenfield frontend needs ready-made colors and has no established brand palette, use the bundled light and dark blue theme preset.
- Browser theme-color preference: with the blue preset, use primary blue before initialization or on failure, then switch to the resolved light or dark surface.
- Website icon preference: for a greenfield website without an established icon system, use locally bundled Bootstrap Icons; show `sun-fill` for the resolved light theme and `moon-stars-fill` for the resolved dark theme.
- Web fundamentals: HTML and CSS.

Do not infer an ordering or preferred framework or build-tool default within these lists. React 19, Bootstrap 5, and webpack 5 are version preferences, not requirements to choose their respective technologies. Determine the best fit from the project and ask when another preference would materially change the design.

The ESLint baseline, blue theme palette, brand-first browser fallback, and Bootstrap Icons website preference are conditional greenfield defaults. Preserve an existing project's lint, formatting, branding, design-token, theme, and accessible icon contracts. Explicit product requirements and verified accessibility constraints take precedence over these defaults.

## Demonstrated Engineering Areas

The reviewed sources provide evidence of practical experience across these areas:

- Backend and data: Node.js services, URL-shortening design, SQL queries, MySQL operations, HTTP APIs, and Go packages and tools.
- Frontend architecture: TypeScript project setup, browser APIs and compatibility, multi-page applications, multiple bundle configurations, CDN integration, responsive web experiences, semantic theme systems, accessible website icon delivery, PWA icon delivery, and desktop applications combining Go with a web frontend.
- Build engineering: npm package workflows, TypeScript compilation, Babel, Webpack configuration composition, multi-compiler builds, bundle analysis, lint automation, generated documentation, static-site SEO assembly, and versioned assets.
- Reusable library architecture: a framework-independent package core, a React 19 playground isolated to development, explicit public entry points and declarations, multi-format package output, and generated consumer documentation.
- Performance and resilience: code splitting, dependency and image optimization, compression, caching, frontend monitoring, PWA and Service Worker lifecycle, offline behavior, and compatibility testing.
- Delivery and collaboration: Git conventions, Conventional Commits, pull request and issue labeling, GitLab CI/CD, GitHub Actions, package publication, incremental deployment, and reversible changes.
- Infrastructure and operations: Docker and Docker Compose, Debian and CentOS, Nginx, DNS, firewalls, TLS certificates, systemd, SSH and SCP, edge caching, tunnels, network routing, logs, and operational troubleshooting.
- Documentation and quality: technical tutorials, API references, testable examples, Go unit tests, Postman and Newman workflows, diagnostic checklists, source-to-output documentation tooling, and bilingual technical material.

## Working Preferences Inferred From the Sources

Treat these as evidence-backed tendencies, not absolute rules:

- Start from a concrete problem, environment, and desired outcome.
- Make project structure, component responsibilities, commands, and data or traffic flow visible.
- Prefer reusable packages and shared configuration when they remove verified duplication.
- Keep development, build, deployment, and runtime responsibilities distinct.
- Centralize authoritative project identity and configuration, derive dependent values, and keep intentionally different identifiers explicit.
- Keep published runtime code separate from examples, documentation sites, PWA behavior, and build-only framework dependencies.
- Validate changes with tests, dry runs, status commands, logs, generated output, and real compatibility checks.
- Validate the actual consumer artifact, including package contents and production-like generated sites, rather than relying on a successful source build alone.
- Consider browser, operating-system, CPU-architecture, line-ending, network, and legacy-runtime differences.
- Design for performance and loading experience, including bundle size, caching, compression, monitoring, and update behavior.
- Keep theme values behind semantic roles, coordinate framework and browser theme state, and verify contrast and interaction states when adapting a palette.
- Keep website interface icons accessible and owned by the site build; do not confuse control glyphs with product branding or installable-app artwork.
- Keep PWA icon canvases, artwork variants, manifest declarations, public URLs, and installed visual QA synchronized as one delivery contract.
- Keep canonical routes, page metadata, crawler files, structured data, social previews, and deployed asset validation synchronized as one factual static-site contract.
- Keep Pages deployment and package publication as separate side-effect boundaries with explicit triggers, least privileges, validation gates, and artifact ownership.
- Favor versioned and reversible delivery, retain required old assets, and use rollback-safe Git operations.
- Document setup, interfaces, failure modes, troubleshooting, and maintenance procedures.
- Prefer practical, maintainable automation over repeated manual commands.

## Profile Use

Use this profile to:

- identify technologies Cheng can likely evaluate and maintain efficiently;
- propose architecture options that build on existing experience;
- anticipate operational, compatibility, performance, and documentation concerns;
- explain when a less familiar technology offers enough benefit to justify its adoption.

Do not use this profile to:

- claim experience not listed or evidenced here;
- assume that older tools or versions remain preferred;
- substitute personal familiarity for project requirements, security needs, or current evidence;
- expose or reconstruct private details from the source corpus.
