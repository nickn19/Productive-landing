# Produc8ive coded visual language

## Brand primitives

Use the canonical properties already declared in `src/styles.css`.

| Role | Token | Typical use |
|---|---|---|
| Page warmth | `--surface-primary` | Section background |
| Clean paper | `--surface-secondary` | Cards and documents |
| Deep focus | `--surface-inverse` | Featured workflow panels |
| Primary text | `--text-primary` | Titles and interface labels |
| Secondary text | `--text-secondary` | Descriptions and metadata |
| Quiet border | `--border-subtle` | Cards, dividers, connectors |
| Controlled state | `--sage-500` | Complete, connected, governed |
| Attention state | `--signal-500` | Exceptions and active paths |
| Display type | `--font-display` | Section and card titles |
| UI type | `--font-body` | Interface labels and metadata |

Prefer square or lightly rounded surfaces. Use 1–4px radii unless matching an existing component. Keep shadows below roughly `0 12px 30px rgba(23,23,23,.10)`.

## Reference-derived grammar

The supplied competitor examples inform composition, not styling. Retain:

- one dominant interface story per card;
- realistic document, report, dashboard, or workflow fragments;
- clear input-to-output relationships;
- small status chips and metadata;
- layered cards with restrained depth;
- wide whitespace around the active workflow;
- thin connectors and quiet background grids;
- a human checkpoint for consequential actions.

Translate these traits into Produc8ive’s ivory, ink, stone, sage, and signal palette. Never reproduce competitor marks, typography, orange accents, labels, or exact screens.

## Composition routing

| Copy intent | Preferred visual |
|---|---|
| Collect from many sources | Source cards feeding a structured intake panel |
| Validate or reconcile | Split document/record view plus checks and one exception |
| Coordinate a workflow | Connected task cards with owners, states, and a review gate |
| Deliver completed work | Report or workpaper preview with evidence and review status |
| Shared organizational context | Central Finance Brain with SOP, rules, live data, and knowledge nodes |
| Work across systems | Hub-and-spoke map with generic ERP, mail, docs, bank, and specialist-system nodes |
| Human control | Exception card, approval action, owner, confidence, or materiality indicator |
| Outcome comparison | Before/after comparison only when the claim is approved |

## Card anatomy

Use eyebrow or status, title, concise explanation, illustration occupying 45–65% of the card, and optional metadata footer. For card families, vary the internal diagram but keep outer dimensions, padding, borders, and type scale consistent.

## Texture and depth

Use subtle dotted grids only on light cards:

```css
background-image:
  linear-gradient(to bottom,
    rgba(255,253,248,.08),
    rgba(255,253,248,.30) 34%,
    rgba(255,253,248,.82) 65%,
    var(--surface-secondary)),
  radial-gradient(rgba(98,95,88,.24) .6px, transparent .7px);
background-size: 100% 100%, 12px 12px;
```

Fade dots most strongly where interface artwork is dense. Avoid noise behind body copy.

## Micro-interface vocabulary

Prefer labels such as Received, Classified, Structured, Supplier matched, Totals checked, Approval missing, Complete, In review, Waiting, Queued, Review-ready, Evidence attached, Material exception, Owner, Blocker, AP review, Posting, and Month-end workpaper.

Use invented non-sensitive values. Avoid real customers and unsupported metrics.

## Responsive patterns

- Convert card families to one column below the existing tablet breakpoint.
- Convert horizontal workflows into vertical stacks on narrow screens and hide redundant decorative arrows.
- Keep interface labels at 8–12px and subsection titles on existing type tokens.
- Reduce padding before shrinking elements below legibility.
- Combine `width:min(...,100%)` with `min-width:0`.

## Anti-patterns

Avoid generic feature icons as the entire visual, floating glass cards without relationships, excessive texture, decorative charts with meaningless data, tiny paragraphs inside illustrations, blue-purple gradients, neon glows, inconsistent styles, and imagery suggesting full autonomy.
