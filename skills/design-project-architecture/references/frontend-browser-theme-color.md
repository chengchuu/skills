# Frontend Browser Theme Color

Use this guidance when an architecture controls browser `theme-color`, resolves light and dark preferences, initializes a theme before application mount, or synchronizes later user and system changes. Preserve an existing maintained lifecycle. For a greenfield project using the bundled blue preset, prefer the brand-primary color as the initial and failure fallback, then use the resolved surface color after initialization.

## State Model

Keep three responsibilities separate:

- **Default browser color**: the static `content` value available before JavaScript runs or when initialization fails.
- **User preference**: `system`, `light`, or `dark` when the product exposes all three choices.
- **Resolved theme**: only `light` or `dark`, derived from the preference and available environment.

Store the preference rather than only the resolved theme so a `system` choice can continue following operating-system changes. Do not let independent header, footer, page, or framework components resolve and overwrite theme state separately.

## Initial Resolution

Use this precedence unless an existing product contract requires another order:

1. a valid fixed `light` or `dark` URL override;
2. a valid persisted user preference;
3. the system preference from `prefers-color-scheme`;
4. a safe project-defined fallback.

Treat URL values, stored values, and browser APIs as untrusted or unavailable inputs. Accept only supported values. Define whether a URL override is transient or persisted instead of allowing that behavior to emerge accidentally.

Apply the initial resolved theme early enough to avoid an avoidable wrong-theme flash. Place the `theme-color` element before the initialization code, and avoid unnecessary asynchronous delays before setting the root theme state. Respect the target rendering strategy and content-security-policy requirements.

## Browser Metadata Contract

Maintain exactly one application-controlled `<meta name="theme-color">` element. The browser-standard interface consists of `name="theme-color"` and its `content` value. Custom `data-*` attributes may hold light and dark configuration for application code, but browsers do not interpret or switch those values automatically.

For the blue preset, use:

- `#4d8ffb` as the static brand-first default and failure fallback;
- `#ffffff` after resolving light mode;
- `#141414` after resolving dark mode.

Brand-first fallback is a conditional greenfield preference. Use a surface-first static value instead when browser chrome must match the default page surface without JavaScript. Keep web app manifest colors as a separate build or product contract; changing runtime metadata does not rewrite an already fetched manifest.

## Apply and Synchronize

Apply a validated resolved theme as one coordinated operation:

1. set the root selector consumed by CSS and any UI framework;
2. set CSS `color-scheme` for native controls;
3. update `theme-color` to the resolved surface color when the element exists;
4. synchronize every theme control and its accessible selected state.

An absent metadata element should not prevent the page theme from applying. A storage read or write failure should not prevent current theme resolution or application. Report or handle each outcome independently where the product requires diagnostics.

When the preference is `system`, listen for supported `prefers-color-scheme` changes and reapply the resolved theme. Ignore system changes while the user has selected fixed light or dark. Use the browser baseline's event API, provide compatibility handling only when required, and remove listeners when their owning component or runtime is destroyed.

## Validation

Verify at least:

- the static default before JavaScript and after initialization failure;
- URL, persisted, system, and safe-fallback precedence with invalid and unavailable inputs;
- resolved light and dark root state, `color-scheme`, metadata, and controls;
- preservation of `system` across persistence and later system changes;
- unavailable storage or media-query APIs without blocking theme application;
- one application-controlled metadata element placed before initialization;
- multiple controls remaining synchronized;
- listener cleanup at the lifecycle boundary.
