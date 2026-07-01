# Portfolio — Astro

A minimal product design portfolio built with [Astro](https://astro.build).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Project structure

```
src/
├── layouts/
│   ├── BaseLayout.astro       # Site shell (nav, footer)
│   └── CaseStudyLayout.astro  # Case study page wrapper
├── components/
│   └── WorkCard.astro         # Work grid card
├── pages/
│   ├── index.astro            # Homepage (work listing)
│   ├── about.astro            # About page
│   └── work/
│       └── onboarding-redesign.astro  # Example case study
└── styles/
    └── global.css             # Design tokens + base styles
```

## Adding a case study

1. Create `src/pages/work/your-case-study.astro`
2. Use `CaseStudyLayout` and fill in the frontmatter props:

```astro
---
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
---

<CaseStudyLayout
  title="Your Case Study Title"
  description="One-line summary shown in the header."
  year="2024"
  role="Lead Product Designer"
  tags={['Product Design', 'Research']}
  coverColor="#E2DEE8"
>
  <!-- Your content here -->
</CaseStudyLayout>
```

3. Add it to the `works` array in `src/pages/index.astro`

## Available content components

Use these class names directly in case study content:

```html
<!-- Outcome stats row -->
<div class="stat-row">
  <div class="stat">
    <span class="stat-number">40%</span>
    <span class="stat-label">Drop-off reduction</span>
  </div>
</div>

<!-- Image with caption -->
<div class="image-block">
  <img src="/images/your-image.png" alt="Description" />
</div>
<p class="image-caption">Caption text here</p>

<!-- Pull quote (use a blockquote) -->
<blockquote>Something insightful a user said.</blockquote>
```

## Customising

- **Colours & fonts**: `src/styles/global.css` — update CSS variables at the top
- **Your name & links**: `src/layouts/BaseLayout.astro`
- **Hero text**: `src/pages/index.astro`
- **Bio**: `src/pages/about.astro`
- **Favicon**: `public/favicon.svg`
