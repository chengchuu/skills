# Theme color scheme

Reuse the semantic roles and theme behavior together; do not copy isolated hex values without checking their intended foreground, background, and interaction state.

## Semantic palette

Use the `--color-*` properties as the default interface. Component CSS should depend on semantic roles instead of direct light- or dark-theme values. If an existing project already has a maintained token namespace, preserve it and map these roles to that namespace.

| Token                  | Light     | Dark      | Purpose                                           |
|:-----------------------|:----------|:----------|:--------------------------------------------------|
| `--color-primary`      | `#4d8ffb` | `#5089e8` | Links, buttons, selected controls, and accents    |
| `--color-on-primary`   | `#141414` | `#141414` | Text and icons displayed on the primary color     |
| `--color-surface`      | `#ffffff` | `#141414` | Page, header, footer, field, and control surfaces |
| `--color-heading`      | `#2d2d2d` | `#d6d6d6` | Headings and other high-emphasis text             |
| `--color-body`         | `#626262` | `#a5a5a5` | Body text and default navigation text             |
| `--color-muted`        | `#828282` | `#878787` | Metadata and secondary text                       |
| `--color-divider`      | `#f6f6f6` | `#1d1d1d` | Fine section, header, and footer dividers         |
| `--color-field`        | `#ebebeb` | `#272727` | Form, control, and card borders                   |
| `--color-focus`        | `#d9d9d9` | `#373737` | Reserved focus-border color                       |
| `--color-fieldset`     | `#c0c0c0` | `#4e4e4e` | Fieldset and dashed empty-state borders           |
| `--color-code-bg`      | `#eeeeee` | `#242424` | Code-block and inline-code backgrounds            |
| `--color-code`         | `#e83e8c` | `#d44386` | Inline-code text                                  |
| `--color-highlight`    | `#fff9c0` | `#413f2b` | Text selection, insertion, and highlights         |

## Canonical CSS

Define the light palette on `:root` and override theme-dependent values under the project's resolved dark-theme selector. This example uses `data-theme="dark"`; adapt the selector when the project already has a maintained theme contract.

```css
:root {
  color-scheme: light;
  --color-primary: #4d8ffb;
  --color-on-primary: #141414;
  --color-surface: #ffffff;
  --color-heading: #2d2d2d;
  --color-body: #626262;
  --color-muted: #828282;
  --color-divider: #f6f6f6;
  --color-field: #ebebeb;
  --color-focus: #d9d9d9;
  --color-fieldset: #c0c0c0;
  --color-code-bg: #eeeeee;
  --color-code: #e83e8c;
  --color-highlight: #fff9c0;
}

[data-theme="dark"] {
  color-scheme: dark;
  --color-primary: #5089e8;
  --color-surface: #141414;
  --color-heading: #d6d6d6;
  --color-body: #a5a5a5;
  --color-muted: #878787;
  --color-divider: #1d1d1d;
  --color-field: #272727;
  --color-focus: #373737;
  --color-fieldset: #4e4e4e;
  --color-code-bg: #242424;
  --color-code: #d44386;
  --color-highlight: #413f2b;
}
```

The dark block inherits `--color-on-primary: #141414` from `:root`. Keep this dark foreground on both primary blues; white text does not provide the intended contrast for these controls.

## Bootstrap mapping

When the project uses Bootstrap, map its variables to the semantic palette so framework components and custom components resolve the same theme. Keep Bootstrap's `data-bs-theme` selector aligned with the project's resolved theme state.

```css
:root {
  --bs-primary: #4d8ffb;
  --bs-primary-rgb: 77, 143, 251;
  --bs-body-bg: #ffffff;
  --bs-body-color: #626262;
  --bs-heading-color: #2d2d2d;
  --bs-border-color: #ebebeb;
  --bs-link-color: #4d8ffb;
  --bs-link-hover-color: #2f73df;
}

[data-bs-theme="dark"] {
  --bs-primary: #5089e8;
  --bs-primary-rgb: 80, 137, 232;
  --bs-body-bg: #141414;
  --bs-body-color: #a5a5a5;
  --bs-heading-color: #d6d6d6;
  --bs-border-color: #272727;
  --bs-link-color: #5089e8;
  --bs-link-hover-color: #79a7f1;
}
```

Keep each `--bs-primary-rgb` value synchronized with its hexadecimal primary value. Components can use this RGB triplet for translucent backgrounds and focus rings.

## Derived component colors

Use `color-mix()` and alpha colors for secondary treatments rather than adding one-off palette values.

| Treatment                | Example expression                                                       |
|:-------------------------|:-------------------------------------------------------------------------|
| Page accent glow         | `color-mix(in srgb, var(--color-primary) 10%, transparent)`              |
| Translucent header       | `color-mix(in srgb, var(--color-surface) 88%, transparent)`              |
| Global focus outline     | `color-mix(in srgb, var(--color-primary) 55%, transparent)`              |
| Search focus ring        | `color-mix(in srgb, var(--color-primary) 18%, transparent)`              |
| Media outline            | `color-mix(in srgb, var(--color-primary) 35%, var(--color-field))`       |
| Card surface             | `color-mix(in srgb, var(--color-surface) 94%, var(--color-primary))`     |
| Card hover edge          | `color-mix(in srgb, var(--color-primary) 45%, var(--color-field))`       |
| Link border              | `color-mix(in srgb, var(--color-primary) 30%, var(--color-field))`       |
| Button hover background  | `color-mix(in srgb, var(--color-primary) 88%, #ffffff)`                  |
| Button active background | `color-mix(in srgb, var(--color-primary) 80%, #ffffff)`                  |
| Media shadow             | `rgb(0 0 0 / 16%)`                                                       |
| Card shadow              | `rgb(0 0 0 / 8%)`                                                        |

Use `--color-on-primary` for text and icons on primary buttons and other primary-filled interactive controls.

## Browser theme colors

The resolved theme controls the root attribute and the browser chrome color.

| Setting                     | Light                   | Dark                   |
|:----------------------------|:------------------------|:-----------------------|
| Root attribute              | `data-theme="light"`    | `data-theme="dark"`    |
| `<meta name="theme-color">` | `#ffffff`               | `#141414`              |
| CSS `color-scheme`          | `light`                 | `dark`                 |

Store the light and dark browser colors in the project's maintained theme configuration. Update `<meta name="theme-color">` whenever the resolved theme changes. For a static web app manifest, choose `background_color` and `theme_color` deliberately because the manifest cannot follow runtime theme changes.

## Contrast constraints

The following ratios use the WCAG relative-luminance calculation.

| Foreground and background | Light     | Dark      | Reuse guidance                                  |
|:--------------------------|:----------|:----------|:------------------------------------------------|
| Heading on surface        | `13.77:1` | `12.68:1` | Suitable for normal text                        |
| Body on surface           | `6.10:1`  | `7.48:1`  | Suitable for normal text                        |
| Muted on surface          | `3.84:1`  | `5.13:1`  | Keep light muted text secondary and noncritical |
| On-primary on primary     | `5.82:1`  | `5.34:1`  | Suitable for normal control text                |
| Primary on surface        | `3.16:1`  | `5.34:1`  | In light mode, use for UI accents or large text |
| Link hover on surface     | `4.53:1`  | `7.55:1`  | Suitable for normal text                        |

The light primary blue does not reach `4.5:1` against white. Do not reuse it for small, essential body text when WCAG AA normal-text contrast is required. Use the light hover blue, `#2f73df`, or select another verified text color while retaining `#4d8ffb` for borders, controls, focus accents, and large display text.

Do not rely on color alone to communicate state. Preserve visible focus indicators and state attributes such as `aria-pressed`.

## Reuse checklist

When you apply this scheme to another project:

1. Copy the semantic tokens and their coordinated light and dark values together.
2. Apply the project's resolved light or dark theme selector to the root document.
3. Use semantic variables in components instead of direct theme hex values.
4. Keep `--color-on-primary` on every primary-filled interactive control.
5. Update browser theme metadata when the resolved theme changes.
6. Recheck contrast when font size, weight, opacity, backgrounds, or mixed-color percentages change.
7. Test keyboard focus, selected states, text selection, and both color schemes.
8. If the project uses Bootstrap, keep its variables and `data-bs-theme` state synchronized with the semantic tokens and resolved theme.
