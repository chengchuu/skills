# Frontend Website Icons

Use this guidance when an architecture defines website interface icons, Bootstrap Icons delivery, icon-only controls, or an icon-based theme switcher. Preserve an existing accessible icon system when it satisfies the project. For a greenfield website without an established icon contract, prefer a locally installed `bootstrap-icons` package.

## Delivery Boundary

Select the rendering method from the target build, CSP, reuse pattern, and performance requirements:

- use individual SVGs when explicit imports and per-icon optimization fit the build;
- use an SVG sprite when many repeated icons benefit from one maintained asset;
- use the web font when the project accepts its stylesheet and font-loading trade-offs.

Keep Bootstrap Icons under website or documentation-site ownership. In a reusable package repository, do not make the icon package, font files, styles, or copied assets part of the published runtime unless consumers intentionally depend on that interface. Prefer local delivery over a CDN so offline behavior, CSP, asset versioning, and deployment paths remain under project control.

Resolve copied files and generated URLs through the repository's asset pipeline and public base path. Import only the required surface when the selected rendering method permits it, and measure the final bundle or copied asset cost instead of assuming it is negligible.

## Theme Controls

For Cheng's greenfield theme-control default:

- show `sun-fill` when the current resolved theme is light;
- show `moon-stars-fill` when the current resolved theme is dark;
- keep `system` as the stored user preference while deriving the displayed icon from its resolved light or dark result.

Treat user preference and resolved theme as separate state. When either changes, synchronize the icon, accessible action label or selected preference, root theme selector, CSS `color-scheme`, and browser theme metadata in one update path.

For a two-state toggle, make the accessible name describe the action, such as switching to the opposite theme. For a `system`/`light`/`dark` selector, expose the selected preference and resolved result through accessible text or state; do not imply that the resolved icon is the stored preference. Do not use the icon alone to communicate the current preference, resolved theme, or available action.

## Accessibility

- Mark a purely decorative icon with `aria-hidden="true"`.
- Give every icon-only button an accessible name on the control itself.
- Keep visible focus, keyboard operation, adequate hit area, and sufficient contrast.
- Pair status or selection with text, accessible state, or another non-color cue.
- Do not rely on a tooltip as the control's only accessible name.

Follow the official Bootstrap Icons accessibility guidance for the selected rendering method, then verify the complete control with browser accessibility tooling and keyboard interaction.

## Validation

Verify at least:

- the installed package exposes the selected icons and rendering assets;
- generated SVG, sprite, CSS, and font paths resolve under the production base path;
- CSP permits only the resources required by the chosen delivery method;
- icons remain available in supported offline states and do not flash as missing glyphs;
- unused icon assets do not inflate the delivered site or published package artifact;
- icon-only controls retain an accessible name when the icon fails to load;
- theme controls remain synchronized during initialization, manual selection, system-theme changes, persistence failures, and repeated mounting or cleanup;
- the final deployed artifact contains every referenced asset.

Bootstrap Icons are website interface assets. Do not use them as substitutes for product branding, favicons, social images, or PWA manifest artwork.
