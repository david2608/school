# Pedanyan School — project context

## Product decision

This repository is the standalone website for `school.pedanyan.com`. It is part of the wider Pedanyan personal brand, but School has its own focused public conversion journey and learning product.

MVP includes:

- Public pages: Home, Courses, dynamic Course detail, Method, About, Apply, Login.
- Student cabinet: overview, course/module/lesson navigation, recordings, slides and resources, assignments, feedback/marks, and skill progress.
- Supabase as the temporary backend and operational admin layer.

Explicitly out of scope for MVP: a mentor cabinet, admin cabinet, payments, chat/community, certificates, and a custom CMS. Manage data through Supabase until operational needs justify a dedicated admin product.

## Experience and visual language

The design is editorial, direct, and practice-focused: warm paper, near-black ink, deep green, and a sharp lime accent. Manrope handles utility and interface copy; Georgia provides the human editorial contrast; DM Mono marks metadata. Maintain large confident type, strong spacing, thin rules, and minimal effects. Avoid generic course-marketplace patterns and decorative UI.

All new or materially revised user-visible copy follows the persistent system in `brand/`. Repository skills live at `.agents/skills/pedanyan-brand-voice/` and `.agents/skills/pedanyan-content-editor/`; root `AGENTS.md` defines when to use them. `brand/FACTS.md` is the whitelist for factual marketing claims. Do not invent facts or present placeholder testimonials as real.

## Architecture

- Vite + React SPA; React Router owns routes.
- The product hierarchy is School → Courses → Course → Modules → Lessons → Resources/Assignments → Progress. Never hardcode the platform around one course.
- Public course details resolve at `/courses/:slug`; the first course is `/courses/ai-design`.
- `src/data.js` exports `courses` plus a temporary `course` alias for the current demo course. Supabase enrollments remain many-per-student.
- `src/lib/auth.jsx` owns live session state and `src/lib/student.jsx` owns the shared student experience.
- `src/lib/api.js` is the single Supabase query/mutation layer.
- `src/data.js` remains the complete demo fallback content source.
- `src/lib/supabase.js` creates a client only when both Vite environment values exist.
- With credentials absent, login deliberately enters demo mode so every route is reviewable.
- With credentials present, cabinet routes require Auth and load profile, enrollment, course, lessons, progress, resources, assignments, submissions, marks, and feedback from Supabase.
- Lessons are slide-first. The slide deck is the primary learning surface; recordings are optional secondary material rather than the default lesson body.
- Course completion combines required completed lessons and required submitted assignments. Skill scores are separate and hidden in live mode when absent.
- `supabase/schema.sql` defines the relational model, public application insert, and student-scoped RLS. `supabase/seed.sql` creates one test journey.

## Current course source

The first course is **AI Design**: “Learn AI Design from scratch,” lasting four months. Its current 44-lesson design-foundation curriculum comes from the original [UX/UI A→Z Figma course](https://www.figma.com/design/JT3I5vhyZPeiY7lVCUvhni/UX-UI-A-%3EZ-Course---Apr--2025). The source curriculum covers UX, UI, Figma, prototyping, testing, product thinking, delivery, and career foundations.

The reusable course portal source lives at `/Users/davit/Documents/Codex/Product designer course`. Its `index.html` contains populated HTML slide decks, resources, homework, and quizzes for Lessons 1–4; `media/lesson-01` contains extracted Figma assets. A viewer-only copy is integrated under `public/course-content/` and embedded by lesson number in the student cabinet. Lessons 1–3 are Figma-derived; Lesson 4 was authored in the earlier portal and should be treated as draft content.

AI-specific curriculum expansion has not been defined yet. Do not silently invent AI-specific lesson titles; additions require an explicit follow-up source or product decision.

## Next implementation steps

Continue importing approved Figma decks into the reusable slide content model, then configure the first Supabase project and add rate limiting at the edge if application spam becomes material. The student MVP is real; mentor/admin operations remain in Supabase Studio.
