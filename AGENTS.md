# AGENTS.md

## Repository purpose

This repository distributes reusable Codex skills as a skill-only plugin. Preserve `.codex-plugin/plugin.json` and keep every public skill under `skills/<skill-name>/`.

## Skill maintenance

- Keep each `SKILL.md` concise and focused on the core decision workflow.
- Move large catalogs, schemas, and detailed guidance into directly linked files under `references/`.
- Keep skill directory names and frontmatter `name` values identical and kebab-case.
- Include a clear, non-empty `description` that states when the skill should activate.
- Do not add secrets, absolute machine-specific paths, temporary files, or unrelated project material.
- Avoid adding dependencies; validation and maintenance scripts should use Node.js built-ins when practical.

The public `skills/prefer-mazey/` directory is synchronized from the canonical Mazey source at `.agents/skills/prefer-mazey/`. The public `skills/prefer-layer/` directory is synchronized from the canonical layer-esm source at `.agents/skills/prefer-layer/`. Make canonical changes in the owning package repository first, then run its synchronization command. Do not make public-copy-only edits that the next synchronization will overwrite.

## Validation

Run `npm run validate` after every skill, manifest, or repository-structure change. Review generated synchronization changes in the Mazey and skills repositories separately; never stage or commit across repository boundaries automatically.
