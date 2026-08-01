# Package and Project Patterns

Use these patterns when a project combines a reusable runtime artifact with examples, documentation, a website, generated output, or release automation. They were distilled from a maintained npm library template; adapt them to the target repository rather than copying its tools or paths.

## Map the Product Surfaces

Classify each surface before changing the architecture:

- the consumer runtime and its supported public entry points;
- public types, schemas, or declarations;
- internal implementation modules;
- tests against public behavior;
- examples or playgrounds that exercise the real public API;
- maintained documentation and site source;
- generated packages, bundles, declarations, documentation, coverage, or deployment artifacts;
- build, validation, preview, release, and deployment automation.

State which surfaces ship to consumers and which exist only for development or documentation. Do not let a playground framework, PWA runtime, documentation generator, or deployment configuration leak into the consumer runtime without an explicit requirement.

## Define Authorities and Derived Values

Assign one source of truth to each concern. A package manifest can own consumer metadata while a build-only project configuration owns site presentation and deployment settings. Derive repeated URLs, commands, filenames, paths, storage keys, and cache namespaces where safe.

Do not collapse identifiers that have different constraints. Package names, repository names, display names, browser globals, artifact filenames, hosted base paths, and cache prefixes may be related without being identical. Record the derivation and validate each produced value.

Keep build-only configuration out of the published runtime. Provide a browser-safe subset through an explicit build boundary when a site needs configuration at runtime.

## Preserve the Consumer Contract

Treat these as one coordinated contract when a public API changes:

- implementation and root exports;
- public types or declarations;
- tests and examples;
- README and generated API documentation;
- package entry fields and supported module formats;
- generated bundles, source maps, browser globals, and declarations.

Prefer one clear public root with intentional subpath exports. Do not require consumers to import internal source paths. Keep package identity and release version in manifests and release tooling unless runtime exposure is a stated feature.

## Separate Build Pipelines by Output

Use separate build stages when outputs have materially different consumers or deployment contracts, such as a reusable package, interactive playground, API reference, and static site. Share configuration deliberately, but do not make the core package build depend on valid website or PWA settings when the package can stand alone.

Make the artifact graph explicit:

```text
maintained source and configuration
├── package build → consumer artifacts
├── example build → playground assets
├── documentation build → API reference
└── site assembly → deployable site, metadata, and optional PWA files
```

Generated directories are outputs, not editing surfaces. Change their owning source or build step, regenerate them, and verify the final artifact.

## Customize in Dependency Order

For a template-derived project, customize in this order:

1. Define package, repository, browser, site, display, storage, and cache identities.
2. Update authoritative metadata and central configuration.
3. Replace the sample public API, types, tests, examples, and documentation together.
4. Review package formats, externals, filenames, exports, and declarations.
5. Replace branding, SEO, PWA, and hosted-path settings without confusing production origins with deployment-relative asset paths.
6. Review CI permissions, triggers, secrets, publication, tagging, and deployment behavior.
7. Search maintained source for obsolete identity and sample API strings.
8. Regenerate and validate every consumer and deployment artifact.

Do not publish, tag, deploy, or mutate identity merely to test customization. Prefer local builds, dry runs, package inspection, and production-like previews first.

## Verify From the Consumer Boundary

Choose checks that prove the actual contract:

- import or install the packed artifact through each supported entry format;
- inspect the package manifest and included files;
- confirm declarations resolve without undeclared ambient dependencies;
- confirm development-only frameworks and site code are absent from the runtime artifact;
- test examples against the public API rather than duplicated behavior;
- inspect generated documentation and hosted subpath links;
- validate SEO, manifest, icons, service-worker scope, cache lifecycle, and update behavior when those features exist;
- preview the deployable output under its real base path;
- verify release and deployment workflows without publishing or deploying unless authorized.

A successful compiler or bundler exit is necessary but not sufficient. Validate identity consistency, artifact contents, consumer resolution, deployment paths, caching behavior, and rollback or recovery boundaries.
