# Bawra Skill House certificate template

Open `index.html` in Chrome or Edge. No installation or internet connection is required. Edit the four fields, then use **Print / Save PDF**. Choose A4 landscape, no margins, and disable browser headers/footers. The delivered single-file `Bawra-Certificate.html` also works independently of this folder.

## Design

The decorative master was extracted from your original PDF after removing its text objects. It preserves the original logo, signature, ribbon, gold seal, laurel, background and rules. It contains no old student name, course, duration or date. The seal's circular lettering is part of the decorative artwork.

All other text is a separate SVG text layer within HTML/CSS, so it stays selectable and sharp in PDF output. The reference's Roboto/Roboto Slab typefaces and glyph coordinates are retained. Complete Latin Roboto fonts replace the PDF's incomplete Roboto subsets, so new names and numbers render correctly. Duration/date use Roboto Bold in place of the source's limited Creato Display subset; these two fields may differ slightly in glyph shape. The artwork is approximately 300 dpi at A4.

One coordinate system, `841.68 × 595.2`, is preserved. The preview scales the whole composition. It never rearranges individual elements. PDF paper size is exact A4, 297 × 210 mm; the source PDF ratio differs from exact A4 by less than 0.02%.

## Files

- `index.html`: editable standalone demo.
- `certificate-fragment.html`: certificate markup only, without controls.
- `certificate.css`: scoped certificate styles and embedded-font declarations.
- `styles.css`: standalone demo layout and print styles. Do not import this entire file into your admin panel because it intentionally styles the demo page.
- `certificate.js`: reusable data-binding module, exposed as `window.BawraCertificate`.
- `BawraCertificate.jsx`: React + Vite integration example.
- `assets/`: original artwork and fonts. Keep the font paths valid when copying.
- `ANTIGRAVITY-PROMPT.txt`: integration instructions.

## Existing admin integration

Insert the trusted `certificate-fragment.html` markup, load `certificate.css` and `certificate.js`, then:

```js
const certificate = window.BawraCertificate.mount(container.querySelector('.bsh-certificate'));
await certificate.update({
  studentName: selectedStudent.name,
  courseName: selectedStudent.course,
  duration: '45 DAYS',
  issueDate: '2026-10-01' // ISO date or DD/MM/YYYY
});
await certificate.ready;
```

Field changes use `textContent`, not HTML injection. Long names and course titles shrink to fit one line. This template is intended for Latin-script names, matching the reference. Empty values should be validated in the host application's form before issuing a certificate. Extreme lengths remain on one line but can become too small for practical printing.

The React example targets Vite's `?raw` import support. Adapt imports for other build systems. Render it in an isolated print route/window when exporting from your existing admin panel, so navigation, tables and other admin UI cannot enter the print output. For automated server export, await fonts, images, and `certificate.ready`, then use Chromium PDF with `preferCSSPageSize: true`, `printBackground: true`, and `displayHeaderFooter: false`.

No Firebase integration, issuance metadata, certificate number generation, verification endpoint or WhatsApp changes are included. Map the existing selected-student record in your project; the provided demo does not read or modify a database. The example date and name reproduce your supplied reference; set the correct issue date for each issued certificate.
