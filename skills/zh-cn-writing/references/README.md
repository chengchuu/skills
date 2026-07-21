# Reference routing

Use these references progressively. The example corpus is distributable style evidence; the original files under `temp/writing-examples/` are not runtime dependencies.

## Routing order

1. Read [writing-guidelines.md](writing-guidelines.md) for every task. It is the normative language specification.
2. Read the relevant task section in [output-workflows.md](output-workflows.md).
3. If document structure matters, read the matching section in [document-types.md](document-types.md).
4. Read [personal-style.md](personal-style.md) when the user asks for new writing, rewriting, polishing, adaptation to the author's style, or author attribution.
5. Use [taxonomy.md](taxonomy.md) to classify a document or add future examples.
6. Open only the smallest relevant file under [examples/](examples/) needed for the document type and subject.

Do not load every example for every task. Examples guide structure, tone, vocabulary, and level of detail; they are not authoritative sources for technical facts. Never reuse distinctive sentences.

## Task routing

| Task | Required references | Optional references |
| --- | --- | --- |
| Write a new article | Formal guidelines, new-writing workflow, document type | Personal style and 1–3 relevant examples |
| Rewrite or polish | Formal guidelines, rewriting workflow | Personal style and examples matching the source type |
| English-to-Chinese translation | Formal guidelines, translation workflow | Matching Chinese example and its document type |
| Proofread | Formal guidelines, proofreading workflow | Document type only when heading review includes information architecture, section order, or audience fit |
| Language/style review | Formal guidelines, style-review workflow | Personal style |
| Author attribution | Formal guidelines, personal style | Document type only when attribution placement depends on the document structure |
| Structural review | Structural-review workflow, document type | 1–2 structurally similar examples |
| Technical review | Technical boundaries in the workflow | Examples only for presentation, never for fact checking |
| Summarize technical material | Summarization workflow | Matching document type |
| Turn notes into an article | Conversation-notes workflow, document type | Personal style and 1–3 relevant examples |

## Example index

- [technical-tutorials.md](examples/technical-tutorials.md)
- [installation-and-configuration-guides.md](examples/installation-and-configuration-guides.md)
- [troubleshooting-guides.md](examples/troubleshooting-guides.md)
- [technical-analysis.md](examples/technical-analysis.md)
- [api-and-integration-guides.md](examples/api-and-integration-guides.md)
- [product-and-tool-guides.md](examples/product-and-tool-guides.md)
- [deployment-and-operations-guides.md](examples/deployment-and-operations-guides.md)
- [best-practices-guides.md](examples/best-practices-guides.md)
- [reference-documents.md](examples/reference-documents.md)
- [general-articles.md](examples/general-articles.md)

For provenance and merge decisions, see [source-manifest.md](source-manifest.md).

## Maintenance

Run `node ../scripts/validate-references.mjs` from this directory, or `node skills/zh-cn-writing/scripts/validate-references.mjs` from the repository root, after changing the corpus. The source-completeness check runs when `temp/writing-examples/` is available; all distributable-reference checks also work after installation without that directory.
