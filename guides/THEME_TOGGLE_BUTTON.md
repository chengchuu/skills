# Theme toggle button

Use this guide to implement an accessible two-state light/dark button for a new project with Mazey and Bootstrap Icons. The control and application state use only `light` and `dark`.

Choose one project-specific storage key, one canonical root selector, and one source of light and dark theme colors. Use the semantic roles in [Theme color scheme](THEME_COLOR_SCHEME.md).

## Install the dependencies

Add the `mazey` npm package as an application dependency and the `bootstrap-icons` npm package as a development dependency with the project's chosen package-management tool. The delivered button contains inline SVG, so the icon package does not need to enter the browser runtime.

Use one project-selected lockfile. Do not add a `packageManager` field, Corepack setup, or a repository-owned package-manager installer. Do not load Bootstrap Icons through its CSS, icon font, a CDN, or a runtime icon component for this control.

Verify `sun-fill.svg` and `moon-stars-fill.svg` against the installed `bootstrap-icons` package. Copy their official `viewBox` and `<path>` data into project-owned markup; do not use secondary copies as version authority.

## Define the state model

Keep the initialized application state concrete:

```ts
import {
  resolveThemePreference,
  setThemePreference,
} from "mazey";
import type { ResolvedTheme } from "mazey";
```

`resolveThemePreference(storageKey).value` always returns a concrete `ResolvedTheme`: `light` or `dark`. Application code should consume only this value and should not branch on the result's label or resolution source.

Resolution is read-only. It does not write storage or mutate the document.

For a two-state button:

- consume `resolveThemePreference(storageKey).value` during initialization;
- retain that concrete value as the current session state;
- derive every next value from the current session state;
- persist explicit selections with `setThemePreference(storageKey, nextTheme)`;
- apply and retain `nextTheme` even when persistence returns `false`;
- do not resolve again on every click.

Do not recreate Mazey's preference resolution, validation, or storage access in application code.

## Render the button

Render one button in each navigation surface that owns a theme control. If one document contains multiple controls, give each the same data contract and synchronize all of them from the same theme state.

```html
<button
  class="theme-toggle"
  type="button"
  data-theme-toggle
  aria-label="Current theme: Light. Switch to dark theme."
>
  <svg
    class="theme-toggle__icon theme-toggle__icon--sun"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    data-theme-icon="light"
  >
    <!-- Insert the official sun-fill path from the installed package. -->
  </svg>
  <svg
    class="theme-toggle__icon theme-toggle__icon--moon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    data-theme-icon="dark"
    hidden
  >
    <!-- Insert the official moon-stars-fill paths from the installed package. -->
  </svg>
</button>
```

Keep static markup internally consistent before JavaScript runs:

- initialize the document as light;
- show `sun-fill` and hide `moon-stars-fill`;
- use `Current theme: Light. Switch to dark theme.` as the accessible label.

For dark mode, show `moon-stars-fill`, hide `sun-fill`, and use:

```text
Current theme: Dark. Switch to light theme.
```

Do not add visible `L` or `D` text. Do not add `aria-pressed`; the accessible name already communicates the current state and next action. The icons are decorative because the button supplies the accessible name.

## Style the control

Use `32px` as the default button size and `16px` as the icon size. If product requirements select another accessible target size, preserve a stable circular layout, keyboard focus, and synchronized icon dimensions.

```css
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  padding: 7px;
  color: var(--color-body);
  background: var(--color-surface);
  border: 1px solid var(--color-field);
  border-radius: 50%;
  cursor: pointer;
}

.theme-toggle:hover {
  color: var(--color-heading);
  border-color: var(--color-primary);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.theme-toggle__icon {
  display: block;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
}

.theme-toggle__icon[hidden] {
  display: none;
}
```

Keep hover, active, disabled, and focus-visible treatments consistent with the project's semantic palette. Do not rely on the icon or color alone to expose the button's action.

## Synchronize the document

Keep project-specific DOM behavior in one `applyTheme()` path. The path should synchronize only the representations the project owns:

- the canonical root theme selector;
- Bootstrap 5's `data-bs-theme` attribute when Bootstrap is present;
- CSS `color-scheme`;
- the application-controlled `<meta name="theme-color">`, when present;
- every theme button's accessible label;
- every theme button's sun and moon visibility.

The following framework-neutral example uses `data-theme` as the canonical selector. Adapt selectors and metadata configuration to the target repository instead of introducing a parallel contract.

```ts
import {
  resolveThemePreference,
  setThemePreference,
} from "mazey";
import type { ResolvedTheme } from "mazey";

interface ThemeToggleConfig {
  storageKey: string;
  themeColors: Readonly<Record<ResolvedTheme, string>>;
  synchronizeBootstrap: boolean;
}

const labels: Readonly<Record<ResolvedTheme, string>> = {
  light: "Current theme: Light. Switch to dark theme.",
  dark: "Current theme: Dark. Switch to light theme.",
};

export function initializeThemeToggle(
  config: ThemeToggleConfig,
): () => void {
  let currentTheme = resolveThemePreference(config.storageKey).value;

  function applyTheme(theme: ResolvedTheme): void {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    if (config.synchronizeBootstrap) {
      root.dataset.bsTheme = theme;
    }

    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (themeColor) {
      themeColor.content = config.themeColors[theme];
    }

    document
      .querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")
      .forEach((button) => {
        button.setAttribute("aria-label", labels[theme]);
        button
          .querySelector<SVGElement>('[data-theme-icon="light"]')
          ?.toggleAttribute("hidden", theme !== "light");
        button
          .querySelector<SVGElement>('[data-theme-icon="dark"]')
          ?.toggleAttribute("hidden", theme !== "dark");
      });
  }

  function handleClick(event: MouseEvent): void {
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest("[data-theme-toggle]")) return;

    const nextTheme: ResolvedTheme =
      currentTheme === "light" ? "dark" : "light";

    setThemePreference(config.storageKey, nextTheme);
    currentTheme = nextTheme;
    applyTheme(currentTheme);
  }

  applyTheme(currentTheme);
  document.addEventListener("click", handleClick);

  return () => {
    document.removeEventListener("click", handleClick);
  };
}
```

The metadata lookup and persistence call are real browser boundaries. An absent metadata element or failed storage write must not block the visible theme change. Invalid internal configuration should still fail normally; do not add broad exception handling around project-owned state.

If the button markup is guaranteed by the project, tests should enforce the required icons. Optional DOM lookups in the reusable example keep theme application safe while navigation surfaces mount or unmount.

## Initialize before interaction

Place light-consistent attributes, metadata, label, and icon visibility in static HTML. Run the same resolution and application behavior in the earliest CSP-compatible project bundle, before normal interaction and preferably before the first visible paint.

Avoid independent pre-paint and application theme systems. If separate entry points are required, share the storage key, selectors, colors, and application contract, and prevent duplicate event registration.

Do not persist the initial result merely because initialization resolved it. Persistence belongs to an explicit user toggle.

## Respect integration boundaries

- Let React, Vue, or another selected framework own mounting and cleanup. Keep Mazey calls and the concrete state model unchanged.
- Do not hand-edit generated TypeDoc, static-site, or documentation output. Change the owning source or transformation and validate the generated artifact.
- Synchronize third-party theme controls through supported interfaces rather than reconstructing generated controls.
- Keep Bootstrap Icons and website-only theme code out of a reusable package's published runtime unless they are intentional consumer APIs.
- Treat static web app manifest colors as a separate build contract. Updating runtime `theme-color` metadata does not rewrite an installed manifest.

## Verify the implementation

Test source behavior and the final generated artifact.

### Static markup

- The expected number of `[data-theme-toggle]` buttons exists on each surface.
- Each button has `type="button"` and an accessible label.
- Each button contains the installed package's official `sun-fill` and `moon-stars-fill` path data.
- Both SVGs declare a `16 × 16` view box and rendered dimensions.
- Both SVGs use `aria-hidden="true"` and `focusable="false"`.
- The initial sun is visible and the initial moon is hidden.
- No visible `L` or `D` text or `aria-pressed` remains.

### Runtime behavior

- Initialization consumes only the concrete `light` or `dark` value returned by Mazey.
- Repeated clicks alternate `light → dark → light`.
- Every explicit click attempts to persist the concrete next value.
- A failed persistence attempt still updates and retains the session theme.
- Root selectors, `color-scheme`, metadata, labels, and icons remain synchronized.
- Initialization and cleanup do not register duplicate handlers.

### Styling and delivery

- The default button remains exactly `32px × 32px`, circular, and border-box sized.
- Icons remain exactly `16px × 16px` with no layout shift.
- Hover and focus-visible states work in both themes.
- Generated pages contain the intended control.
- No Bootstrap Icons CSS, font, CDN request, or unused asset enters the delivered website.
- Website-only icon and theme code does not leak into a published library package.

Recheck keyboard operation, accessible names, contrast, responsive navigation, browser metadata, and production asset contents in the final build rather than relying only on source inspection.
