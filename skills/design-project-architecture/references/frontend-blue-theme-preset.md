# Frontend Blue Theme Preset

Use this preset for a greenfield frontend that needs a ready-made light and dark blue palette and has no established brand or design-system colors. Preserve an existing project's palette. Explicit product branding and verified accessibility requirements take precedence over this preset.

Adopt the semantic palette and its foreground relationships together. Use the common `--color-*` namespace consistently, or rename it when the target project already has a maintained semantic-token convention.

## Semantic Palette

| Token | Light | Dark | Purpose |
| :--- | :--- | :--- | :--- |
| `--color-primary` | `#4d8ffb` | `#5089e8` | Links, buttons, selected controls, and accents |
| `--color-on-primary` | `#141414` | `#141414` | Text and icons on the primary color |
| `--color-surface` | `#ffffff` | `#141414` | Page, header, footer, field, and control surfaces |
| `--color-heading` | `#2d2d2d` | `#d6d6d6` | Headings and high-emphasis text |
| `--color-body` | `#626262` | `#a5a5a5` | Body and default navigation text |
| `--color-muted` | `#828282` | `#878787` | Metadata and secondary text |
| `--color-divider` | `#f6f6f6` | `#1d1d1d` | Fine section and layout dividers |
| `--color-field` | `#ebebeb` | `#272727` | Form, control, and card borders |
| `--color-focus` | `#d9d9d9` | `#373737` | Reserved focus-border color |
| `--color-fieldset` | `#c0c0c0` | `#4e4e4e` | Fieldset and dashed empty-state borders |
| `--color-code-bg` | `#eeeeee` | `#242424` | Code-block and inline-code backgrounds |
| `--color-code` | `#e83e8c` | `#d44386` | Inline-code text |
| `--color-highlight` | `#fff9c0` | `#413f2b` | Text selection, insertion, and highlights |

Define the light values on `:root` and override the theme-dependent values under the target project's dark-theme selector. The dark scheme intentionally retains `--color-on-primary: #141414`; do not replace it with white without rechecking contrast.

## Bootstrap 5 Mapping

When the target uses Bootstrap 5, map its variables to the preset under the same light and dark selectors:

| Bootstrap variable | Light | Dark |
| :--- | :--- | :--- |
| `--bs-primary` | `#4d8ffb` | `#5089e8` |
| `--bs-primary-rgb` | `77, 143, 251` | `80, 137, 232` |
| `--bs-body-bg` | `#ffffff` | `#141414` |
| `--bs-body-color` | `#626262` | `#a5a5a5` |
| `--bs-heading-color` | `#2d2d2d` | `#d6d6d6` |
| `--bs-border-color` | `#ebebeb` | `#272727` |
| `--bs-link-color` | `#4d8ffb` | `#5089e8` |
| `--bs-link-hover-color` | `#2f73df` | `#79a7f1` |

Keep each RGB triplet synchronized with its hexadecimal primary value. Custom components should consume the semantic `--color-*` roles; Bootstrap components should resolve the same palette through `--bs-*` variables.

## Browser and PWA Colors

Use the surface colors for browser chrome:

| Setting | Light | Dark |
| :--- | :--- | :--- |
| `<meta name="theme-color">` | `#ffffff` | `#141414` |
| CSS `color-scheme` | `light` | `dark` |

Update runtime browser metadata from the resolved theme. For an installable app, choose manifest `background_color` and `theme_color` deliberately; the source preset uses the light surface, `#ffffff`, for both static manifest values.

## Contrast Constraints

The preset's recorded WCAG relative-luminance ratios are:

| Foreground and background | Light | Dark | Constraint |
| :--- | :--- | :--- | :--- |
| Heading on surface | `13.77:1` | `12.68:1` | Suitable for normal text |
| Body on surface | `6.10:1` | `7.48:1` | Suitable for normal text |
| Muted on surface | `3.84:1` | `5.13:1` | Keep light muted text secondary and noncritical |
| On-primary on primary | `5.82:1` | `5.34:1` | Suitable for normal control text |
| Primary on surface | `3.16:1` | `5.34:1` | Use light primary for accents or large text |
| Link hover on surface | `4.53:1` | `7.55:1` | Suitable for normal text |

Do not use light `--color-primary` for small essential text that requires WCAG AA normal-text contrast. Use the light link-hover color or another verified text color. Recalculate every affected ratio when adapting any color, opacity, font, background, or derived treatment, and retain the interaction-state validation required by the general theme-system guidance.
