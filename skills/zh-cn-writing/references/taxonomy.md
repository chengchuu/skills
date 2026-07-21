# Taxonomy

Use the narrowest supported label. Multiple subject areas are allowed; do not invent metadata when evidence is weak.

## Document types

- **Technical tutorial**: teaches a concept or implementation through an ordered learning path and examples.
- **Installation and configuration guide**: establishes an environment or changes system/application settings.
- **Troubleshooting guide**: starts from a symptom and leads through diagnosis, repair, and verification.
- **Technical analysis and concept explanation**: explains mechanisms, trade-offs, history, or design choices.
- **API and integration guide**: documents interfaces, requests, responses, SDKs, or system integration.
- **Product and tool guide**: introduces a tool and shows its practical use without becoming marketing copy.
- **Deployment and operations guide**: covers delivery, automation, CI/CD, remote execution, or operational procedures.
- **Best-practices guide**: recommends conventions or choices and explains their trade-offs.
- **Reference document and cheat sheet**: supports lookup through grouped commands, tables, or concise entries.
- **General article**: structured non-technical or cross-domain writing that is still useful for general style analysis.

## Subject areas

- Databases and algorithms
- JavaScript, TypeScript, and Node.js
- Frontend and web performance
- Build tooling and package management
- Git, CI/CD, and release engineering
- Go and desktop tooling
- Linux and server operations
- Docker and containers
- PWA and service workers
- APIs and developer tools
- macOS and networking
- Media technology
- General software usage
- General concepts

## Audiences

- General readers
- Beginners
- Developers
- Frontend developers
- Backend developers
- Go developers
- DevOps engineers and system administrators
- API consumers and integration developers
- Project maintainers

Use `unknown` when neither vocabulary, assumed knowledge, nor stated purpose supports a reliable choice.

## Tone and formality

Tone labels: formal and explanatory; practical and procedural; diagnostic and restrained; analytical and comparative; concise and reference-oriented; conversational and reflective.

Formality labels:

- **High**: neutral, precise, publication-ready reference or operations prose.
- **Medium to high**: practical technical writing with limited conversational transitions.
- **Medium**: approachable explanation with first-person or colloquial elements.

## Length labels

- **Short**: fewer than 100 source lines or a narrowly scoped task.
- **Medium**: 100–249 source lines or several related sections.
- **Long**: at least 250 source lines or a broad, multi-stage treatment.

Length is a routing hint, not a target. Follow the current user's requested depth.

## Structural patterns

- Conclusion or goal first
- Background → solution → example
- Symptom → diagnosis → fix → verification
- Prerequisites → steps → verification → troubleshooting
- Concept → mechanism → comparison → recommendation
- Interface → parameters → request/response examples
- Grouped lookup table or command catalog
- Narrative incident → lessons → reusable checklist

## Adding future examples

1. Classify from explicit content and structure; use broader labels or `unknown` when uncertain.
2. Check exact and near duplicates before extraction.
3. Prefer one normalized example for publication copies or language variants, while recording every source path.
4. Extract structure and reusable tendencies, not technical facts or distinctive sentences.
5. Record the source, destination, decision, confidence, and number of extracted examples in `source-manifest.md`.
