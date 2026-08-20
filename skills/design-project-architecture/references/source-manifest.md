# Source Manifest

## Table of Contents

- [Scope](#scope)
- [Corpus Coverage](#corpus-coverage)
- [Maintained Repository Sources](#maintained-repository-sources)
- [Official Product Sources](#official-product-sources)
- [Interpretation Rules](#interpretation-rules)

## Scope

The technical profile was distilled from 58 Markdown notes and articles reviewed on 2026-08-01. The source material spans 2017–2026 and includes historical versions, drafts, bilingual editions, command references, and non-architecture pages. Only durable experience and working patterns were retained.

The distributable skill does not include the original corpus or its machine-specific location. Filenames below are relative provenance labels. Treat them as coverage evidence, not current technical authority.

## Corpus Coverage

### Core Development and Operations

- `17-0714_SQLServer.md`
- `20-0422_Algorithm.md`
- `20-0619_Promise.md`
- `20-0818_TypeScript_Project.md`
- `20-0828_TypeScript_Babel.md`
- `21-0110_Node.js_Short_Link.md`
- `21-0128_Postman.md`
- `21-0716_Node.js_SCP.md`
- `23-1023_EdgeOne.md`
- `25-0330_Video.md`
- `26-0612-macOS-LAN.md`
- `26-0613-macOS-scutil.md`
- `26-0899-Debian-Certbot.md`
- `Draft_Cloudflare-Tunnels.md`
- `Draft_frp.md`

### Docker

- `Docker/23-0119_Docker.md`
- `Docker/26-0305_Docker_Errors_EN.md`
- `Docker/26-0305_Docker_Errors_ZH.md`

### Frontend

- `Frontend/18-0102_HTML5.md`
- `Frontend/21-0531_Frontend.md`
- `Frontend/21-1228_Frontend_Performance.md`
- `Frontend/24-1027_Frontend_iOS.md`

### Git and CI/CD

- `Git/20-0820_GitLab_CLI.md`
- `Git/20-0911_GitLab_Runner.md`
- `Git/21-0225_GitHub_SSH_Keys.md`
- `Git/23-0529_Git_Error.md`
- `Git/24-0405_Git_Version.md`
- `Git/25-0927_GitHub_Action.md`

### Go

- `Go/23-0526_Go_TypeDoc.md`
- `Go/23-1024_Go_Library.md`
- `Go/23-1101_Go_Scripts.md`
- `Go/24-0219_Go_Wails.md`

### Linux and Data Services

- `Linux/17-0518_CentOS_PHP.md`
- `Linux/23-0625_Debian_Docker.md`
- `Linux/23-0708_Debian.md`
- `Linux/26-0104_Debian_Docker.md`

### PWA and Workbox

- `PWA/21-0309_PWA.md`
- `PWA/26-0308_Workbox_Deps.md`
- `PWA/26-0503_Workbox_EN.md`
- `PWA/26-0503_Workbox_ZH.md`
- `PWA/26-0503_Workbox_ZH_Hash.md`

### Pages and Reference Material

- `Pages/21-0217_CDN_Lib.md`
- `Pages/21-0825_Monitor.md`
- `Pages/21-1103_API.md`
- `Pages/21-1112_Happy_Birthday.md`
- `Pages/21-1222_Rest.md`
- `Pages/26-0424_Happy.md`
- `Pinned/22-0303-Git-Command.md`
- `Pinned/22-0508_Banner.md`
- `Pinned/22-1007_webpack_Basic.md`
- `Pinned/23-1017_npm.md`
- `Pinned/25-0111-Git-Label.md`
- `Pinned/26-0114-Docker.md`

### Webpack

- `webpack/20-0824_webpack_GitLab.md`
- `webpack/20-0828_webpack_Merge.md`
- `webpack/21-0104_webpack_Analyzer.md`
- `webpack/26-0418_webpack_EN.md`
- `webpack/26-0418_webpack_ZH.md`

## Maintained Repository Sources

The following current repository documents were reviewed on 2026-08-01 as a concrete example of Cheng's npm library architecture and customization discipline:

- `mazey-npm-template/AGENTS.md`
- `mazey-npm-template/guides/CUSTOMIZE.md`

They support the reusable patterns in [package-project-patterns.md](package-project-patterns.md). Treat exact paths, commands, tools, output names, URLs, and deployment behavior as template-specific contracts rather than defaults for unrelated projects.

The following maintained static-site sources were reviewed on 2026-08-10:

- `mazey-npm-template/site/index.html`
- `mazey-npm-template/examples/index.html`
- `mazey-npm-template/project.config.js`
- `mazey-npm-template/scripts/build-pages.js`
- `mazey-npm-template/scripts/validate-seo.js`
- `mazey-npm-template/test/seo.test.js`

They support the SEO ownership and validation contract in [frontend-seo-delivery.md](frontend-seo-delivery.md). Treat the central canonical-route authority, deterministic generated-page metadata, crawler-file generation, deployment-base asset handling, and final-artifact validation as reusable architecture. Keep template titles, descriptions, routes, schema types, project names, claims, image assets, and implementation identifiers local to projects where they are verified.

The following maintained GitHub Actions guide was reviewed on 2026-08-10:

- `mazey-npm-template/guides/GITHUB_ACTIONS.md`

It supports the workflow boundaries in [github-actions-delivery.md](github-actions-delivery.md). Treat validation before side effects, separated Pages and package publication, least privileges, protected triggers, and artifact verification as reusable architecture. Adapt versions, actions, branches, scripts, outputs, environments, registries, and authentication to the target repository; apply Cheng's directly supplied preference for local pnpm dependency operations, local npm development commands, and online `npm install` plus `npm run <script>`.

The following maintained frontend tooling guide was reviewed on 2026-08-09:

- `mazey/guides/ESLINT_RULES.md`

It supports the conditional defaults in [frontend-eslint-defaults.md](frontend-eslint-defaults.md). Treat the rule behavior as Cheng's greenfield preference; verify rule availability and integration against the target project's installed ESLint and formatter contracts.

The following maintained frontend theme guide was reviewed on 2026-08-10:

- `chengchuu.github.io/guides/THEME_COLOR_SCHEME.md`

It supports the reusable architecture in [frontend-theme-system.md](frontend-theme-system.md) and the exact colors in [frontend-blue-theme-preset.md](frontend-blue-theme-preset.md). Treat its semantic roles, theme coordination, framework mapping, and validation workflow as design evidence. The palette is Cheng's directly selected greenfield preset; preserve existing project branding and theme contracts, and keep unrelated site-specific behavior local to projects with the same requirements.

The following maintained browser theme-color guide was reviewed on 2026-08-10:

- `polestar/guides/PRIMARY_THEME_COLOR.md`

It supports the lifecycle in [frontend-browser-theme-color.md](frontend-browser-theme-color.md). Treat the separation of default browser color, user preference, resolved theme, early initialization, failure handling, and dynamic synchronization as reusable architecture. Keep Polestar-specific markup, storage keys, templates, bundles, and component ownership local to that project.

The following maintained PWA icon guide was reviewed on 2026-08-10:

- `polestar/guides/PROJECT_ICON_RULES.md`

It supports the greenfield contract and validation workflow in [frontend-project-icons.md](frontend-project-icons.md). Treat the three asset sizes and purposes, separate normal and maskable artwork, optical sizing, crop safety, and installed visual QA as reusable guidance. Adapt filenames, URLs, source ownership, and delivery paths to the target project.

## Official Product Sources

The following official Bootstrap Icons pages were reviewed on 2026-08-16:

- <https://icons.getbootstrap.com/>
- <https://icons.getbootstrap.com/icons/sun-fill/>
- <https://icons.getbootstrap.com/icons/moon-stars-fill/>

They support the delivery choices, accessibility boundary, and selected theme-control glyphs in [frontend-website-icons.md](frontend-website-icons.md). Treat Bootstrap Icons as Cheng's conditional greenfield website preference. Verify the target's installed package, rendering method, asset pipeline, and accessibility behavior; do not treat a current package version or website implementation example as a permanent project default.

## Interpretation Rules

- Directly supplied background outranks source-derived inference.
- Bilingual versions are one experience signal, not two independent confirmations.
- Drafts indicate exploration and must not be treated as settled preference.
- Historical commands, versions, URLs, platform behavior, and third-party claims require current verification.
- Personal, celebratory, and publishing-reference pages were reviewed for corpus completeness but did not influence architecture decisions.
- Current maintained repository contracts may refine article-derived themes, but their implementation details apply only where the target project has the same requirements.
