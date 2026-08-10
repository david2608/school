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
- `src/lib/auth.jsx` owns live session state and `src/lib/student.jsx` owns the shared student experience.
- `src/lib/api.js` is the single Supabase query/mutation layer.
- `src/data.js` remains the complete demo fallback content source.
- `src/lib/supabase.js` creates a client only when both Vite environment values exist.
- With credentials absent, login deliberately enters demo mode so every route is reviewable.
- With credentials present, cabinet routes require Auth and load profile, enrollment, course, lessons, progress, resources, assignments, submissions, marks, and feedback from Supabase.
- Course completion combines required completed lessons and required submitted assignments. Skill scores are separate and hidden in live mode when absent.
- `supabase/schema.sql` defines the relational model, public application insert, and student-scoped RLS. `supabase/seed.sql` creates one test journey.

## Next implementation steps

Configure the first Supabase project, replace seed URLs with real recordings/materials, and add rate limiting at the edge if application spam becomes material. The student MVP is real; mentor/admin operations remain in Supabase Studio.
