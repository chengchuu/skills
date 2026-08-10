# Frontend Project Icons

Use this guidance when an architecture defines installable-app icons, PWA manifest assets, maskable artwork, or an icon-generation and delivery pipeline. Preserve an existing project's maintained icon and manifest contract. For a greenfield PWA, start with three separate PNG assets while adapting their names and URLs to the repository's asset conventions and deployment base path.

## Three-Asset Contract

Use this manifest shape as the greenfield default:

```json
{
  "icons": [
    {
      "src": "icons/app-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/app-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/app-maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

Keep the standard 512×512 and maskable 512×512 images separate instead of assigning `purpose: "any maskable"` to one asset. They should share identity, symbol, colors, and general composition, but may use different subject scale, padding, background treatment, and safe-area spacing.

Resolve manifest URLs through the target project's public-path or asset rules. Account for subdirectory deployments, CDN origins, generated filenames, manifest location, and application scope. Do not assume a root-relative `/images/` path or rename established assets merely to match the example.

## Canvas and Optical Size

Keep each canvas at its declared dimensions. When an installed icon looks too large or small, adjust the artwork inside the canvas rather than changing the canvas or falsifying the manifest `sizes` field.

Use 65%–70% of the canvas for the primary subject as a starting heuristic, not a geometric requirement. Judge optical weight: silhouettes, circles, thin marks, bright backgrounds, and edge proximity can make equal bounding boxes appear different. For an oversized icon, try reducing the subject by roughly 10%–15%; for an undersized icon, enlarge it gradually while preserving safe margins.

## Normal and Maskable Artwork

Optimize `purpose: "any"` icons for visual balance with other installed applications. Allow breathing room and choose either a full-bleed background or a transparent background with a standalone symbol according to the product identity.

Optimize the maskable icon for platform cropping:

- use a full-bleed background that reaches every canvas edge;
- center the important subject and keep it inside a generous safe region;
- keep critical details away from corners and outer edges;
- do not use transparent outer margins as mask-safe spacing;
- test circular, rounded-square, squircle, and other supported previews.

## Design and Delivery

Prefer one recognizable concept, a strong silhouette, simple geometry, high foreground/background contrast, and a limited number of visual elements. Avoid small text, thin lines, tiny badges, screenshot-like detail, and unrelated symbols. Verify recognition at 32–64 px and clarity against light and dark environments.

Assign one owner to each stage: source artwork, export or generation settings, optimized PNGs, manifest entries, public URLs, and deployed artifacts. When PNGs are generated, change their owning source or pipeline and regenerate them instead of independently editing outputs.

## Validation

Verify at least:

- actual PNG dimensions, format, filenames, and manifest declarations agree;
- standard and maskable 512×512 entries use distinct sources and purposes;
- URLs resolve under the production base path and manifest scope;
- normal icons have balanced optical weight and adequate breathing room;
- maskable backgrounds are full bleed and important content survives common crops;
- artwork remains recognizable at small sizes and clear on light and dark surfaces;
- browser tooling recognizes every entry and an installed build uses the expected icons;
- representative desktop, mobile launcher, Dock, task-switcher, and shortcut surfaces look balanced where the product supports them.
