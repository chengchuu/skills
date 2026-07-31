# Rule precedence

## Non-overridable factual layer

Technical accuracy, safety, documented behavior, and protected literals take precedence over every style layer. User instructions can request a technical change, but they cannot justify invented or falsified facts.

Protected literals include code, commands, file paths, URLs, package names, API names, function and class names, variables, configuration keys, environment variables, HTTP methods, routes, version numbers, error messages, product names, and documented runtime behavior. Do not change them unless the user explicitly requests a technical change.

## Style precedence

Apply style guidance in this order:

1. **Current user instructions.**
2. **Target repository or project conventions** when they are discoverable and relevant.
3. **Personal style overrides** when explicitly documented or requested.
4. **Selected ecosystem profile**, which adds domain patterns without replacing general English rules.
5. **Google developer documentation foundation**, the primary structural and technical-writing foundation.
6. **Microsoft editorial voice**, the readability and tone layer.
7. **General American English defaults**, the `en-US` fallback.

Document-type guidance selects an appropriate content structure within these layers; it is not a competing style authority.

## Conflict handling

- Prefer a project's official term over a general word-list recommendation.
- Follow an established project language variant unless the user explicitly requests conversion.
- Preserve a UI label, command, identifier, or literal even when its spelling differs from the prose variant.
- Use passive voice when the actor is unknown, the result matters more, or naming the actor would blame the reader.
- Use expert terminology when precision requires it; define it when the audience might not know it.
- Prefer complete information over artificial brevity, then remove repetition and weak openings.
- Use contractions only when they sound natural and suit the project's voice.
- Follow a project's link convention. Otherwise, write descriptive link text; use a raw URL only when the URL itself is the relevant content.
- Treat source-site visual patterns, emojis, interactive sandboxes, and callout frequency as optional presentation choices.

If no rule resolves a material conflict, preserve the source meaning, report the conflict, and ask only when a decision is necessary.
