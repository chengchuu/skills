# Source manifest

This manifest records the official sources used to derive the skill's operational guidance. It does not authorize copying source prose. All sources were reviewed on 2026-07-30.

- [Google developer documentation](#google-developer-documentation)
- [Microsoft Writing Style Guide](#microsoft-writing-style-guide)
- [React documentation](#react-documentation)
- [Personal overrides](#personal-overrides)
- [Maintenance](#maintenance)

## Google developer documentation

- Source organization: Google
- Source type: Official developer documentation
- Scope: Primary structural and technical-writing foundation
- Rule type: Directly supported rules normalized into project guidance
- Confidence: High
- Date reviewed: 2026-07-30
- Last validation date: 2026-07-30
- Skill reference: [google-style.md](foundations/google-style.md)

| Source | Derived use |
| --- | --- |
| [Google developer documentation style guide](https://developers.google.com/style) | Scope, project precedence, and general foundation |
| [Style guide highlights](https://developers.google.com/style/highlights) | High-value cross-topic defaults |
| [What's new](https://developers.google.com/style/whats-new) | Recency and maintenance review |
| [Active voice](https://developers.google.com/style/voice) | Active default and passive exceptions |
| [Second person and first person](https://developers.google.com/style/person) | Reader address and person |
| [Present tense](https://developers.google.com/style/tense) | Tense defaults |
| [Sentence structure](https://developers.google.com/style/sentence-structure) | Actors, conditions, and sentence clarity |
| [Procedures](https://developers.google.com/style/procedures) | Imperative, complete, parallel steps |
| [Lists](https://developers.google.com/style/lists) | Ordered, unordered, and description lists |
| [Headings and titles](https://developers.google.com/style/headings) | Sentence case and task or concept headings |
| [Cross-references and linking](https://developers.google.com/style/cross-references) | Descriptive, selective links |
| [Tables](https://developers.google.com/style/tables) | Appropriate use and accessible headers |
| [Notes, cautions, warnings, and other notices](https://developers.google.com/style/notices) | Callout selection and severity |
| [Write for a global audience](https://developers.google.com/style/translation) | Localization-friendly language |
| [Write inclusive documentation](https://developers.google.com/style/inclusive-documentation) | Inclusive defaults |
| [Pronouns](https://developers.google.com/style/pronouns) | Clear, inclusive pronoun use |
| [Jargon](https://developers.google.com/style/jargon) | Necessary versus avoidable terminology |
| [Word list](https://developers.google.com/style/word-list) | Usage checks subordinate to project terms |
| [API reference code comments](https://developers.google.com/style/api-reference-comments) | Public-item coverage and action verbs |

Interpretation notes: The skill treats active voice, second person, and present tense as defaults with documented contextual exceptions. It treats project style as higher authority.

Conflicts: Google's descriptive-link default yields to a project's raw-URL convention. Concision yields to necessary accuracy and caveats. Active voice yields to supported passive-voice exceptions.

## Microsoft Writing Style Guide

- Source organization: Microsoft
- Source type: Official style and contribution documentation
- Scope: Editorial voice, readability, procedures, and reader interaction
- Rule type: Directly supported voice principles plus synthesized project boundaries
- Confidence: High
- Date reviewed: 2026-07-30
- Last validation date: 2026-07-30
- Skill reference: [microsoft-voice.md](foundations/microsoft-voice.md)

| Source | Derived use |
| --- | --- |
| [Top 10 tips for Microsoft style and voice](https://learn.microsoft.com/en-us/style-guide/top-10-tips-style-voice) | Concise overview and voice priorities |
| [Microsoft's brand voice: Above all, simple and human](https://learn.microsoft.com/en-us/style-guide/brand-voice-above-all-simple-human) | Warm, crisp, helpful voice |
| [Developer content](https://learn.microsoft.com/en-us/style-guide/developer-content/) | Technical-audience adaptation |
| [Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/) | Familiar and consistent terminology |
| [Use simple words, concise sentences](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | Plain language and concision |
| [Avoid jargon](https://learn.microsoft.com/en-us/style-guide/word-choice/avoid-jargon) | Remove irrelevant jargon |
| [Person](https://learn.microsoft.com/en-us/style-guide/grammar/person) | Reader-focused second person |
| [Verbs](https://learn.microsoft.com/en-us/style-guide/grammar/verbs) | Active, present, and imperative forms |
| [Scannable content](https://learn.microsoft.com/en-us/style-guide/scannable-content/) | Front-loaded and structured content |
| [Writing step-by-step instructions](https://learn.microsoft.com/en-us/style-guide/procedures-instructions/writing-step-by-step-instructions) | One imperative action per step |
| [Writing tips for global communication](https://learn.microsoft.com/en-us/style-guide/global-communications/writing-tips) | Global readability |
| [Microsoft Learn style and voice quick start](https://learn.microsoft.com/en-us/contribute/content/style-quick-start) | Learn-specific contribution patterns |
| [Writing style for Windows apps](https://learn.microsoft.com/en-us/windows/apps/design/style/writing-style) | Helpful, blameless UI and error text |

Interpretation notes: Warm and conversational means professional and direct, not casual, idiomatic, or promotional. Passive voice is acceptable for blameless error text. Necessary expert terminology remains when precision requires it.

Conflicts: Microsoft voice does not replace Google's structural foundation. Blameless passive voice can override the general active-voice preference. Conversational wording yields to global readability and serious context.

Validation note: Some Microsoft pages displayed an authorization banner during review, but their article text remained accessible. The dedicated contractions page was not used as a primary source because only its title was available; contraction guidance is supported by the accessible sources above.

## React documentation

- Source organization: Meta Open Source
- Source type: Official React documentation
- Scope: Optional React ecosystem profile
- Rule type: Observed ecosystem patterns converted into recommended or optional profile guidance
- Confidence: High
- Date reviewed: 2026-07-30
- Last validation date: 2026-07-30
- Skill reference: [react-docs.md](profiles/react-docs.md)

| Source | Derived use |
| --- | --- |
| [Quick Start](https://react.dev/learn) | Goal-first learning and core concepts |
| [Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe) | Incremental, result-oriented tutorial flow |
| [Describing the UI](https://react.dev/learn/describing-the-ui) | Learn-section organization |
| [Your First Component](https://react.dev/learn/your-first-component) | Concrete before abstract |
| [Thinking in React](https://react.dev/learn/thinking-in-react) | Problem-solving sequence and mental models |
| [Understanding Your UI as a Tree](https://react.dev/learn/understanding-your-ui-as-a-tree) | Practical conceptual explanation |
| [Managing State](https://react.dev/learn/managing-state) | Learning sequence and recaps |
| [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) | State ownership and data flow |
| [Responding to Events](https://react.dev/learn/responding-to-events) | Focused examples and pitfalls |
| [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) | Idiomatic solution progression |
| [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) | Tradeoffs and problem-first guidance |
| [React Reference Overview](https://react.dev/reference/react) | Separation of Learn and reference content |
| [Built-in React Hooks](https://react.dev/reference/react/hooks) | Reference grouping and terminology |
| [`useState`](https://react.dev/reference/react/useState) | API page anatomy |
| [Rules of React](https://react.dev/reference/rules) | Normative rules and caveats |
| [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks) | Pitfall and troubleshooting patterns |
| [Legacy React APIs](https://react.dev/reference/react/legacy) | Modern defaults with legacy context |
| [`Component`](https://react.dev/reference/react/Component) | Class-component reference boundaries |

Interpretation notes: React's interactive elements, emojis, challenges, and deep dives are optional presentation patterns. Function components and Hooks are the default for modern examples, but the target code and API determine whether legacy material is necessary.

Conflicts: React tutorial patterns are not universal English rules and do not apply to short reference or release content. A target project's legacy conventions override modern example defaults.

## Personal overrides

- Source organization: User-maintained project guidance
- Source type: Personal override
- Scope: Concision, structure, vocabulary, and future learned preferences
- Rules derived: The initial explicit rules in [personal-style.md](personal-style.md)
- Interpretation notes: Apply only below user and project rules and above ecosystem and foundation layers
- Conflicts: Never overrides technical accuracy or protected literals
- Confidence: High for explicitly recorded preferences; not applicable to future inferred patterns until curated
- Last validation date: 2026-07-30

## Maintenance

When updating a derived rule:

1. Reopen the relevant official source.
2. Record the new review date.
3. Distinguish the source rule from project interpretation.
4. Document conflicts and contextual exceptions.
5. From the skill directory, run `node scripts/validate-references.mjs`.
