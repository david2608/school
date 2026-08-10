-- Pedanyan School MVP schema. Run in a new Supabase project's SQL editor.
create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  role text not null default 'student' check (role in ('student','mentor','admin')),
  created_at timestamptz not null default now()
);
create table public.courses (
  id uuid primary key default gen_random_uuid(), slug text unique not null,
  title text not null, summary text, published boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.modules (
  id uuid primary key default gen_random_uuid(), course_id uuid not null references public.courses on delete cascade,
  title text not null, position int not null, published boolean not null default false
);
create table public.lessons (
  id uuid primary key default gen_random_uuid(), module_id uuid not null references public.modules on delete cascade,
  slug text unique not null, title text not null, description text, video_url text,
  recording_url text, slides_url text, position int not null, required boolean not null default true,
  published boolean not null default false
);
create table public.resources (
  id uuid primary key default gen_random_uuid(), lesson_id uuid references public.lessons on delete cascade,
  course_id uuid references public.courses on delete cascade, title text not null,
  kind text not null check(kind in ('external','file','slides','recording','video')),
  url text, storage_path text, created_at timestamptz not null default now(),
  check(url is not null or storage_path is not null)
);
create table public.enrollments (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles on delete cascade,
  course_id uuid not null references public.courses on delete cascade, cohort text,
  enrolled_at timestamptz not null default now(), unique(user_id,course_id)
);
create table public.lesson_progress (
  user_id uuid not null references public.profiles on delete cascade,
  lesson_id uuid not null references public.lessons on delete cascade,
  completed_at timestamptz, watched_seconds int not null default 0,
  primary key(user_id,lesson_id)
);
create table public.assignments (
  id uuid primary key default gen_random_uuid(), course_id uuid not null references public.courses on delete cascade,
  lesson_id uuid references public.lessons on delete set null, title text not null,
  brief text, due_at timestamptz, position int not null, required boolean not null default true
);
create table public.submissions (
  id uuid primary key default gen_random_uuid(), assignment_id uuid not null references public.assignments on delete cascade,
  user_id uuid not null references public.profiles on delete cascade, content text, file_url text,
  status text not null default 'draft' check(status in ('draft','submitted','reviewed')),
  mark numeric(4,2) check(mark between 0 and 10), feedback text,
  submitted_at timestamptz, reviewed_at timestamptz, unique(assignment_id,user_id)
);
create table public.skill_scores (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles on delete cascade,
  course_id uuid not null references public.courses on delete cascade, skill text not null,
  score int not null check(score between 0 and 100), updated_at timestamptz not null default now(),
  unique(user_id,course_id,skill)
);
create table public.applications (
  id uuid primary key default gen_random_uuid(), name text not null check(char_length(name) between 2 and 120),
  email text not null check(char_length(email) between 5 and 254), current_role text,
  portfolio_url text, growth_goal text not null check(char_length(growth_goal) between 10 and 3000),
  created_at timestamptz not null default now(),
  status text not null default 'new' check(status in ('new','reviewing','accepted','declined','waitlisted'))
);

create index modules_course_position_idx on public.modules(course_id,position);
create index lessons_module_position_idx on public.lessons(module_id,position);
create index resources_course_idx on public.resources(course_id);
create index resources_lesson_idx on public.resources(lesson_id);
create index enrollments_user_idx on public.enrollments(user_id);
create index assignments_course_position_idx on public.assignments(course_id,position);
create index submissions_user_idx on public.submissions(user_id);
create index applications_created_at_idx on public.applications(created_at desc);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.resources enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.skill_scores enable row level security;
alter table public.applications enable row level security;

create policy "public reads published courses" on public.courses for select using (published or auth.uid() is not null);
create policy "students read enrolled modules" on public.modules for select using (published and exists(select 1 from public.enrollments e where e.course_id=modules.course_id and e.user_id=auth.uid()));
create policy "students read enrolled lessons" on public.lessons for select using (published and exists(select 1 from public.modules m join public.enrollments e on e.course_id=m.course_id where m.id=lessons.module_id and e.user_id=auth.uid()));
create policy "students read enrolled resources" on public.resources for select using (exists(select 1 from public.enrollments e where e.course_id=resources.course_id and e.user_id=auth.uid()));
create policy "users read own profile" on public.profiles for select using (id=auth.uid());
create policy "users update own profile" on public.profiles for update using (id=auth.uid());
create policy "users read own enrollments" on public.enrollments for select using (user_id=auth.uid());
create policy "users manage own progress" on public.lesson_progress for all using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "students read enrolled assignments" on public.assignments for select using (exists(select 1 from public.enrollments e where e.course_id=assignments.course_id and e.user_id=auth.uid()));
create policy "users read own submissions" on public.submissions for select using (user_id=auth.uid());
create policy "users create own submissions" on public.submissions for insert with check (user_id=auth.uid());
create policy "users update unreviewed submissions" on public.submissions for update using (user_id=auth.uid() and status <> 'reviewed');
create policy "users read own scores" on public.skill_scores for select using (user_id=auth.uid());
create policy "public submits applications" on public.applications for insert to anon,authenticated
with check (
  status='new' and char_length(name) between 2 and 120 and
  char_length(email) between 5 and 254 and char_length(growth_goal) between 10 and 3000
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,full_name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name','Student')); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
