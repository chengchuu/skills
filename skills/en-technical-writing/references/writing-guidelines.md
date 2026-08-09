# Writing guidelines

- [Technical accuracy](#technical-accuracy)
- [Audience and purpose](#audience-and-purpose)
- [Sentences and voice](#sentences-and-voice)
- [Headings and organization](#headings-and-organization)
- [Procedures](#procedures)
- [Lists, tables, and notices](#lists-tables-and-notices)
- [Links and references](#links-and-references)
- [Code and technical literals](#code-and-technical-literals)
- [Accessibility and global English](#accessibility-and-global-english)
- [Accuracy check](#accuracy-check)
- [Word choice](#word-choice)

## Technical accuracy

- Do not invent behavior, results, prerequisites, compatibility, or evidence.
- Do not silently fix or remove a technical claim because it appears wrong.
- Do not change version requirements, commands, code, identifiers, or other protected literals unless requested.
- Preserve caveats, conditions, uncertainty, and the strength of each claim.
- Report suspected technical conflicts separately.
- Label confirmed issues separately from possible issues and unsupported claims.

## Audience and purpose

- Identify what readers need to accomplish or understand.
- Put the main result, decision, or prerequisite early.
- Write for the reader by using **you** when addressing them directly.
- Use third person for software behavior or a distinct end user.
- Avoid unnecessary first-person plural language such as *we* and *our*.

## Sentences and voice

- Prefer active voice and name the actor.
- Use present tense for current behavior and stable facts.
- Use future tense only for a genuine future event or sequence.
- Prefer familiar, precise words over formal or inflated alternatives.
- Keep sentences focused. Split a sentence when it carries unrelated ideas or too many conditions.
- Put a condition before an instruction when readers must evaluate it first.
- Use natural contractions when they fit the voice, but do not force them.
- Avoid idioms, slang, humor that depends on culture, and unnecessary metaphors.
- Avoid vague pronouns, unnecessary noun stacks, filler introductions, and inflated wording.
- Put the primary action near the beginning.
- Default to an experienced developer audience when no audience is specified, but explain project-specific context.

Passive voice is appropriate when the actor is unknown or irrelevant, when the result deserves emphasis, or when active wording would blame the reader.

## Headings and organization

- Use sentence case unless the project specifies otherwise.
- Make headings unique, descriptive, and parallel at the same level.
- Start task headings with a base-form verb.
- Use noun phrases for conceptual headings.
- Organize sections around reader goals, not the product's internal architecture.
- Add an overview, learning objectives, recap, or next steps only when the document's length and purpose justify them.
- Do not skip heading levels or create unnecessary nesting.
- Avoid an `Overview` heading when a more descriptive heading is available.

## Procedures

- Introduce the goal, prerequisites, and expected result when readers need them.
- Use a numbered list for ordered steps.
- Start each step with an imperative verb.
- Put one primary action in each step.
- Keep step grammar parallel.
- State the expected result after a consequential action when verification helps.
- Place optional detail after the action instead of delaying it.
- Do not create a one-item list.

## Lists, tables, and notices

- Use bullets for unordered, parallel items.
- Use description lists or a table for repeated name-value relationships.
- Use a table only when readers need to compare information across two dimensions.
- Introduce a table with a complete sentence and provide meaningful headers.
- When writing, rewriting, translating, or proofreading editable Markdown, default every table column to left alignment. Use a leading colon in every separator cell.
- Normalize each column to a consistent visual width based on its longest header or body cell. Pad shorter cells with spaces so the pipes align vertically; do not use tabs.
- Calculate display width rather than Unicode character count. Count ASCII and other half-width characters as one display column, CJK ideographs, kana, Hangul syllables, and full-width forms as two, and combining marks as zero.
- Give the corresponding separator cell the same display width as the padded cells in its column. Keep at least the Markdown-required number of hyphens while retaining the leading colon.

  ```markdown
  | Name    | Description      |
  |:--------|:-----------------|
  | App     | Frontend app     |
  | Service | Backend service  |
  ```

- Preserve another table alignment when the user or target repository explicitly requires it.
- Do not alter tables inside fenced code blocks, block quotations, generated files, or protected source content.
- For review-only requests, report inconsistent display widths or separator alignment without rewriting the table or file.
- Minimize notices. Use:
  - **Note** for helpful, noncritical information.
  - **Caution** when an action can cause an unwanted outcome.
  - **Warning** for severe, irreversible, security, safety, financial, or data-loss risk.
- Do not hide required steps inside a note.

## Links and references

- Write link text that describes the destination or action.
- Avoid vague text such as *click here*, *this page*, or *learn more* without context.
- Do not overload a paragraph with links.
- Preserve exact URLs and anchors.
- Follow project conventions for raw URLs and same-text links.

## Code and technical literals

- Preserve commands, code, API names, parameter names, filenames, paths, environment variables, version numbers, UI labels, and error messages unless explicitly asked to change them.
- Explain code immediately before or after it; do not make readers infer why it exists.
- Keep examples minimal but runnable when practical.
- Never invent command output or imply that unrun code was verified.
- Use placeholders that are clearly distinguishable from literal values and explain them when ambiguity is possible.
- Add an accurate language identifier to fenced code blocks.
- Keep commands copyable and separate commands from output.
- Do not add a shell prompt marker unless the project requires one.
- Do not wrap a command in a prose sentence.

## Accessibility and global English

- Do not rely on color, position, or visual appearance alone.
- Use meaningful headings, table headers, link text, and image alternatives.
- Avoid directional references such as *above* or *to the right* when a named section works.
- Expand uncommon abbreviations on first use.
- Avoid culturally specific references, regional date ambiguity, and unexplained units.
- Write literal, translation-friendly sentences and avoid noun strings.
- Use inclusive language and avoid assumptions about identity, ability, location, or circumstances.

## Accuracy check

Before delivery, confirm that:

- every requirement and prerequisite is represented;
- commands and identifiers match the source;
- claims distinguish facts, expectations, and recommendations;
- examples support the text;
- cross-references and headings still resolve;
- the output stays within the requested scope.

## Word choice

Prefer concrete verbs such as *use*, *create*, *update*, *remove*, *check*, *run*, *return*, *send*, *receive*, *open*, *close*, *read*, *write*, *build*, *install*, and *configure* when they are accurate.

Scrutinize inflated or promotional words such as *utilize*, *leverage*, *facilitate*, *seamlessly*, *robust*, *comprehensive*, *cutting-edge*, *best-in-class*, and *effortlessly*. Also scrutinize *simply*, *obviously*, and *just*, which can hide prerequisites or dismiss difficulty. Do not ban a word when it expresses the precise technical meaning.
