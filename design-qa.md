# Application testimonial carousel design QA

- Source visual truth: `/var/folders/yp/bw0jgw793lb4qbqxpygwzxnc0000gn/T/codex-clipboard-bf2365f6-6f4b-4bdb-acbe-e578ef21a74d.png`
- Desktop implementation: `design-audit/08-apply-carousel-desktop.png`
- Mobile implementation: `design-audit/09-apply-carousel-mobile.png`
- Side-by-side comparison: `design-audit/10-apply-reference-comparison.png`
- Route/state: `/apply`, first placeholder story, empty application form
- Desktop viewport: 1280 × 720 CSS px at 1× density
- Mobile viewport: 390 × 844 CSS px at 1× density; full-page capture is 390 × 1538 px
- Source pixels: 3340 × 2004; desktop implementation pixels: 1280 × 720
- Normalization: compared as full-width two-column conversion compositions. The reference supplies layout and interaction direction only; Pedanyan typography, imagery, colors, copy, and form behavior intentionally remain product-specific.

**Full-view comparison evidence**

- `design-audit/10-apply-reference-comparison.png` places the visual source and implementation in one comparison frame.
- Both use a dominant, rounded editorial story panel on the left and a quieter conversion form on the right.
- The Pedanyan implementation uses the application form rather than copying the reference sign-up fields or third-party login options.
- The desktop canvas remains one viewport; only the longer form panel scrolls when necessary, while the story remains stable.

**Focused region comparison evidence**

- Story panel: real raster portrait, dark lower treatment, quote, placeholder identity, pagination, and previous/next controls remain readable and visually grouped.
- Application panel: brand, course context, heading, supporting copy, required fields, and submit action retain a calm hierarchy.
- Login: the carousel is absent from `/login`; the authentication, reset, recovery, and demo-mode controls remain in the existing auth component.

**Required fidelity surfaces**

- Fonts and typography: Manrope, Georgia, and DM Mono retain the Pedanyan editorial hierarchy; the application headline is the primary conversion message.
- Spacing and layout rhythm: desktop uses a 24 px outer frame and a 56/44 composition; mobile puts the application first and the story below.
- Colors and visual tokens: paper, ink, forest, lime, and restrained rules remain consistent; the reference's blue SaaS styling was not copied.
- Image quality and asset fidelity: the existing optimized editorial portraits are reused at full-bleed scale with stable crops and no placeholder boxes.
- Copy and content: testimonial identities and claims remain explicitly identified as development placeholders. Application copy and fields are unchanged in meaning.

**Comparison history**

- P2: the first application layout allowed the taller form to stretch the carousel and the document beyond the desktop viewport. Fixed by constraining the desktop composition to `100svh`, keeping the story stable, and allowing only the application panel to scroll. Post-fix evidence: `design-audit/08-apply-carousel-desktop.png`.
- P2: placing the story before the form on mobile would compete with the primary conversion task. Fixed by ordering the application first and the carousel second below 900 px. Post-fix evidence: `design-audit/09-apply-carousel-mobile.png`; form top is 0 px and carousel top is 938.56 px.

**Findings**

- No remaining P0, P1, or P2 findings.

**Primary interactions tested**

- Next-story control resolves uniquely and advances the carousel.
- The application form remains present with its existing submission handler.
- `/login` contains the authentication panel and no testimonial carousel.
- Desktop and 390 px mobile render without horizontal overflow.

**Console**

- No runtime errors observed on `/apply` or `/login` during desktop/mobile verification.

final result: passed
