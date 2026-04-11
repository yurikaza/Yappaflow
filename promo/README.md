# Yappaflow Promotional Website — Squarespace Deployment

## Local Preview

```bash
# From the repo root:
npx live-server promo --port=5500 --entry-file=preview.html
```

Open `http://localhost:5500` to see the full page.

## Squarespace Deployment

### 1. Custom CSS
Go to **Design > Custom CSS** and paste the contents of these files (in order):
1. `css/variables.css`
2. `css/base.css`
3. `css/animations.css`
4. `css/hero.css`
5. `css/showcase.css`
6. `css/ecosystem.css`
7. `css/footer-cta.css`
8. `css/responsive.css`

### 2. Code Injection — Header
Go to **Settings > Advanced > Code Injection > Header** and add:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<meta name="description" content="Yappaflow — AI-powered web agency. From conversation to code, automatically.">
```

### 3. Code Injection — Footer
Go to **Settings > Advanced > Code Injection > Footer** and paste all JS files wrapped in `<script>` tags:
1. `js/intersection-observer.js`
2. `js/voice-wave.js`
3. `js/typewriter.js`
4. `js/code-generator.js`
5. `js/waitlist-form.js`

### 4. Page Setup
1. Create a new **Blank Page**
2. Add 4 **Code Blocks** in order:
   - Paste `sections/01-hero.html`
   - Paste `sections/02-showcase.html`
   - Paste `sections/03-ecosystem.html`
   - Paste `sections/04-footer-cta.html`
3. Wrap all Code Blocks inside a container `<div class="yf-promo-wrapper">...</div>`

### 5. Squarespace Settings
- Set page background to `#0A0A0A` (or true black)
- Disable the default site header/footer for this page if desired
- Configure Squarespace's built-in form to capture waitlist emails from the Marketing panel

## File Structure
```
promo/
  preview.html          — Local development preview
  README.md             — This file
  css/                  — Stylesheets (8 files)
  js/                   — Scripts (5 files)
  sections/             — HTML code blocks (4 files)
```

## Email Capture
The waitlist form currently stores emails to `localStorage` as a placeholder. In Squarespace production, replace the form handler in `waitlist-form.js` with Squarespace's native Newsletter Block endpoint (`/api/form/FormSubmission`).
