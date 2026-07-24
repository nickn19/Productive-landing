# Produc8ive website

The website and its brand kit are implemented as a Vite + React single-page app.

## Run it

```bash
npm install
npm run dev
```

Use `npm run build` to create a production build. The optional Strapi CMS runs with `npm run cms` and is available at `http://localhost:1337` by default.

## Where to find things

| Need | Location |
| --- | --- |
| Landing page | `src/main.jsx` → `HomeHero` and the sections it composes |
| Brand kit | `src/main.jsx` → routes such as `/brand`, `/logo`, `/colors`, `/typography`, `/actions`, `/surfaces`, `/patterns`, `/tokens`, and `/components` |
| Reusable landing-page sections | `src/main.jsx` → `SectionLibrary`, `SplitHero`, `ProductHero`, `SplitFeature`, `FeatureGrid`, `ConversionBanner`, and `CorporateFooter` |
| Shared visual style, tokens, and responsive rules | `src/styles.css` |
| Animated landing-page background | `src/FloatingLines.jsx` and `src/FloatingLines.css` |
| Brand logo and landing-page illustration | `public/logo.png`, `public/agent-workspace-placeholder.svg`, and `DIY dashboard.PNG` |
| Brand strategy and copy source | `PRODUC8IVE_MARKETING_SOURCEBOOK.md` |
| CMS content type for homepage copy | `cms/src/api/homepage/` |

## Routes

- `/` — marketing landing page
- `/brand` — brand-system overview
- `/components` — reusable Produc8ive landing-page section library

The page fetches homepage copy from Strapi when it is available, then falls back to the content defined in `src/main.jsx`.
