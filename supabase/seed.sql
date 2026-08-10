-- Demo course seed. Run schema.sql first, create student@pedanyan.com in Auth,
-- then run this file. Safe to rerun for the fixed demo course IDs below.
insert into public.courses(id,slug,title,summary,published) values
('10000000-0000-0000-0000-000000000001','product-design-intensive','Product Design Intensive','A rigorous, practice-led product design program.',true)
on conflict(id) do update set title=excluded.title,summary=excluded.summary,published=true;

insert into public.modules(id,course_id,title,position,published) values
('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','Product thinking',1,true),
('20000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001','Interaction foundations',2,true)
on conflict(id) do update set title=excluded.title,position=excluded.position,published=true;

insert into public.lessons(id,module_id,slug,title,description,recording_url,slides_url,position,required,published) values
('30000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000001','problem-framing','Framing the right problem','Turn an ambiguous brief into a focused, testable product question.','https://example.com/demo-recording','https://example.com/demo-slides',1,true,true),
('30000000-0000-0000-0000-000000000002','20000000-0000-0000-0000-000000000002','flows','Flows before screens','Map user intent, system responses, and edge cases before visual design.','https://example.com/demo-recording','https://example.com/demo-slides',1,true,true)
on conflict(id) do update set title=excluded.title,description=excluded.description,published=true;

insert into public.resources(id,lesson_id,course_id,title,kind,url) values
('40000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001','Flow mapping worksheet','file','https://example.com/demo-worksheet.pdf')
on conflict(id) do update set title=excluded.title,url=excluded.url;

insert into public.assignments(id,course_id,lesson_id,title,brief,due_at,position,required) values
('50000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000002','Core user flow','Share a public Figma prototype URL and briefly explain the most important trade-off you made.',now()+interval '14 days',1,true)
on conflict(id) do update set title=excluded.title,brief=excluded.brief,due_at=excluded.due_at;

do $$
declare student_id uuid;
begin
  select id into student_id from auth.users where email='student@pedanyan.com' limit 1;
  if student_id is not null then
    insert into public.enrollments(user_id,course_id,cohort)
    values(student_id,'10000000-0000-0000-0000-000000000001','03')
    on conflict(user_id,course_id) do update set cohort='03';
  else
    raise notice 'Create student@pedanyan.com in Supabase Auth, then rerun seed.sql to enroll it.';
  end if;
end $$;
