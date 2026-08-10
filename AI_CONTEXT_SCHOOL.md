# Pedanyan School — project context

## Product decision

This repository is the standalone website for `school.pedanyan.com`. It is part of the wider Pedanyan personal brand, but School has its own focused public conversion journey and learning product.

MVP includes:

- Public pages: Home, Courses, Product Design Intensive, Method, About, Apply, Login.
- Student cabinet: overview, course/module/lesson navigation, recordings, slides and resources, assignments, feedback/marks, and skill progress.
- Supabase as the temporary backend and operational admin layer.

Explicitly out of scope for MVP: a mentor cabinet, admin cabinet, payments, chat/community, certificates, and a custom CMS. Manage data through Supabase until operational needs justify a dedicated admin product.

## Experience and visual language

The design is editorial, direct, and practice-focused: warm paper, near-black ink, deep green, and a sharp lime accent. Manrope handles utility and interface copy; Georgia provides the human editorial contrast; DM Mono marks metadata. Maintain large confident type, strong spacing, thin rules, and minimal effects. Avoid generic course-marketplace patterns and decorative UI.

## Architecture

- Vite + React SPA; React Router owns routes.
- `src/data.js` is the complete demo content source.
- `src/lib/supabase.js` creates a client only when both Vite environment values exist.
- With credentials absent, login deliberately enters demo mode so every route is reviewable.
- `supabase/schema.sql` defines the initial relational model and student-scoped RLS.

## Next implementation steps

Replace demo data route by route, beginning with auth/session handling, enrollment/course queries, and progress mutations. Add a protected-route wrapper when production auth is enabled. Upload private lesson files to Supabase Storage and issue signed URLs rather than storing public URLs. Applications currently acknowledge locally; wire the form to a protected Edge Function or a dedicated table with anti-spam protection before launch.
