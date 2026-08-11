# Pedanyan Fact Whitelist

Use this file as the source of truth for factual marketing claims. If a fact is absent, verify it in a named project source before using it, then update this file with that source.

## Confirmed

| Fact | Approved wording | Source |
| --- | --- | --- |
| School name | Pedanyan Design School | `AI_CONTEXT_SCHOOL.md` |
| Current course | AI Design | `AI_CONTEXT_SCHOOL.md`, `src/data.js` |
| Course duration | 4 months | `AI_CONTEXT_SCHOOL.md`, `src/data.js` |
| Positioning | Learn AI Design from scratch | `AI_CONTEXT_SCHOOL.md` |
| Foundation curriculum | The current detailed design-foundation curriculum contains 44 UX/UI lessons | `AI_CONTEXT_SCHOOL.md`, `docs/CODEX_HANDOFF.md`, `supabase/seed.sql` |
| Platform model | The architecture supports multiple courses | `AI_CONTEXT_SCHOOL.md`, `src/data.js`, database schema |
| Course order | AI Design is course #1; it is not the platform itself | `AI_CONTEXT_SCHOOL.md` |

## Curriculum source

The detailed design-foundation curriculum comes from:

https://www.figma.com/design/JT3I5vhyZPeiY7lVCUvhni/UX-UI-A-%3EZ-Course---Apr--2025

The source covers UX, UI, Figma, prototyping, testing, product thinking, delivery, and career foundations. Source: `AI_CONTEXT_SCHOOL.md`.

## Requires confirmation

Do not publish claims about these items until Davit confirms them or a verified project source records them:

- course start date
- salary outcomes
- employment percentages
- student testimonials
- cohort number
- student count
- company partnerships
- certificates
- completion or career results
- teaching start year or total teaching hours
- any other statistic

Placeholder testimonials in the current product are development content. Do not present their identities, roles, employers, or outcomes as real.

## Updating facts

- Record the exact source beside every added fact.
- Update time-based claims only when the source includes a confirmed start date or year.
- Do not extrapolate counts from old sources.
- Write around unknown information or mark it for confirmation.
