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
3. Create a user through Supabase Auth. The database trigger creates its profile.
4. Insert a course, modules, lessons, and an enrollment through Supabase Studio.

The current client uses Supabase for real login when configured. Content remains the demo model until the query layer is connected. Never put the service-role key in frontend environment variables.

## Hosting and domain

Build command: `npm run build`; output directory: `dist`. Configure SPA fallback so all paths serve `index.html`. On Vercel, the included `vercel.json` supplies this rewrite. Add `school.pedanyan.com` to the hosting project, then add the requested DNS record at the domain provider. Configure the final origin in Supabase Auth URL settings before enabling production login.
