-- AI Design demo seed. Run schema.sql first, create student@pedanyan.com in Auth,
-- then run this file. Fixed IDs make it safe to rerun and migrate the old demo course.
insert into public.courses(id,slug,title,summary,published) values
('10000000-0000-0000-0000-000000000001','ai-design','AI Design','A four-month program for learning design from scratch through UX, UI, Figma, prototyping, testing, product thinking and delivery.',true)
on conflict(id) do update set slug=excluded.slug,title=excluded.title,summary=excluded.summary,published=true;

insert into public.modules(id,course_id,title,position,published) values
('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','Foundations & Research',1,true),
('20000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001','UI, Figma & Visual Systems',2,true),
('20000000-0000-0000-0000-000000000003','10000000-0000-0000-0000-000000000001','Product Design in Practice',3,true),
('20000000-0000-0000-0000-000000000004','10000000-0000-0000-0000-000000000001','Product Thinking, Delivery & Career',4,true)
on conflict(id) do update set title=excluded.title,position=excluded.position,published=true;

insert into public.lessons(id,module_id,slug,title,position,required,published) values
('30000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000001','intro-to-ux-design','Intro to UX Design',1,true,true),
('30000000-0000-0000-0000-000000000002','20000000-0000-0000-0000-000000000001','design-thinking','Design Thinking',2,true,true),
('30000000-0000-0000-0000-000000000003','20000000-0000-0000-0000-000000000001','ux-research','UX Research',3,true,true),
('30000000-0000-0000-0000-000000000004','20000000-0000-0000-0000-000000000001','user-research','User Research',4,true,true),
('30000000-0000-0000-0000-000000000005','20000000-0000-0000-0000-000000000001','empathy','Empathy',5,true,true),
('30000000-0000-0000-0000-000000000006','20000000-0000-0000-0000-000000000001','intro-to-personas','Intro to Personas',6,true,true),
('30000000-0000-0000-0000-000000000007','20000000-0000-0000-0000-000000000001','personas-workshop','Personas Workshop',7,true,true),
('30000000-0000-0000-0000-000000000008','20000000-0000-0000-0000-000000000001','competitor-analysis','Competitor Analysis',8,true,true),
('30000000-0000-0000-0000-000000000009','20000000-0000-0000-0000-000000000001','user-logic-map-and-user-flows','User Logic Map & User Flows',9,true,true),
('30000000-0000-0000-0000-000000000010','20000000-0000-0000-0000-000000000001','customer-journey-map','Customer Journey Map',10,true,true),
('30000000-0000-0000-0000-000000000011','20000000-0000-0000-0000-000000000001','customer-journey-map-workshop','Customer Journey Map Workshop',11,true,true),
('30000000-0000-0000-0000-000000000012','20000000-0000-0000-0000-000000000002','intro-to-ui','Intro to UI',1,true,true),
('30000000-0000-0000-0000-000000000013','20000000-0000-0000-0000-000000000002','ui-elements','UI Elements',2,true,true),
('30000000-0000-0000-0000-000000000014','20000000-0000-0000-0000-000000000002','layout-design-grid-systems-and-wireframes','Layout Design, Grid Systems & Wireframes',3,true,true),
('30000000-0000-0000-0000-000000000015','20000000-0000-0000-0000-000000000002','figma-and-figjam','Figma & FigJam',4,true,true),
('30000000-0000-0000-0000-000000000016','20000000-0000-0000-0000-000000000002','typography','Typography',5,true,true),
('30000000-0000-0000-0000-000000000017','20000000-0000-0000-0000-000000000002','color','Color',6,true,true),
('30000000-0000-0000-0000-000000000018','20000000-0000-0000-0000-000000000002','information-architecture','Information Architecture',7,true,true),
('30000000-0000-0000-0000-000000000019','20000000-0000-0000-0000-000000000002','ui-kits-and-figma','UI Kits & Figma',8,true,true),
('30000000-0000-0000-0000-000000000020','20000000-0000-0000-0000-000000000002','ui-kit-workshop','UI Kit Workshop',9,true,true),
('30000000-0000-0000-0000-000000000021','20000000-0000-0000-0000-000000000002','components','Components',10,true,true),
('30000000-0000-0000-0000-000000000022','20000000-0000-0000-0000-000000000002','high-fidelity-prototypes-and-micro-interactions','High-Fidelity Prototypes & Micro-Interactions',11,true,true),
('30000000-0000-0000-0000-000000000023','20000000-0000-0000-0000-000000000003','design-project-kick-off','Design Project Kick-off',1,true,true),
('30000000-0000-0000-0000-000000000024','20000000-0000-0000-0000-000000000003','landing-pages','Landing Pages',2,true,true),
('30000000-0000-0000-0000-000000000025','20000000-0000-0000-0000-000000000003','blog','Blog',3,true,true),
('30000000-0000-0000-0000-000000000026','20000000-0000-0000-0000-000000000003','ecommerce','eCommerce',4,true,true),
('30000000-0000-0000-0000-000000000027','20000000-0000-0000-0000-000000000003','admin-panel','Admin Panel',5,true,true),
('30000000-0000-0000-0000-000000000028','20000000-0000-0000-0000-000000000003','cross-platform-design','Cross-platform Design',6,true,true),
('30000000-0000-0000-0000-000000000029','20000000-0000-0000-0000-000000000003','mobile-ux','Mobile UX',7,true,true),
('30000000-0000-0000-0000-000000000030','20000000-0000-0000-0000-000000000003','design-resources','Design Resources',8,true,true),
('30000000-0000-0000-0000-000000000031','20000000-0000-0000-0000-000000000003','ux-laws','UX Laws',9,true,true),
('30000000-0000-0000-0000-000000000032','20000000-0000-0000-0000-000000000003','ideation-techniques','Ideation Techniques',10,true,true),
('30000000-0000-0000-0000-000000000033','20000000-0000-0000-0000-000000000003','testing','Testing',11,true,true),
('30000000-0000-0000-0000-000000000034','20000000-0000-0000-0000-000000000003','design-handoff','Design Handoff',12,true,true),
('30000000-0000-0000-0000-000000000035','20000000-0000-0000-0000-000000000004','building-a-case-study','Building a Case Study',1,true,true),
('30000000-0000-0000-0000-000000000036','20000000-0000-0000-0000-000000000004','hook-model-snp-and-dark-patterns','Hook Model, SNP & Dark Patterns',2,true,true),
('30000000-0000-0000-0000-000000000037','20000000-0000-0000-0000-000000000004','progress-check','Progress Check',3,true,true),
('30000000-0000-0000-0000-000000000038','20000000-0000-0000-0000-000000000004','interaction-design','Interaction Design',4,true,true),
('30000000-0000-0000-0000-000000000039','20000000-0000-0000-0000-000000000004','project-management','Project Management',5,true,true),
('30000000-0000-0000-0000-000000000040','20000000-0000-0000-0000-000000000004','roadmapping','Roadmapping',6,true,true),
('30000000-0000-0000-0000-000000000041','20000000-0000-0000-0000-000000000004','how-to-create-a-great-application','How to Create a Great Application',7,true,true),
('30000000-0000-0000-0000-000000000042','20000000-0000-0000-0000-000000000004','accessibility','Accessibility',8,true,true),
('30000000-0000-0000-0000-000000000043','20000000-0000-0000-0000-000000000004','mental-models','Mental Models',9,true,true),
('30000000-0000-0000-0000-000000000044','20000000-0000-0000-0000-000000000004','final-quiz-and-progress-check','Final Quiz & Progress Check',10,true,true)
on conflict(id) do update set module_id=excluded.module_id,slug=excluded.slug,title=excluded.title,position=excluded.position,required=true,published=true,recording_url=null,slides_url=null,video_url=null;

-- Remove obsolete prototype resources. Real materials are added separately.
delete from public.resources where course_id='10000000-0000-0000-0000-000000000001';

insert into public.assignments(id,course_id,lesson_id,title,brief,due_at,position,required) values
('50000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001',null,'Research synthesis','Turn research findings into a clear problem statement, key insights and design opportunities.',null,1,true),
('50000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001',null,'Persona & journey map','Build a grounded persona and customer journey based on evidence from research.',null,2,true),
('50000000-0000-0000-0000-000000000003','10000000-0000-0000-0000-000000000001',null,'UI foundations','Create the visual foundation: layout, typography, color and reusable UI patterns.',null,3,true),
('50000000-0000-0000-0000-000000000004','10000000-0000-0000-0000-000000000001',null,'Interactive prototype','Build and test a high-fidelity Figma prototype with key flows and important interaction states.',null,4,true),
('50000000-0000-0000-0000-000000000005','10000000-0000-0000-0000-000000000001',null,'Product design project','Design a complete product experience across the required screens/platforms.',null,5,true),
('50000000-0000-0000-0000-000000000006','10000000-0000-0000-0000-000000000001',null,'Case study','Turn the full project into a portfolio case study explaining process, decisions and outcomes.',null,6,true)
on conflict(id) do update set lesson_id=null,title=excluded.title,brief=excluded.brief,due_at=null,position=excluded.position,required=true;

do $$
declare student_id uuid;
begin
  select id into student_id from auth.users where email='student@pedanyan.com' limit 1;
  if student_id is not null then
    insert into public.enrollments(user_id,course_id,cohort)
    values(student_id,'10000000-0000-0000-0000-000000000001',null)
    on conflict(user_id,course_id) do update set cohort=null;
  else
    raise notice 'Create student@pedanyan.com in Supabase Auth, then rerun seed.sql to enroll it.';
  end if;
end $$;
