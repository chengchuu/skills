# Frontend SEO Delivery

Use this guidance when an architecture defines a public website, generated documentation, canonical routing, social metadata, GitHub Pages delivery, or crawler files. Preserve an existing project's maintained SEO, routing, hosting, and asset contracts. Treat SEO as a build-and-delivery contract rather than unrelated tags copied between pages.

## Define One Canonical Route Registry

Maintain an explicit registry for every public HTML route that may be indexed. For each route, record the stable path, absolute production URL, page title, meta description, and whether it is indexable. Add structured-data input or a social image only when verified facts and assets exist.

Use this registry to drive page templates, generated-documentation transforms, `robots.txt`, `sitemap.xml`, navigation checks, and final-artifact validation. Do not discover sitemap entries by scanning arbitrary build output: generated files may include redirects, aliases, error pages, temporary views, or implementation routes that are not canonical public pages.

Keep production origins distinct from browser asset paths. Canonical URLs identify the deployed public page. Favicons, manifests, scripts, styles, and images must follow the target project's public-path rules so production subdirectory deployments and local previews can both load them.

## Page Metadata Contract

For every indexable page:

- use one concise, page-specific title that describes the actual content;
- use one factual meta description that does not promise unsupported features;
- emit exactly one absolute HTTPS self-referencing canonical URL;
- derive `og:title`, `og:description`, and `og:url` from the same maintained values;
- select an accurate Open Graph type rather than copying a type from another page;
- emit Twitter title, description, and card metadata only when useful;
- use `summary_large_image` and image fields only when a real deployed social image, its type, dimensions, and alt text are verified;
- use a text-oriented `summary` card or omit Twitter metadata when no suitable social asset exists;
- add JSON-LD only when the selected Schema.org type and every property describe verified page or product facts;
- include favicon links whose final URLs resolve to valid deployed files.

Do not invent ratings, review counts, downloads, browser support, social accounts or images, public APIs, features, compatibility, organization details, or structured-data properties. Omit an optional field when its value is unknown.

For generated documentation, replace owned metadata deterministically and remove obsolete copies before inserting the current block. Make the transformation idempotent so a repeated build does not accumulate titles, descriptions, canonicals, favicons, social tags, or JSON-LD blocks.

## Generate Crawler Files

For Cheng's greenfield GitHub Pages projects, generate this `robots.txt`, replacing `<target-project>` with the verified repository and deployment slug:

```text
User-agent: *
Allow: /

Sitemap: https://chengchuu.github.io/<target-project>/sitemap.xml
```

Preserve an existing project's established sitemap origin. For another hosting platform, derive the absolute sitemap URL from that project's verified canonical production origin.

Generate `sitemap.xml` as a valid XML sitemap. A one-route shape is:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://chengchuu.github.io/PROJECT_SLUG/</loc>
  </url>
</urlset>
```

Replace `PROJECT_SLUG` before generation. Include only stable, public, indexable, self-canonical HTML routes. Exclude redirects, canonical aliases, drafts, error pages, assets, hashes, query-state URLs, transient client views, and generated pages without an intentional stable canonical contract. Include a generated API or documentation page only when the project commits to that route as a durable public entry point.

Keep sitemap locations absolute, HTTPS, unique, XML-escaped, and consistent with the preferred trailing-slash or HTML-path convention. Optional sitemap fields such as `lastmod` must come from reliable page-level data; do not manufacture dates, priorities, or change frequencies.

## Build and Validation Flow

Use this ownership flow:

```text
maintained site configuration and canonical routes
├── page templates and generated-documentation transforms
├── robots.txt and sitemap.xml generation
└── final deployable artifact validation → deployment
```

Validate the final artifact under its production base path, not only source templates. Confirm that:

- every indexable HTML page has exactly one title, description, canonical, and non-empty primary heading;
- canonical URLs are unique and agree with Open Graph URLs and applicable JSON-LD page URLs;
- Open Graph and Twitter text agree with maintained page metadata;
- every declared favicon or social image URL resolves to a delivered asset, and recorded image properties match the file;
- every JSON-LD block parses and contains only accurate, supported properties;
- `robots.txt` identifies the generated sitemap at its canonical production URL;
- sitemap locations are unique stable routes, map to delivered HTML, and match those pages' self-canonicals;
- links and assets work from the real deployment base path, including GitHub Pages project subpaths.

Fail the build before deployment when a maintained SEO contract or referenced asset is invalid. Do not publish generated output that disagrees with its canonical route registry.
