# Design system

Reference for styling decisions, tokens, and component conventions in this portfolio.

---

## Color tokens

Defined in `src/styles/global.css` via Tailwind's `@theme` block.

| Variable | Value | Usage |
|---|---|---|
| `--color-off-black` | `#232323` | Body text, headings |
| `--color-dark-grey` | `#383838` | Secondary body text, paragraph text |
| `--color-grey` | `#6b6b6b` | Muted text, labels, captions |
| `--color-light-grey` | `#cecec9` | Decorative underlines, placeholder borders |
| `--color-off-white` | `#fafafa` | Card backgrounds, image panel backgrounds |
| `--color-bg` | `#ffffff` | Page background |
| `--color-border` | `#E4E2DA` | Dividers, card outlines |

### Aliases (in `:root`)
These map legacy variable names used in components to the tokens above.

| Variable | Maps to |
|---|---|
| `--color-muted` | `--color-grey` |
| `--color-surface` | `--color-off-white` |
| `--color-white` | `#ffffff` |

---

## Typography

Font: **Inter** — loaded from Google Fonts. Weights used: 300 (body), 400 (medium), 500 (bold — used sparingly for labels/caps only).

Type scale follows Tailwind defaults. Common pairings:

| Use | Size | Weight | Tracking |
|---|---|---|---|
| Hero headline | `text-3xl lg:text-5xl` | 400 | `-0.03em` |
| Section title | `text-2xl` | 400 | `-0.025em` |
| Body | `text-base` / `text-lg` | 300 | — |
| Label / eyebrow | `text-xs` | 500 | `0.08em` uppercase |
| Caption | `0.8rem` | 300 | — |

---

## Layout

Two width tokens control the layout grid:

| Variable | Value | Usage |
|---|---|---|
| `--max-width` | `1000px` | Full-width page sections, nav, footer |
| `--content-width` | `680px` | Prose content inside case studies |

Use `cs-container` in `global.css` for sections that need `--max-width` centred with `margin: 0 auto`.

---

## Styling approach

Three tools, one job each:

### `style=""` — runtime dynamic values only
Use inline styles **only** when the value comes from a prop at runtime and can't be expressed as a static class:
```astro
<!-- Correct — coverColor is a runtime prop -->
<section style={`background-color: ${coverColor}`}>
<span style={`background: ${statusData.color}`}>


