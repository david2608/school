# Deployment

## Local

```bash
npm install
npm run dev
```

Without environment values, the site runs in demo mode. Use `student@pedanyan.com` / `demo` on the login screen.

## Supabase

1. Create a project and run `supabase/schema.sql` in the SQL editor.
2. Copy `.env.example` to `.env.local` and set the project URL and anonymous key.
3. In Authentication → Users, create `student@pedanyan.com` (or the first real student). The database trigger creates its profile; set `full_name` in Table Editor if needed.
4. Run `supabase/seed.sql` after creating the demo student. It creates a sample course, modules, lessons, resource, assignment, and enrollment.
5. For a real student, add an `enrollments` row using the profile/user ID, course ID, and cohort.

Add content through Table Editor: create modules and lessons with increasing `position`; create resources using an external `url` or private `storage_path`; create assignments with instructions in `brief`. Students may update submissions until their status is `reviewed`. To grade, open the student's `submissions` row and set `status=reviewed`, `mark`, `feedback`, and `reviewed_at`.

Optional private files: create a private Storage bucket named `course-materials`, upload files, and put each object path in `resources.storage_path`. The app creates a one-hour signed URL. Add Storage policies granting enrolled students read access before using this in production.

Applications appear in the `applications` table and are insert-only for public users. Manage their status through Table Editor. Never put the service-role key in frontend environment variables.

In Authentication → URL Configuration, add the deployed origin and `/login` redirect. The anonymous key is intended for the browser; RLS is the security boundary.

## Hosting and domain

Build command: `npm run build`; output directory: `dist`. Configure SPA fallback so all paths serve `index.html`. On Vercel, the included `vercel.json` supplies this rewrite. Add `school.pedanyan.com` to the hosting project, then add the requested DNS record at the domain provider. Configure the final origin in Supabase Auth URL settings before enabling production login.
