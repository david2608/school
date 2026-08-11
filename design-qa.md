# Login image carousel design QA

- Source visual truth: `/var/folders/yp/bw0jgw793lb4qbqxpygwzxnc0000gn/T/codex-clipboard-bf2365f6-6f4b-4bdb-acbe-e578ef21a74d.png`
- Implementation evidence: `design-qa-implementation.png`
- Route/state: `/login`, demo mode, first testimonial
- Desktop viewport: 1280 × 720 CSS px at 1× density
- Source pixels: 3340 × 2004; implementation pixels: 1280 × 720
- Normalization: compared as full-width desktop compositions, aligning the two-column frame and image-panel proportions rather than pixel-matching the reference product's typography or branding.

**Full-view comparison evidence**

- The implementation preserves the reference's dominant rounded, full-bleed editorial image panel and quieter authentication column.
- The image panel occupies approximately 58% of the desktop width, with quote, identity, progress, and navigation layered in a darker lower region.
- Pedanyan typography, forest/lime palette, form controls, and authentication behavior remain product-specific rather than copying the reference branding.

**Focused region comparison evidence**

- Image crop: the face remains legible above the quote and the lower third has sufficient contrast for white type.
- Carousel controls: pagination and circular previous/next controls remain visible and keyboard accessible.
- Authentication: headings, fields, reset action, demo notice, and submit button remain unobstructed in the right column.

**Required fidelity surfaces**

- Fonts and typography: Pedanyan display serif/sans hierarchy is preserved; quote scale is reduced from the earlier text-only panel to fit the image-led composition.
- Spacing and layout rhythm: 24 px outer frame, 28 px image radius, 58/42 split, and restrained column gap align with the reference proportions.
- Colors and visual tokens: existing forest, lime, paper, and ink tokens remain dominant; the neutral page field supports the photographic panel.
- Image quality and asset fidelity: three generated, fictional editorial portraits use consistent light, palette, crop, and grain; optimized JPEGs total about 650 KB.
- Copy and content: all stories and identities remain explicitly marked as development placeholders with no real achievement claims.

**Comparison history**

- Initial mobile pass found a P2 horizontal overflow: the desktop grid retained a 420 px minimum at a 390 px viewport.
- Fix: reset the mobile grid to one column at `max-width: 900px`.
- Post-fix evidence: page width and viewport both measure 390 px; auth is first and 390 px wide; the carousel follows at 390 × 600 px.

**Findings**

- No remaining P0, P1, or P2 findings.

**Follow-up polish**

- P3: replace fictional portraits and placeholder copy together once approved real student stories and image permissions are available.

**Primary interactions tested**

- Carousel pagination and previous/next controls are present and accessible.
- Login fields, forgot-password action, demo notice, submit action, and back link remain present.
- Desktop and 390 px mobile layouts render without overflow after the breakpoint fix.

**Console**

- No new runtime error was observed during the login-page verification.

final result: passed
