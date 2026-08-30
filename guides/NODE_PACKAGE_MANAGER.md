# Node.js package-manager workflow

Use a deliberate package-manager boundary for Node.js projects: pnpm owns local dependency operations, while npm owns local development commands and GitHub Actions execution.

## Command map

Use these commands in their defined contexts.

| Context        | Purpose                      | Command                 |
|:---------------|:-----------------------------|:------------------------|
| Local          | Install project dependencies | `pnpm install`          |
| Local          | Add a dependency             | `pnpm add <package>`    |
| Local          | Update dependencies          | `pnpm update [package]` |
| Local          | Remove a dependency          | `pnpm remove <package>` |
| Local          | Run a package script         | `npm run <script>`      |
| Local          | Inspect packed contents      | `npm pack`              |
| GitHub Actions | Install project dependencies | `npm install`           |
| GitHub Actions | Run a package script         | `npm run <script>`      |

## Manage local dependencies with pnpm

Use pnpm only for dependency operations performed on a developer's machine:

- install the project's declared dependencies with `pnpm install`;
- add packages with `pnpm add`;
- update packages with `pnpm update`;
- remove packages with `pnpm remove`.

Do not recommend local npm commands for installing, adding, updating, or removing dependencies.

Assume each developer provisions pnpm. Do not add Corepack setup, a repository-owned package-manager installer, or other bootstrap automation merely to enforce this workflow.

## Run local project commands with npm

Use npm for local development and lifecycle operations. Run maintained package scripts with `npm run <script>`, including tests, builds, linting, previews, documentation generation, and validation. Use `npm pack` to inspect the package artifact.

Do not recommend `pnpm run`, `pnpm exec`, or generic local development through pnpm. Keep package scripts independent of the tool that installed dependencies.

## Use npm in GitHub Actions

In GitHub Actions:

1. Install dependencies with `npm install`.
2. Run maintained scripts with `npm run <script>`.

Do not use `npm ci`. Do not enable npm dependency caching. Keep workflow caching policy explicit and separate from package installation, and do not copy action-version-specific cache syntax into this general guide.

## Keep metadata and lockfiles independent

Do not add a `packageManager` field to `package.json` to enforce this workflow. Do not remove an existing `packageManager` field unless the requested work explicitly includes that cleanup.

Preserve an existing repository's lockfile policy. Do not generate, remove, or rewrite lockfiles solely because local dependency operations use pnpm while GitHub Actions uses npm.

For a greenfield project, ask the team to choose whether and which lockfile to track. Do not infer that policy from `pnpm install`, `npm install`, or the selected execution environment.

## Verify the boundary

Before accepting project documentation or workflow changes, confirm that:

- local dependency instructions use pnpm;
- local scripts and package inspection use npm;
- GitHub Actions uses `npm install` and `npm run <script>`;
- GitHub Actions does not use `npm ci` or npm dependency caching;
- no new `packageManager` field, Corepack setup, or repository-owned installer was added;
- the repository's lockfile policy remains unchanged unless the team explicitly selected a new policy.
