# Reference router

Read [rule-precedence.md](rule-precedence.md) for every task. Match every applicable row and load the union of its references so document-type or ecosystem guidance does not replace the general layers.

| Task | Required references | Conditional references |
| --- | --- | --- |
| Any task | [rule-precedence.md](rule-precedence.md) | No other reference is universal |
| New document or substantial rewrite | [document-types.md](document-types.md), [output-workflows.md](output-workflows.md) | A matching ecosystem profile |
| General writing or rewriting | [writing-guidelines.md](writing-guidelines.md), [output-workflows.md](output-workflows.md), [foundations/google-style.md](foundations/google-style.md), [foundations/microsoft-voice.md](foundations/microsoft-voice.md), [personal-style.md](personal-style.md) | A matching ecosystem profile |
| Translation into English | [output-workflows.md#translate-to-english](output-workflows.md#translate-to-english), [writing-guidelines.md](writing-guidelines.md), [terminology.md](terminology.md), [foundations/google-style.md](foundations/google-style.md), [foundations/microsoft-voice.md](foundations/microsoft-voice.md), [personal-style.md](personal-style.md) | A matching ecosystem profile |
| Proofread | [output-workflows.md](output-workflows.md), [terminology.md](terminology.md) | [document-types.md](document-types.md) only for structural defects |
| Language or style review | [output-workflows.md](output-workflows.md), [writing-guidelines.md](writing-guidelines.md), [foundations/google-style.md](foundations/google-style.md), [foundations/microsoft-voice.md](foundations/microsoft-voice.md), [personal-style.md](personal-style.md) | [document-types.md](document-types.md) and a matching ecosystem profile |
| Technical or structural review | [output-workflows.md](output-workflows.md), [document-types.md](document-types.md) | [writing-guidelines.md](writing-guidelines.md) and a matching ecosystem profile |
| Tutorial or how-to guide | [document-types.md](document-types.md) | [profiles/react-docs.md](profiles/react-docs.md) for React |
| API reference | [document-types.md](document-types.md), [terminology.md](terminology.md) | [profiles/react-docs.md](profiles/react-docs.md) for React |
| Source maintenance | [source-manifest.md](source-manifest.md) | The affected foundation or profile |

## Layers

- [foundations/google-style.md](foundations/google-style.md) defines the general documentation foundation.
- [foundations/microsoft-voice.md](foundations/microsoft-voice.md) refines voice and reader interaction without overriding accuracy or project rules.
- [profiles/react-docs.md](profiles/react-docs.md) applies only to React documentation or an explicit request for React-style learning content.
- [personal-style.md](personal-style.md) contains documented personal overrides. Load it when writing, rewriting, translating, or reviewing style.

Do not load every foundation or profile during ordinary use. Do not apply React structure to unrelated documents, treat personal examples as technical facts, or treat an external guide as mandatory when a higher-priority project rule overrides it. The distilled references are the operational rules; [source-manifest.md](source-manifest.md) is for provenance and maintenance.
