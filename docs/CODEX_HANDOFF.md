# Codex handoff

## Current state

The Pedanyan School MVP is a standalone Vite + React application for `school.pedanyan.com`. With Supabase configured, its first complete student journey is live: authentication, enrolled curriculum, lesson resources/completion, computed progress, assignment submission/resubmission, and reviewed marks/feedback. Public applications persist to Supabase.

Do not add a mentor or admin cabinet during the MVP phase. Supabase Studio is the temporary operational admin layer.

## Run and verify

```bash
npm install
npm run dev
npm run build
```

When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are absent, the login page clearly identifies demo mode. Use `student@pedanyan.com` and `demo`. Demo course content and skill scores remain in `src/data.js`; live users never see demo skill scores when no database values exist.

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
- `src/lib/auth.jsx`: persisted session, login/logout, and password reset.
- `src/lib/api.js`: all database reads and writes.
- `src/lib/student.jsx`: shared loading/error/data state and mutations.
- `supabase/schema.sql`: initial schema, profile trigger, and student RLS policies.
- `supabase/seed.sql`: realistic sample course and optional test-student enrollment.
- `docs/DEPLOYMENT.md`: local, Supabase, hosting, and domain setup.

## Production follow-up

Before launch, replace seed URLs, review Supabase Auth redirect URLs, and optionally create a private `course-materials` Storage bucket. Resources with `storage_path` already request one-hour signed URLs. Add edge rate limiting if the application-form honeypot and database constraints are insufficient. Keep all service-role credentials server-side.
