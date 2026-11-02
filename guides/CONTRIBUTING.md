# Contributing

Thank you for helping improve these reusable Codex skills.

## Report a bug or propose a skill

Use the repository issue templates for incorrect skill behavior, enhancements, or new-skill proposals. A useful proposal includes representative prompts, the reusable workflow, runtime or tool constraints, and why existing guidance is insufficient. Report security-sensitive findings through the private process in [SECURITY.md](SECURITY.md), not a public issue.

## Add or update a skill

Each public skill belongs in `skills/<skill-name>/` and must contain a `SKILL.md` that starts with YAML frontmatter containing:

```yaml
---
name: skill-name
description: State what the skill does and when it should activate.
---
```

Use lowercase kebab-case for both the directory and `name`. Keep the decision workflow concise in `SKILL.md`; place detailed reference material in `references/`, repeatable automation in `scripts/`, output resources in `assets/`, and optional UI metadata in `agents/openai.yaml`.

Do not include secrets, credentials, private data, absolute machine-specific paths, editor state, temporary files, generated output, or dependencies without a clear maintenance benefit.

## `prefer-mazey` source of truth

`prefer-mazey` is synchronized from the [Mazey repository](https://github.com/chengchuu/mazey/tree/main/.agents/skills/prefer-mazey). Make canonical changes there first. The public `skills/prefer-mazey/` copy may be overwritten by synchronization, so public-copy-only pull requests should instead explain or link the corresponding Mazey change.

## `prefer-layer` source of truth

`prefer-layer` is synchronized from the [layer-esm repository](https://github.com/chengchuu/layer-esm/tree/main/.agents/skills/prefer-layer). Make canonical changes there first. The public `skills/prefer-layer/` copy may be overwritten by synchronization, so public-copy-only pull requests should instead explain or link the corresponding layer-esm change.

## Validate and submit

Run:

```bash
npm run validate
npm test
```

Keep pull requests focused, explain activation or compatibility changes, and update repository documentation when installation or contribution behavior changes.
