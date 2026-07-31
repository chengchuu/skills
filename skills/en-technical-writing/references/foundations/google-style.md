# Google-derived documentation foundation

- Foundation: Google Developer Documentation Style Guide
- Role: Primary technical-writing foundation
- Language variant: en-US
- Last reviewed: 2026-07-30
- Source type: Official developer documentation
- Endorsement: None; this skill independently paraphrases selected guidance

See [../source-manifest.md](../source-manifest.md) for page-level provenance.

## Normalized rules

| Guidance | Classification | Application and exceptions |
| --- | --- | --- |
| Prefer active voice | Recommended | Use passive voice when the actor is unknown, irrelevant, or would distract or blame |
| Address the reader as **you** | Recommended | Use third person for software behavior or a distinct end user |
| Use present tense for stable behavior | Required | Use future tense only for a genuine future event |
| Name the actor clearly | Required | Rewrite vague pronouns when their antecedent is ambiguous |
| Keep sentences short and direct | Recommended | Retain necessary conditions, caveats, and technical precision |
| Put conditions before instructions | Recommended | Put a short condition after the action only when it reads more clearly and cannot be missed |
| Start procedure steps with imperative verbs | Required for procedures | Use complete, parallel steps and one primary action per step |
| Use numbered lists for sequences and bullets for unordered items | Context-dependent | Use a description list or table for repeated name-value relationships; avoid one-item lists |
| Use sentence case for headings | Required by default | Follow an explicit project capitalization convention |
| Make headings descriptive and unique | Required | Use base-form verbs for tasks and noun phrases for concepts |
| Use descriptive link text | Required by default | Use a raw URL when the URL itself is the content or the project requires it |
| Use tables for two-dimensional comparisons | Context-dependent | Introduce the table with a complete sentence and provide accessible headers |
| Match notices to risk | Required when a notice is used | Minimize callouts; distinguish note, caution, and warning |
| Write for a global audience | Required | Avoid idioms, culture-specific references, ambiguous dates, and localization-hostile constructions |
| Use inclusive language | Required | Avoid assumptions about identity, ability, location, or circumstances |
| Keep terminology consistent | Required | Preserve official project and product terms |
| Avoid unnecessary jargon | Recommended | Keep a precise expert term when the audience or meaning requires it, and define it when needed |
| Start API descriptions with precise action verbs | Recommended | Choose verbs such as *Checks*, *Gets*, *Sets*, *Updates*, *Deletes*, *Registers*, and *Creates* |
| Describe methods and properties completely | Required for public API reference in scope | Cover behavior, parameters, returns, errors, side effects, and caveats supported by facts |
| Avoid unnecessary **will** | Recommended | Use it for a real future event, not ordinary product behavior |
| Write for localization | Required | Prefer literal, complete sentences and avoid ambiguous noun strings |

## Project authority

The source guide allows project-specific style to take precedence. Apply this foundation only after current user instructions, discoverable project conventions, personal overrides, and a matching ecosystem profile.
