# Source manifest

This manifest records the sources used to derive the skill's operational guidance. It does not authorize copying source prose. All sources were reviewed on 2026-07-30 for the initial documentation layers; the React PR history extension was reviewed on 2026-10-17, and the issue-writing extension on 2026-10-20.

- [Google developer documentation](#google-developer-documentation)
- [Microsoft Writing Style Guide](#microsoft-writing-style-guide)
- [React documentation](#react-documentation)
- [React PR history](#react-pr-history)
- [React issue history](#react-issue-history)
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

## React PR history

- Source type: Pinned local Git history and selected public GitHub PR descriptions
- Scope: General PR editorial recommendations and optional React contribution conventions
- Confidence: Moderate for qualitative writing patterns; no claim of population representativeness or technical correctness
- Last validation date: 2026-10-17
- Snapshot: `098d2e87a1f7142947418d15f63f975b58c4685b`; requested window 2023-10-17 through 2026-10-17; latest commit 2026-10-15
- Skill references: [pull-requests.md](pull-requests.md), [react-prs.md](profiles/react-prs.md)
- Maintenance references: [analysis and selection method](react-pr-history-analysis.md), [paired evaluation](pr-writing-evaluation.md)
- Template: [pinned React PR template](https://github.com/chengchuu/react/blob/098d2e87a1f7142947418d15f63f975b58c4685b/.github/PULL_REQUEST_TEMPLATE.md)
- Interpretation notes: Historical writing is style evidence. It never supplies current behavior or test results. A PR-number suffix is only a candidate association until checked; imported history can refer to another repository.

### Learning sample

Each entry records the full SHA, committer date, selection bucket, and candidate PR link. L01–L30, L31–L60, and L61–L90 are the three periods. “API match” means title and body match after the normalization documented in the analysis. Other rows were inspected locally only.

- L01: `9bad8ed9a6719f406759b34e436fc508f0dac305`; 2024-01-25; runtime; [commit](https://github.com/chengchuu/react/commit/9bad8ed9a6719f406759b34e436fc508f0dac305); [PR #28098](https://github.com/react/react/pull/28098). Local commit only; PR association unverified.
- L02: `5c65b27587c0507d66a84e055de948fc62d471d4`; 2024-03-22; runtime; [commit](https://github.com/chengchuu/react/commit/5c65b27587c0507d66a84e055de948fc62d471d4); [PR #28491](https://github.com/react/react/pull/28491). API checked: corrected example binding.
- L03: `1d5a208fda6064022d25204ee47da29a3229648f`; 2024-07-15; runtime; [commit](https://github.com/chengchuu/react/commit/1d5a208fda6064022d25204ee47da29a3229648f); [PR #30339](https://github.com/react/react/pull/30339). Local commit only; PR association unverified.
- L04: `88b00dec4778ffa230cceca81af3328f49e1efd9`; 2023-11-08; runtime; [commit](https://github.com/chengchuu/react/commit/88b00dec4778ffa230cceca81af3328f49e1efd9); [PR #27132](https://github.com/react/react/pull/27132). Local commit only; PR association unverified.
- L05: `5446b098a8ba23b8d1bd39e552bff9b09b52c334`; 2024-02-06; runtime; [commit](https://github.com/chengchuu/react/commit/5446b098a8ba23b8d1bd39e552bff9b09b52c334); [PR #28253](https://github.com/react/react/pull/28253). Local commit only; PR association unverified.
- L06: `48ec17b865f439754fcdaa289ef0aa98f15a05c2`; 2024-04-02; runtime; [commit](https://github.com/chengchuu/react/commit/48ec17b865f439754fcdaa289ef0aa98f15a05c2); [PR #28716](https://github.com/react/react/pull/28716). Local commit only; PR association unverified.
- L07: `77f438931f3da3bfe3dff91825737f06f2637f79`; 2024-10-10; compiler; [commit](https://github.com/chengchuu/react/commit/77f438931f3da3bfe3dff91825737f06f2637f79); [PR #31167](https://github.com/react/react/pull/31167). Local commit only; PR association unverified.
- L08: `a5554190c1c44aa6ecef0cef46cd109e21b5c0bf`; 2024-06-20; compiler; [commit](https://github.com/chengchuu/react/commit/a5554190c1c44aa6ecef0cef46cd109e21b5c0bf); [PR #29957](https://github.com/react/react/pull/29957). API match.
- L09: `8b31835fc0a4de479a816471764f0e1d103ae205`; 2024-08-07; compiler; [commit](https://github.com/chengchuu/react/commit/8b31835fc0a4de479a816471764f0e1d103ae205); [PR #30631](https://github.com/react/react/pull/30631). Local commit only; PR association unverified.
- L10: `a714685c156dd241b1d5e5ae3a98c439c88e64e4`; 2024-06-10; compiler; [commit](https://github.com/chengchuu/react/commit/a714685c156dd241b1d5e5ae3a98c439c88e64e4); [PR #29831](https://github.com/react/react/pull/29831). Local commit only; PR association unverified.
- L11: `0f1127b552790e6dc0b65650680237ba4c94d977`; 2024-10-10; compiler; [commit](https://github.com/chengchuu/react/commit/0f1127b552790e6dc0b65650680237ba4c94d977); [PR #31168](https://github.com/react/react/pull/31168). Local commit only; PR association unverified.
- L12: `bf0c054649f0573c184499bd571f08150152c086`; 2024-10-09; devtools; [commit](https://github.com/chengchuu/react/commit/bf0c054649f0573c184499bd571f08150152c086); [PR #31153](https://github.com/react/react/pull/31153). Local commit only; PR association unverified.
- L13: `d2e9b9b4dc22639e2c51fb34e9388b9971ee3e27`; 2024-09-25; devtools; [commit](https://github.com/chengchuu/react/commit/d2e9b9b4dc22639e2c51fb34e9388b9971ee3e27); [PR #31058](https://github.com/react/react/pull/31058). API match.
- L14: `fc1371f6bf656821e92c3c41bf65f58686504001`; 2024-07-15; devtools; [commit](https://github.com/chengchuu/react/commit/fc1371f6bf656821e92c3c41bf65f58686504001); [PR #30338](https://github.com/react/react/pull/30338). Local commit only; PR association unverified.
- L15: `288cf747c96cea278a6ddce126ce7a0484678afd`; 2024-02-22; devtools; [commit](https://github.com/chengchuu/react/commit/288cf747c96cea278a6ddce126ce7a0484678afd); [PR #28418](https://github.com/react/react/pull/28418). Local commit only; PR association unverified.
- L16: `6e03d0df82020a77a8c6afff7ef31a4f6d31911e`; 2024-01-23; tests; [commit](https://github.com/chengchuu/react/commit/6e03d0df82020a77a8c6afff7ef31a4f6d31911e); [PR #28060](https://github.com/react/react/pull/28060). Local commit only; PR association unverified.
- L17: `0965fbcab3616523086d05c1069492cc171cbb80`; 2023-10-30; tests; [commit](https://github.com/chengchuu/react/commit/0965fbcab3616523086d05c1069492cc171cbb80); [PR #27624](https://github.com/react/react/pull/27624). Local commit only; PR association unverified.
- L18: `08cd087cada28bf05165b87b6e31a97c6ac598b4`; 2024-01-10; tests; [commit](https://github.com/chengchuu/react/commit/08cd087cada28bf05165b87b6e31a97c6ac598b4); [PR #27917](https://github.com/react/react/pull/27917). Local commit only; PR association unverified.
- L19: `90499a730ed53c29c2321faaf19e77b4ebeeada4`; 2024-06-06; build-ci; [commit](https://github.com/chengchuu/react/commit/90499a730ed53c29c2321faaf19e77b4ebeeada4); [PR #29787](https://github.com/react/react/pull/29787). Local commit only; PR association unverified.
- L20: `2c8a139a593e0294c3a6953d74b451bd05fdcfca`; 2023-11-07; build-ci; [commit](https://github.com/chengchuu/react/commit/2c8a139a593e0294c3a6953d74b451bd05fdcfca); [PR #26446](https://github.com/react/react/pull/26446). API match.
- L21: `90a5d48a2fb0794dced2a9a26b2451c75808cc51`; 2024-05-07; build-ci; [commit](https://github.com/chengchuu/react/commit/90a5d48a2fb0794dced2a9a26b2451c75808cc51); Unresolved imported PR #2942; no public PR URL assigned because the repository association is unverified.
- L22: `3154ec8a38e6014090039be54e0ca597fa967fdd`; 2024-06-14; build-ci; [commit](https://github.com/chengchuu/react/commit/3154ec8a38e6014090039be54e0ca597fa967fdd); [PR #29888](https://github.com/react/react/pull/29888). Local commit only; PR association unverified.
- L23: `def67b9b329c8aa204e611cd510c5a64680aee58`; 2024-06-03; documentation; [commit](https://github.com/chengchuu/react/commit/def67b9b329c8aa204e611cd510c5a64680aee58); [PR #29732](https://github.com/react/react/pull/29732). Local commit only; PR association unverified.
- L24: `5052bfba8b55c355cbf749c118525ebfa7f9269c`; 2024-05-15; documentation; [commit](https://github.com/chengchuu/react/commit/5052bfba8b55c355cbf749c118525ebfa7f9269c); [PR #29086](https://github.com/react/react/pull/29086). API match.
- L25: `496fd3da5aa39733f772918004401f59e315cfa2`; 2024-04-01; documentation; [commit](https://github.com/chengchuu/react/commit/496fd3da5aa39733f772918004401f59e315cfa2); [PR #28692](https://github.com/react/react/pull/28692). Local commit only; PR association unverified.
- L26: `4384a7bcd351c2218c5727a949cf7fff20c3d9d4`; 2024-02-01; tooling; [commit](https://github.com/chengchuu/react/commit/4384a7bcd351c2218c5727a949cf7fff20c3d9d4); [PR #28096](https://github.com/react/react/pull/28096). Local commit only; PR association unverified.
- L27: `dc40571b3efd18d4d08fdf6146ad5ec980ea12dd`; 2023-12-01; tooling; [commit](https://github.com/chengchuu/react/commit/dc40571b3efd18d4d08fdf6146ad5ec980ea12dd); [PR #27732](https://github.com/react/react/pull/27732). Local commit only; PR association unverified.
- L28: `4867a3365e9d2f19c795463caa5a6294c2915269`; 2024-02-13; tooling; [commit](https://github.com/chengchuu/react/commit/4867a3365e9d2f19c795463caa5a6294c2915269); [PR #28306](https://github.com/react/react/pull/28306). Local commit only; PR association unverified.
- L29: `6ab67c35f15bd0ebf93af8d48d4d0545e9bb9551`; 2024-06-20; revert; [commit](https://github.com/chengchuu/react/commit/6ab67c35f15bd0ebf93af8d48d4d0545e9bb9551); [PR #29995](https://github.com/react/react/pull/29995). Local commit only; PR association unverified.
- L30: `9372c63116fc1e855c51d93d83f5150661371ec3`; 2024-03-15; revert; [commit](https://github.com/chengchuu/react/commit/9372c63116fc1e855c51d93d83f5150661371ec3); [PR #28565](https://github.com/react/react/pull/28565). API match.
- L31: `7b21c464890ec991d95c88b5d68802a6c8b3bd8e`; 2025-04-23; runtime; [commit](https://github.com/chengchuu/react/commit/7b21c464890ec991d95c88b5d68802a6c8b3bd8e); [PR #32999](https://github.com/react/react/pull/32999). Local commit only; PR association unverified.
- L32: `a4d122f2d192fe0b6480e669cca43c8f953aaf85`; 2025-01-08; runtime; [commit](https://github.com/chengchuu/react/commit/a4d122f2d192fe0b6480e669cca43c8f953aaf85); [PR #31975](https://github.com/react/react/pull/31975). API checked: title code formatting; body matches.
- L33: `95ff37f5f5ee7c756f844aea2947e961e7151ac9`; 2025-04-16; runtime; [commit](https://github.com/chengchuu/react/commit/95ff37f5f5ee7c756f844aea2947e961e7151ac9); [PR #32932](https://github.com/react/react/pull/32932). Local commit only; PR association unverified.
- L34: `acee65d6d031697ab8c71932a5b028351cbc3b03`; 2025-06-03; runtime; [commit](https://github.com/chengchuu/react/commit/acee65d6d031697ab8c71932a5b028351cbc3b03); [PR #33388](https://github.com/react/react/pull/33388). Local commit only; PR association unverified.
- L35: `b65afdd0c1f644f3630c4e8cfd9ac264c5ac329f`; 2025-01-24; runtime; [commit](https://github.com/chengchuu/react/commit/b65afdd0c1f644f3630c4e8cfd9ac264c5ac329f); [PR #32207](https://github.com/react/react/pull/32207). Local commit only; PR association unverified.
- L36: `028c8e6cf5ce2a87147a7e03e503ce94c7a7a0cf`; 2025-01-21; runtime; [commit](https://github.com/chengchuu/react/commit/028c8e6cf5ce2a87147a7e03e503ce94c7a7a0cf); [PR #32105](https://github.com/react/react/pull/32105). Local commit only; PR association unverified.
- L37: `19cc5af41ead904100a55fd2a1cfb40b1380f4be`; 2025-02-18; compiler; [commit](https://github.com/chengchuu/react/commit/19cc5af41ead904100a55fd2a1cfb40b1380f4be); [PR #32104](https://github.com/react/react/pull/32104). Local commit only; PR association unverified.
- L38: `220dece92b9ab5f8867a589f8104b15717d68d2f`; 2025-01-02; compiler; [commit](https://github.com/chengchuu/react/commit/220dece92b9ab5f8867a589f8104b15717d68d2f); [PR #31963](https://github.com/react/react/pull/31963). API checked: extra Sapling footer.
- L39: `3820740a7fbfc3b27a5127b43bdad44382ff3ce0`; 2025-05-09; compiler; [commit](https://github.com/chengchuu/react/commit/3820740a7fbfc3b27a5127b43bdad44382ff3ce0); [PR #33148](https://github.com/react/react/pull/33148). Local commit only; PR association unverified.
- L40: `4082b0e7d3c042d49ef8987547b923051936956f`; 2025-08-28; compiler; [commit](https://github.com/chengchuu/react/commit/4082b0e7d3c042d49ef8987547b923051936956f); [PR #34027](https://github.com/react/react/pull/34027). Local commit only; PR association unverified.
- L41: `498514c04d824f88a9b77595c18c1323f4d1006f`; 2025-02-18; compiler; [commit](https://github.com/chengchuu/react/commit/498514c04d824f88a9b77595c18c1323f4d1006f); [PR #32098](https://github.com/react/react/pull/32098). Local commit only; PR association unverified.
- L42: `7bd8716acdd9a484e81addcaa923e0a69e61d533`; 2025-10-16; devtools; [commit](https://github.com/chengchuu/react/commit/7bd8716acdd9a484e81addcaa923e0a69e61d533); [PR #34869](https://github.com/react/react/pull/34869). Local commit only; PR association unverified.
- L43: `c4e2508dad24f2cd61b5f1f862b081f54ee71896`; 2025-09-06; devtools; [commit](https://github.com/chengchuu/react/commit/c4e2508dad24f2cd61b5f1f862b081f54ee71896); [PR #34407](https://github.com/react/react/pull/34407). API match.
- L44: `455424dbf3d46d7e9326a64409de063e8f768848`; 2025-07-04; devtools; [commit](https://github.com/chengchuu/react/commit/455424dbf3d46d7e9326a64409de063e8f768848); [PR #33700](https://github.com/react/react/pull/33700). Local commit only; PR association unverified.
- L45: `7ff4d057b69683dd6c512c7940dbadd10788306f`; 2025-04-15; devtools; [commit](https://github.com/chengchuu/react/commit/7ff4d057b69683dd6c512c7940dbadd10788306f); [PR #31398](https://github.com/react/react/pull/31398). Local commit only; PR association unverified.
- L46: `2ed34eba0df3ca9604e15b250ba207a8030dc8af`; 2025-04-15; tests; [commit](https://github.com/chengchuu/react/commit/2ed34eba0df3ca9604e15b250ba207a8030dc8af); [PR #32917](https://github.com/react/react/pull/32917). Local commit only; PR association unverified.
- L47: `f83903bfcc5a61811bd1b69b14f0ebbac4754462`; 2025-02-12; tests; [commit](https://github.com/chengchuu/react/commit/f83903bfcc5a61811bd1b69b14f0ebbac4754462); [PR #32363](https://github.com/react/react/pull/32363). Local commit only; PR association unverified.
- L48: `e0c893f51d6620ede7ad9a65102ac581da464680`; 2025-01-06; tests; [commit](https://github.com/chengchuu/react/commit/e0c893f51d6620ede7ad9a65102ac581da464680); [PR #31988](https://github.com/react/react/pull/31988). Local commit only; PR association unverified.
- L49: `062fb31155e42b6997a35b97180055814471620c`; 2025-02-07; build-ci; [commit](https://github.com/chengchuu/react/commit/062fb31155e42b6997a35b97180055814471620c); [PR #32337](https://github.com/react/react/pull/32337). Local commit only; PR association unverified.
- L50: `6a8c7fb6f1108577c97eeb5703018ece915dcdeb`; 2025-10-06; build-ci; [commit](https://github.com/chengchuu/react/commit/6a8c7fb6f1108577c97eeb5703018ece915dcdeb); [PR #34712](https://github.com/react/react/pull/34712). API match.
- L51: `68013725ac5671ab06572bd361e168681782a727`; 2025-04-16; build-ci; [commit](https://github.com/chengchuu/react/commit/68013725ac5671ab06572bd361e168681782a727); [PR #32934](https://github.com/react/react/pull/32934). Local commit only; PR association unverified.
- L52: `a4eb2dfa6fec3da5a947eb84c99b059890bb5241`; 2025-10-06; build-ci; [commit](https://github.com/chengchuu/react/commit/a4eb2dfa6fec3da5a947eb84c99b059890bb5241); [PR #34720](https://github.com/react/react/pull/34720). Local commit only; PR association unverified.
- L53: `7558ffe84df6bab5d701fd90de1c6313f9a1c066`; 2024-11-19; documentation; [commit](https://github.com/chengchuu/react/commit/7558ffe84df6bab5d701fd90de1c6313f9a1c066); [PR #31588](https://github.com/react/react/pull/31588). Local commit only; PR association unverified.
- L54: `562f17efab5c39b461ec100898c9a26b54c931e4`; 2025-03-06; documentation; [commit](https://github.com/chengchuu/react/commit/562f17efab5c39b461ec100898c9a26b54c931e4); [PR #32536](https://github.com/react/react/pull/32536). API match.
- L55: `717584167b6b976dc577d75e1a8c49c0826b66ee`; 2025-04-09; documentation; [commit](https://github.com/chengchuu/react/commit/717584167b6b976dc577d75e1a8c49c0826b66ee); [PR #32513](https://github.com/react/react/pull/32513). Local commit only; PR association unverified.
- L56: `5f06c3d22a666e2fd426704aa896a9049294b9b4`; 2025-08-20; tooling; [commit](https://github.com/chengchuu/react/commit/5f06c3d22a666e2fd426704aa896a9049294b9b4); [PR #34245](https://github.com/react/react/pull/34245). Local commit only; PR association unverified.
- L57: `45804af18d589fd2c181f3b020f07661c46b73ea`; 2024-10-21; tooling; [commit](https://github.com/chengchuu/react/commit/45804af18d589fd2c181f3b020f07661c46b73ea); [PR #31314](https://github.com/react/react/pull/31314). Local commit only; PR association unverified.
- L58: `71d0896a4a1b31e14baeb7e427fc4724dbe972ff`; 2025-04-23; tooling; [commit](https://github.com/chengchuu/react/commit/71d0896a4a1b31e14baeb7e427fc4724dbe972ff); [PR #32996](https://github.com/react/react/pull/32996). Local commit only; PR association unverified.
- L59: `62ff1e61fce3eca9346716715679e7604477d84d`; 2025-10-05; revert; [commit](https://github.com/chengchuu/react/commit/62ff1e61fce3eca9346716715679e7604477d84d); [PR #34739](https://github.com/react/react/pull/34739). Local commit only; PR association unverified.
- L60: `b65e6fc58b8c9a35e2c2ea7d1952fc1499cef09b`; 2025-10-06; revert; [commit](https://github.com/chengchuu/react/commit/b65e6fc58b8c9a35e2c2ea7d1952fc1499cef09b); [PR #34747](https://github.com/react/react/pull/34747). API match.
- L61: `129154cedf159a4f4a76634889e98d06760278cc`; 2026-07-07; runtime; [commit](https://github.com/chengchuu/react/commit/129154cedf159a4f4a76634889e98d06760278cc); [PR #36948](https://github.com/react/react/pull/36948). Local commit only; PR association unverified.
- L62: `dc631ef588bd10a63eeb9a1c4c133117755c83d7`; 2026-08-23; runtime; [commit](https://github.com/chengchuu/react/commit/dc631ef588bd10a63eeb9a1c4c133117755c83d7); [PR #37147](https://github.com/react/react/pull/37147). API match.
- L63: `72fdf5cf0ac0ea54a611ab15ecf39066ac970f33`; 2026-10-07; runtime; [commit](https://github.com/chengchuu/react/commit/72fdf5cf0ac0ea54a611ab15ecf39066ac970f33); [PR #37771](https://github.com/react/react/pull/37771). Local commit only; PR association unverified.
- L64: `56922cf751fab6c7ab4c12ddbbd15839959fa255`; 2026-04-16; runtime; [commit](https://github.com/chengchuu/react/commit/56922cf751fab6c7ab4c12ddbbd15839959fa255); [PR #36285](https://github.com/react/react/pull/36285). Local commit only; PR association unverified.
- L65: `0c9913ae87283f96e868a8f1c20a3389827632d0`; 2026-10-14; runtime; [commit](https://github.com/chengchuu/react/commit/0c9913ae87283f96e868a8f1c20a3389827632d0); [PR #37846](https://github.com/react/react/pull/37846). Local commit only; PR association unverified.
- L66: `43bcbf80065a4913b6a4eb69f4e001165974f11b`; 2026-06-03; runtime; [commit](https://github.com/chengchuu/react/commit/43bcbf80065a4913b6a4eb69f4e001165974f11b); [PR #36586](https://github.com/react/react/pull/36586). Local commit only; PR association unverified.
- L67: `0972e23908b573faa5beebc0eb1154f792c53b62`; 2025-11-18; compiler; [commit](https://github.com/chengchuu/react/commit/0972e23908b573faa5beebc0eb1154f792c53b62); [PR #35141](https://github.com/react/react/pull/35141). Local commit only; PR association unverified.
- L68: `03e775554a34e1508fcf0e82d13ea8d41ee271d7`; 2026-06-09; compiler; [commit](https://github.com/chengchuu/react/commit/03e775554a34e1508fcf0e82d13ea8d41ee271d7); [PR #36173](https://github.com/react/react/pull/36173). API match.
- L69: `b061b597f77c979531a3f2c9c04ba435342b0043`; 2025-12-12; compiler; [commit](https://github.com/chengchuu/react/commit/b061b597f77c979531a3f2c9c04ba435342b0043); [PR #35353](https://github.com/react/react/pull/35353). Local commit only; PR association unverified.
- L70: `5a90a5a7a54d88105b203cfc3230325f495948ae`; 2026-07-07; compiler; [commit](https://github.com/chengchuu/react/commit/5a90a5a7a54d88105b203cfc3230325f495948ae); [PR #36946](https://github.com/react/react/pull/36946). Local commit only; PR association unverified.
- L71: `40b4a5bf71ba7864556a5589b270b237f453c032`; 2025-11-20; compiler; [commit](https://github.com/chengchuu/react/commit/40b4a5bf71ba7864556a5589b270b237f453c032); [PR #34472](https://github.com/react/react/pull/34472). Local commit only; PR association unverified.
- L72: `8374c2abf13fa803233025192b8d7e87de70b087`; 2026-02-11; devtools; [commit](https://github.com/chengchuu/react/commit/8374c2abf13fa803233025192b8d7e87de70b087); [PR #35755](https://github.com/react/react/pull/35755). Local commit only; PR association unverified.
- L73: `312e1af1c7e0b71466fa2998599dde105b4384a0`; 2026-10-07; devtools; [commit](https://github.com/chengchuu/react/commit/312e1af1c7e0b71466fa2998599dde105b4384a0); [PR #37780](https://github.com/react/react/pull/37780). API match.
- L74: `4558a1691bf8eeac8c429d5efbbb7b51507b8b7c`; 2026-09-09; devtools; [commit](https://github.com/chengchuu/react/commit/4558a1691bf8eeac8c429d5efbbb7b51507b8b7c); [PR #37549](https://github.com/react/react/pull/37549). Local commit only; PR association unverified.
- L75: `ccea5fd23ea30723aaaca6cc11075796c0c3c8ba`; 2026-09-13; devtools; [commit](https://github.com/chengchuu/react/commit/ccea5fd23ea30723aaaca6cc11075796c0c3c8ba); [PR #37608](https://github.com/react/react/pull/37608). Local commit only; PR association unverified.
- L76: `454fc41fc7d50f8abbcfb9595b01e8ea8bfcc265`; 2025-12-17; tests; [commit](https://github.com/chengchuu/react/commit/454fc41fc7d50f8abbcfb9595b01e8ea8bfcc265); [PR #35347](https://github.com/react/react/pull/35347). Local commit only; PR association unverified.
- L77: `677818e4a2261e318bb9c0bd0c5c8ba05fcd1880`; 2026-03-27; tests; [commit](https://github.com/chengchuu/react/commit/677818e4a2261e318bb9c0bd0c5c8ba05fcd1880); [PR #35627](https://github.com/react/react/pull/35627). Local commit only; PR association unverified.
- L78: `fb0d96073c588ca2f652f9c97849234576db534f`; 2025-10-28; tests; [commit](https://github.com/chengchuu/react/commit/fb0d96073c588ca2f652f9c97849234576db534f); [PR #35002](https://github.com/react/react/pull/35002). Local commit only; PR association unverified.
- L79: `d594643e5e5b662f064c584018ab3773754c792d`; 2026-03-19; build-ci; [commit](https://github.com/chengchuu/react/commit/d594643e5e5b662f064c584018ab3773754c792d); [PR #36106](https://github.com/react/react/pull/36106). Local commit only; PR association unverified.
- L80: `675a29c3e9869d0706dc5ed08779ae04186bd44f`; 2026-08-23; build-ci; [commit](https://github.com/chengchuu/react/commit/675a29c3e9869d0706dc5ed08779ae04186bd44f); [PR #37322](https://github.com/react/react/pull/37322). API match.
- L81: `92f4fda361a6fdc108fd5c8f4ae25058eca804b4`; 2026-06-29; build-ci; [commit](https://github.com/chengchuu/react/commit/92f4fda361a6fdc108fd5c8f4ae25058eca804b4); [PR #36898](https://github.com/react/react/pull/36898). Local commit only; PR association unverified.
- L82: `705268dcd16779b1f51f234cebaa588d761202ce`; 2026-04-09; build-ci; [commit](https://github.com/chengchuu/react/commit/705268dcd16779b1f51f234cebaa588d761202ce); [PR #36243](https://github.com/react/react/pull/36243). Local commit only; PR association unverified.
- L83: `4f9389423b7319e1f7acc3d158c84a8365462748`; 2026-07-06; documentation; [commit](https://github.com/chengchuu/react/commit/4f9389423b7319e1f7acc3d158c84a8365462748); [PR #36928](https://github.com/react/react/pull/36928). Local commit only; PR association unverified.
- L84: `c0c29e89066df60c8340d4e853d38b5843c165ab`; 2026-03-24; documentation; [commit](https://github.com/chengchuu/react/commit/c0c29e89066df60c8340d4e853d38b5843c165ab); [PR #35439](https://github.com/react/react/pull/35439). API match.
- L85: `ba833da405d44260e94bd47c13eec90816bf44f1`; 2026-03-27; documentation; [commit](https://github.com/chengchuu/react/commit/ba833da405d44260e94bd47c13eec90816bf44f1); [PR #35623](https://github.com/react/react/pull/35623). Local commit only; PR association unverified.
- L86: `371801103e8796cd0c57da28671bcc802c2972f7`; 2026-08-10; tooling; [commit](https://github.com/chengchuu/react/commit/371801103e8796cd0c57da28671bcc802c2972f7); [PR #37171](https://github.com/react/react/pull/37171). Local commit only; PR association unverified.
- L87: `eb2f784e752ba690f032db4c3d87daac77a5a2aa`; 2025-10-22; tooling; [commit](https://github.com/chengchuu/react/commit/eb2f784e752ba690f032db4c3d87daac77a5a2aa); [PR #34953](https://github.com/react/react/pull/34953). Local commit only; PR association unverified.
- L88: `dcd4ec28a13268f758facecde6eea93e0e791388`; 2026-07-26; tooling; [commit](https://github.com/chengchuu/react/commit/dcd4ec28a13268f758facecde6eea93e0e791388); [PR #37127](https://github.com/react/react/pull/37127). Local commit only; PR association unverified.
- L89: `80cb7a99255fb030bf11cb8a8298d94f379563c7`; 2025-12-11; revert; [commit](https://github.com/chengchuu/react/commit/80cb7a99255fb030bf11cb8a8298d94f379563c7); [PR #35346](https://github.com/react/react/pull/35346). Local commit only; PR association unverified.
- L90: `99c106c43439ad7af05d42f66582d8d05190e9ff`; 2026-10-14; revert; [commit](https://github.com/chengchuu/react/commit/99c106c43439ad7af05d42f66582d8d05190e9ff); [PR #37852](https://github.com/react/react/pull/37852). API match.

### Held-out sample

Reserved before guidance was drafted; these examples were not used to derive the rules. The evaluation uses bounded factual inputs paraphrased from their local messages, not independently verified change claims.

- H01: `0061ca6cf47c5124d2ebe708481fb03da9e8e267`; 2024-04-18; runtime; [commit](https://github.com/chengchuu/react/commit/0061ca6cf47c5124d2ebe708481fb03da9e8e267); [candidate PR #28842](https://github.com/react/react/pull/28842). Local commit only.
- H02: `0a1fdeee9ed6d93e2731ce7cc3957a75ce6a6da7`; 2024-10-10; compiler; [commit](https://github.com/chengchuu/react/commit/0a1fdeee9ed6d93e2731ce7cc3957a75ce6a6da7); [candidate PR #31166](https://github.com/react/react/pull/31166). Local commit only.
- H03: `01bb3c5632ef47751b0ef78a693cab9102c1ed0d`; 2024-04-08; tests; [commit](https://github.com/chengchuu/react/commit/01bb3c5632ef47751b0ef78a693cab9102c1ed0d); [candidate PR #28782](https://github.com/react/react/pull/28782). Local commit only.
- H04: `015ff2ed66c1d164111752263682d1d757c97f3e`; 2024-02-13; revert; [commit](https://github.com/chengchuu/react/commit/015ff2ed66c1d164111752263682d1d757c97f3e); [candidate PR #28318](https://github.com/react/react/pull/28318). Local commit only.
- H05: `0038c501a307e5ddc0cb80027e55740ddda09520`; 2025-04-29; runtime; [commit](https://github.com/chengchuu/react/commit/0038c501a307e5ddc0cb80027e55740ddda09520); [candidate PR #33043](https://github.com/react/react/pull/33043). Local commit only.
- H06: `00aa0043c7e32e1c822402edadde6f05535d2075`; 2025-03-07; compiler; [commit](https://github.com/chengchuu/react/commit/00aa0043c7e32e1c822402edadde6f05535d2075); [candidate PR #32550](https://github.com/react/react/pull/32550). Local commit only.
- H07: `2a4f2507a09a715e8182b7954b1bc3d9c107f492`; 2024-11-18; tests; [commit](https://github.com/chengchuu/react/commit/2a4f2507a09a715e8182b7954b1bc3d9c107f492); [candidate PR #31571](https://github.com/react/react/pull/31571). Local commit only.
- H08: `283f87f083f285c060582e1096cebed794d4b748`; 2025-05-27; revert; [commit](https://github.com/chengchuu/react/commit/283f87f083f285c060582e1096cebed794d4b748); [candidate PR #33362](https://github.com/react/react/pull/33362). Local commit only.
- H09: `00f48cecfc34b371a03f3c601819439cb16e2e96`; 2026-09-10; runtime; [commit](https://github.com/chengchuu/react/commit/00f48cecfc34b371a03f3c601819439cb16e2e96); [candidate PR #37573](https://github.com/react/react/pull/37573). Local commit only.
- H10: `0038f63c0d6f65236796b58e5753cca9fd2a3668`; 2026-06-15; compiler; [commit](https://github.com/chengchuu/react/commit/0038f63c0d6f65236796b58e5753cca9fd2a3668); [candidate PR #36731](https://github.com/react/react/pull/36731). Local commit only.
- H11: `04ee54cd128a48cb3fdac7256e1a45d6d9743d8c`; 2025-11-11; tests; [commit](https://github.com/chengchuu/react/commit/04ee54cd128a48cb3fdac7256e1a45d6d9743d8c); [candidate PR #35095](https://github.com/react/react/pull/35095). Local commit only.
- H12: `6c3bd60a90cde43e12a6c0021de8f1ecb69491b9`; 2026-08-24; revert; [commit](https://github.com/chengchuu/react/commit/6c3bd60a90cde43e12a6c0021de8f1ecb69491b9); [candidate PR #37363](https://github.com/react/react/pull/37363). Local commit only.

## React issue history

- Source type: Public React issue bodies, discussion comments, and official issue templates.
- Last validation date: 2026-10-20; issue inventory retrieved 2026-10-19.
- Coverage: 2023-10-19 through the partial day 2026-10-19; 2,300 issues inventoried, 24 learning examples, and six separately reserved evaluation examples.
- Interpretation notes: Reports describe user observations and claims. They are writing evidence, not verified technical facts or proof that an open or closed issue was resolved. The [analysis and evaluation record](react-issue-history-analysis.md) describes selection, counterexamples, and coverage limits.
- Confidence: High for the inspected template fields; limited qualitative support for editorial recommendations. No measured relationship between wording and maintainer response.
- Distilled references: [Issue workflow](issues.md) and optional [React issue profile](profiles/react-issues.md). React documentation and PR profiles remain separate.
- Template snapshot: `ba39b32a467ea462ffb06db242da2bfc09e23af8`, read from the public API without changing local refs.
- [config.yml](https://github.com/react/react/blob/ba39b32a467ea462ffb06db242da2bfc09e23af8/.github/ISSUE_TEMPLATE/config.yml).
- [bug_report.md](https://github.com/react/react/blob/ba39b32a467ea462ffb06db242da2bfc09e23af8/.github/ISSUE_TEMPLATE/bug_report.md).
- [compiler_bug_report.yml](https://github.com/react/react/blob/ba39b32a467ea462ffb06db242da2bfc09e23af8/.github/ISSUE_TEMPLATE/compiler_bug_report.yml).
- [devtools_bug_report.yml](https://github.com/react/react/blob/ba39b32a467ea462ffb06db242da2bfc09e23af8/.github/ISSUE_TEMPLATE/devtools_bug_report.yml).

### Learning sample

Entries record creation date, state at retrieval, and heuristic sampling bucket; the bucket is not an endorsed classification.

- [#29902](https://github.com/react/react/issues/29902): 2024-06-14; open; core-other; period 1.
- [#28817](https://github.com/react/react/issues/28817): 2024-04-10; closed; core-other; period 1.
- [#29892](https://github.com/react/react/issues/29892): 2024-06-13; open; compiler; period 1.
- [#29202](https://github.com/react/react/issues/29202): 2024-05-21; closed; compiler; period 1.
- [#28787](https://github.com/react/react/issues/28787): 2024-04-09; open; devtools; period 1.
- [#28323](https://github.com/react/react/issues/28323): 2024-02-14; closed; devtools; period 1.
- [#29757](https://github.com/react/react/issues/29757): 2024-06-04; open; request; period 1.
- [#28503](https://github.com/react/react/issues/28503): 2024-03-06; closed; request; period 1.
- [#32478](https://github.com/react/react/issues/32478): 2025-02-26; open; core-other; period 2.
- [#33337](https://github.com/react/react/issues/33337): 2025-05-22; closed; core-other; period 2.
- [#33302](https://github.com/react/react/issues/33302): 2025-05-18; open; compiler; period 2.
- [#33031](https://github.com/react/react/issues/33031): 2025-04-26; closed; compiler; period 2.
- [#32418](https://github.com/react/react/issues/32418): 2025-02-18; open; devtools; period 2.
- [#32964](https://github.com/react/react/issues/32964): 2025-04-19; closed; devtools; period 2.
- [#33181](https://github.com/react/react/issues/33181): 2025-05-12; open; request; period 2.
- [#32961](https://github.com/react/react/issues/32961): 2025-04-18; closed; request; period 2.
- [#37078](https://github.com/react/react/issues/37078): 2026-07-20; open; core-other; period 3.
- [#35678](https://github.com/react/react/issues/35678): 2026-02-03; closed; core-other; period 3.
- [#36128](https://github.com/react/react/issues/36128): 2026-03-23; open; compiler; period 3.
- [#35570](https://github.com/react/react/issues/35570): 2026-01-20; closed; compiler; period 3.
- [#36937](https://github.com/react/react/issues/36937): 2026-07-06; open; devtools; period 3.
- [#36375](https://github.com/react/react/issues/36375): 2026-04-30; closed; devtools; period 3.
- [#35395](https://github.com/react/react/issues/35395): 2025-12-19; open; request; period 3.
- [#36248](https://github.com/react/react/issues/36248): 2026-04-10; closed; request; period 3.

### Reserved evaluation sample

Entries record creation date, state at retrieval, and heuristic sampling bucket; the bucket is not an endorsed classification.

- [#28884](https://github.com/react/react/issues/28884): 2024-04-20; closed; core-other; period 1.
- [#28866](https://github.com/react/react/issues/28866): 2024-04-18; closed; request; period 1.
- [#33057](https://github.com/react/react/issues/33057): 2025-04-29; closed; compiler; period 2.
- [#32642](https://github.com/react/react/issues/32642): 2025-03-16; closed; devtools; period 2.
- [#36419](https://github.com/react/react/issues/36419): 2026-05-05; closed; core-other; period 3.
- [#35903](https://github.com/react/react/issues/35903): 2026-02-25; open; request; period 3.
