# Codex handoff

## Current state

The Pedanyan School MVP is implemented as a standalone Vite + React application for `school.pedanyan.com`. The application is intentionally frontend-complete and uses local demo content until its Supabase data queries are connected.

Do not add a mentor or admin cabinet during the MVP phase. Supabase Studio is the temporary operational admin layer.

## Run and verify

```bash
npm install
npm run dev
npm run build
```

When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are absent, the login page clearly identifies demo mode. Use `student@pedanyan.com` and `demo` to enter the student cabinet.

## Implemented routes

### Public

- `/`
- `/courses`
- `/courses/product-design-intensive`
- `/method`
- `/about`
- `/apply`
- `/login`

### Student cabinet

- `/cabinet`
- `/cabinet/course`
- `/cabinet/lesson/:id`
- `/cabinet/assignments`
- `/cabinet/resources`
- `/cabinet/progress`

## Important files

- `AI_CONTEXT_SCHOOL.md`: enduring product, design, and architecture decisions.
- `src/App.jsx`: route components and application shell.
- `src/styles.css`: shared public and cabinet design system.
- `src/data.js`: demo course, lesson, assignment, and skill data.
- `src/lib/supabase.js`: environment-aware Supabase client.
- `supabase/schema.sql`: initial schema, profile trigger, and student RLS policies.
- `docs/DEPLOYMENT.md`: local, Supabase, hosting, and domain setup.

## Production follow-up

Before enabling real students, add protected routing and replace demo content with Supabase queries. Store recordings and materials in private Storage buckets using signed URLs. Connect the application form to a protected endpoint with abuse prevention. Keep all service-role credentials server-side.
