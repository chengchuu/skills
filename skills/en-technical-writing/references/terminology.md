# Terminology and en-US conventions

## Default language variant

Use American English (`en-US`) unless the user or project specifies another variant. An existing repository's established variant overrides the default unless the user requests conversion. Do not alter spelling inside code, identifiers, URLs, product names, quoted text, UI labels, filenames, or source-controlled literals.

Prefer `behavior`, `color`, and `initialize` in en-US prose, not `behaviour`, `colour`, or `initialise`. Avoid mixing American and British forms in one document.

## American English mechanics

- Use sentence case for headings by default.
- Use the serial comma when it improves clarity.
- Put periods and commas inside quotation marks in ordinary American prose, except when exact technical text requires another placement.
- Use natural contractions when they suit the document.
- Use unambiguous dates such as `July 30, 2026` in prose or `2026-07-30` in data and technical contexts.
- Use one space after sentence-ending punctuation.

## Term record format

Maintain terms with these fields:

| Field | Purpose |
| --- | --- |
| Preferred term | Default wording in the stated scope |
| Avoid or distinguish | A less precise or differently scoped term |
| Meaning and scope | The concept the term names |
| Exceptions | Cases where another term is correct |
| Source | Project, product, foundation, or personal rule |
| Example | A short original use when needed |

## Initial terminology

These entries prevent accidental synonym swapping; they do not force one term across different meanings.

| Preferred term | Avoid or distinguish | Meaning and scope | Exceptions | Source | Example |
| --- | --- | --- | --- | --- | --- |
| app | application | User-facing software when the product uses *app* | Use *application* in formal platform terms or when the project does | Project first | Open the app. |
| service | system | A networked or managed capability | Use *system* for multiple interacting components | Technical context | Restart the service. |
| client | user | Software that sends a request | A user is a person or role, not a process | Technical context | The client sends a request. |
| server | service | Software or a host that receives requests | A service can span multiple servers | Technical context | The server returns a response. |
| user | developer | A person using the product | Use *developer* when programming is relevant | Audience | The user selects a file. |
| repository | project | A version-controlled store | A project can include several repositories | Technical context | Clone the repository. |
| package | library | A distributable unit | A library describes reusable code, not necessarily its package | Ecosystem | Install the package. |
| framework | library | A framework defines application structure or control flow | Preserve the product's own category | Product | Configure the framework. |
| runtime | build | The environment where code executes | A build transforms source before runtime | Technical context | Select a supported runtime. |
| deploy | install | Release software to a target environment | Install software on a system or into a project | Operations | Deploy the release. |
| configure | set up | Change settings | *Set up* can include installation and configuration; *setup* is a noun | General | Configure the timeout. |
| log in | login | Verb for entering credentials | *Login* can be a noun or adjective if the project uses it | Product | Log in to the console. |
| sign in | log in | Use the interface's official action | Do not interchange official UI labels | Product | Select **Sign in**. |
| deprecated | legacy | Supported but discouraged and scheduled for replacement | *Legacy* describes older technology without that lifecycle promise | API | This method is deprecated. |
| unsupported | deprecated | Not covered or accepted by the product's support contract | Deprecated functionality can remain supported | Product | Node.js 18 is unsupported. |
| error | failure | A reported invalid state or diagnostic | A failure is an unsuccessful outcome and might not emit an error | Technical context | The command returns an error. |
| issue | error | A general problem or tracked work item | Use the specific term when known | Project | Open an issue. |

Preserve official terminology and capitalization. Define unfamiliar terms at first use, avoid unnecessary abbreviations, and use one term for one concept. When translating, create a small term map for repeated product terms and flag unresolved choices.
