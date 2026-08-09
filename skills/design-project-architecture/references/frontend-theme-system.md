# Frontend Theme System

Use this guidance when an architecture defines design tokens, light and dark color schemes, framework theme integration, browser chrome, or PWA appearance. Preserve an existing project's maintained theme contract. For a greenfield project, choose names and colors that fit its product identity and accessibility requirements, or use the bundled blue preset when the project needs ready-made colors and has no conflicting brand palette.

## Semantic Color Contract

Define a small semantic interface by role rather than exposing light- or dark-theme values directly to components. Include only roles the product needs, such as:

- primary and on-primary colors for accents and filled controls;
- surface, heading, body, muted, divider, field, and focus colors;
- code, highlight, success, warning, danger, or other product-specific states.

Specify coordinated values for every supported scheme. Treat a foreground and its background as a pair: do not assume white is the correct text or icon color on a primary fill. Components should consume semantic roles instead of selecting theme-specific hex values.

Keep ownership explicit. Identify the file or module that owns token values, the document state that selects a scheme, and the code that resolves a saved or system preference. Avoid duplicating independent theme state across CSS, JavaScript, framework configuration, and generated metadata.

## Framework Mapping

When a UI framework is selected, map its public theme variables to the semantic contract so framework and custom components resolve consistently. Preserve the target framework's supported selector and configuration model instead of introducing a parallel theme mechanism.

For Bootstrap, map only the variables required by the product. Keep alternate representations such as hexadecimal colors and RGB channel triplets synchronized when Bootstrap or component CSS consumes both. Do not force Bootstrap mappings into a project that does not use Bootstrap.

Derive translucent surfaces, focus rings, borders, glows, and hover treatments from semantic roles with alpha colors or `color-mix()` when the browser baseline supports them. Add a compatible fallback when required. Prefer derived treatments over unrelated one-off palette values, but promote a derived value to a named semantic token when it becomes a stable product role.

## Resolved Theme Flow

Define one resolved light-or-dark value after applying the product's preference and system rules. Use that value to coordinate:

1. the root document attribute or class consumed by CSS and the UI framework;
2. the CSS `color-scheme` declaration for native controls;
3. `<meta name="theme-color">` when browser chrome should follow the active scheme;
4. theme controls and their accessible selected state;
5. manifest background and theme colors when the product is installable.

Document whether manifest colors are intentionally static or generated per build. Do not imply that changing runtime metadata also rewrites an already fetched manifest. Apply the initial resolved theme early enough to avoid an avoidable flash of the wrong scheme, while respecting the target rendering and content-security-policy constraints.

## Accessibility and Validation

Recalculate contrast for the target colors and rendered context. A source palette's ratios do not remain valid after changing foregrounds, backgrounds, opacity, font size, font weight, or mixed-color percentages. Verify normal text, large text, controls, disabled or muted content, links, code, selections, and every interactive state against the project's accessibility target.

Do not rely on color alone to communicate meaning or selection. Preserve visible keyboard focus and semantic state such as `aria-pressed`, `aria-selected`, or equivalent native attributes.

Validate at least:

- initial rendering and user or system theme changes;
- light and dark component states, including hover, active, disabled, selected, and focus-visible;
- text selection, code treatments, forms, validation states, and overlays;
- framework components and custom components using the same resolved scheme;
- browser theme metadata and installable-app appearance where applicable;
- contrast after any palette, typography, opacity, or derived-color change.
