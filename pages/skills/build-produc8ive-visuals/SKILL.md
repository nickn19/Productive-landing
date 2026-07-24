---
name: build-produc8ive-visuals
description: Create or revise Produc8ive website visuals as responsive JSX and CSS product-interface compositions. Use for finance workflow diagrams, agent cards, dashboard mockups, document flows, validation states, system maps, report previews, or section artwork that must follow the Produc8ive brand instead of using raster images, generic icons, or competitor styling.
---

# Build Produc8ive Visuals

Create credible product-interface illustrations with semantic JSX and native CSS. Treat each visual as evidence of how work moves, not decoration.

## Required context

1. Read `src/styles.css` for current tokens and nearby component patterns.
2. Read the relevant component in `src/main.jsx` before editing.
3. Read `references/visual-language.md` completely.
4. Consult `PRODUC8IVE_MARKETING_SOURCEBOOK.md` only when a visual implies capability, metrics, system support, security, or outcomes. Search for the relevant term instead of loading the entire sourcebook.

## Workflow

1. Extract the inputs, processing, human review or exception, and output from the subsection copy.
2. Choose one composition from the routing table in `references/visual-language.md`.
3. Reuse existing brand tokens; do not introduce another palette or type system.
4. Implement the smallest semantic JSX structure that communicates the story.
5. Scope every selector to its section or visual.
6. Add responsive behavior at the project’s existing breakpoints without horizontal scrolling at 320px.
7. Mark decorative containers with `aria-hidden="true"`; keep factual meaning in adjacent real text.
8. Run the production build and inspect desktop and mobile layouts when browser control is available.

## Implementation rules

- Use JSX/CSS before generating a bitmap.
- Use Grid and Flexbox for layout; pseudo-elements for connectors, rings, dotted fields, and depth.
- Keep important copy outside illustrations. Abbreviate optional interface microcopy.
- Use restrained shadows, 1px borders, warm paper surfaces, and large quiet areas.
- Describe specific finance operations: capture, match, validate, route, approve, post, report, or attach evidence.
- Show human control through approval gates, exception cards, ownership, or review states.
- Show AI indirectly through coordinated work and prepared outputs. Do not use robots, glowing brains, sparkles, magic wands, neon nodes, or science-fiction effects.
- Do not copy competitor logos, exact layouts, proprietary UI, names, or orange-heavy styling. Abstract only structured panels, document layers, task states, connectors, and report previews.
- Do not add an icon or diagram dependency when inline SVG or CSS is sufficient.
- Do not publish unverified metrics or imply unsupported integrations.

## Quality bar

- The illustration explains the subsection without relying on its heading.
- Cards in one family share borders, radius, shadow, density, and scale.
- Dotted textures remain subtle and fade beneath dense interface artwork.
- Status colors also use text or symbols.
- Text remains readable at 100% zoom and on mobile.
- Animation is unnecessary by default; if used, honor `prefers-reduced-motion`.
- `npm run build` passes.

## Handoff

State which files changed, the visual pattern chosen, and whether the production build passed.
