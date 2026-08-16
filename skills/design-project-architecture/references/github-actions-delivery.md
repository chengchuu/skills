# GitHub Actions Delivery

Use this guidance when an architecture defines GitHub Actions validation, GitHub Pages deployment, npm publication, workflow permissions, or release triggers. Preserve established repository scripts, artifact boundaries, branch policy, environments, registries, and authentication unless the task explicitly changes them.

## Package-Manager Boundary

Recommend `pnpm` for local development commands. Assume each developer provisions `pnpm`; do not add a `packageManager` field, Corepack bootstrap, or repository-owned package-manager installer merely to enforce the recommendation.

In GitHub Actions, install dependencies with:

```bash
npm install
```

Run package scripts with `npm run <script>`. Do not use `npm ci`, and do not enable the `actions/setup-node` npm cache. Keep scripts package-manager-independent so local `pnpm <script>` and online `npm run <script>` exercise the same maintained behavior.

Preserve the target repository's lockfile policy. Do not require, generate, remove, or rewrite a lockfile solely to implement this split, and do not remove an existing `packageManager` field unless that cleanup is explicitly in scope. For a greenfield project with no lockfile policy, leave tracking as an explicit team decision; do not infer it from local `pnpm` or online `npm install` usage.

## Separate Side-Effect Boundaries

Keep generated-site deployment and package publication in separate workflows or equivalently isolated jobs. They have different triggers, permissions, environments, artifacts, credentials, and rollback behavior. A manual Pages deployment must not imply package publication.

### GitHub Pages

Use repository-approved branch or manual triggers. Before deployment:

1. check out the intended revision and set up the repository's supported Node.js version;
2. run `npm install`;
3. run the applicable type, lint, test, documentation, SEO, PWA, and other maintained validation scripts;
4. confirm the complete generated site exists at the repository-defined output path;
5. configure Pages, upload exactly that artifact, and deploy through the protected Pages environment.

Grant only the permissions required by the selected Pages actions, normally read access to repository contents plus Pages and identity-token write access for the deployment job. Serialize deployments with a repository-appropriate concurrency group and avoid cancelling an active deployment unless the project has validated that behavior. Keep the deployment environment URL derived from the deployment result.

### Package Publication

Trigger publication only from the repository's deliberate, protected release event, such as an approved release branch or tag. Pull requests, ordinary development branches, and unrelated manual dispatches must not reach the publish step.

Before publication:

1. run `npm install` and every required validation script;
2. build the package and validate its public entry points;
3. inspect the packed contents and confirm the intended version, files, declarations, and metadata;
4. publish only after all preceding gates succeed.

Default repository permissions to read-only. Grant write permissions only to the job or step that requires them. Expose registry authentication only to the publish step, using the repository's approved secret or trusted-publishing contract. Never place credentials in tracked configuration or logs.

Treat npm, GitHub Packages, other registries, provenance, release creation, and tag pushing as separate opt-in policies. Do not add their permissions or side effects because another publication target happens to be configured.

## Adapt and Verify

Derive Node.js versions, action versions, workflow filenames, triggers, branches, script names, artifact paths, environments, registries, access levels, and authentication from the target repository and current official platform contracts. Do not copy template values when the project differs.

Before enabling a workflow:

- run every referenced script locally with `pnpm`;
- verify the generated Pages artifact under its production base path;
- inspect the package with a non-publishing pack or dry-run command;
- review branch and environment protection plus workflow permissions;
- confirm publish credentials are available only through the selected authentication boundary;
- test trigger conditions without deploying, publishing, tagging, or creating releases unless explicitly authorized.

Any failed validation must prevent the corresponding deployment or publication. Validate the artifact users receive, not only the source build or workflow syntax.
