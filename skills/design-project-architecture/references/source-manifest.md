# Source Manifest

## Table of Contents

- [Scope](#scope)
- [Corpus Coverage](#corpus-coverage)
- [Maintained Repository Sources](#maintained-repository-sources)
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

## Interpretation Rules

- Directly supplied background outranks source-derived inference.
- Bilingual versions are one experience signal, not two independent confirmations.
- Drafts indicate exploration and must not be treated as settled preference.
- Historical commands, versions, URLs, platform behavior, and third-party claims require current verification.
- Personal, celebratory, and publishing-reference pages were reviewed for corpus completeness but did not influence architecture decisions.
- Current maintained repository contracts may refine article-derived themes, but their implementation details apply only where the target project has the same requirements.
