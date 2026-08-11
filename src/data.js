const lesson=(number,id,title)=>({id,title,number,type:'Lesson',done:false,required:true})

export const aiDesignCourse={
  slug:'ai-design',
  title:'AI Design',
  tagline:'Learn AI Design from scratch',
  eyebrow:'Course 01 · Design foundations',
  duration:'4 months',
  format:'Practice · critique · revision',
  progress:0,
  summary:'Learn design from scratch through research, UX, flows, UI, Figma, prototyping, testing, product thinking, and delivery. AI becomes part of how the work is done.',
  shortSummary:'A four-month, 44-lesson design foundation. Learn the work from scratch, then use AI as part of the process.',
  modules:[
    {id:'01',title:'Foundations & Research',status:'active',lessons:[
      lesson(1,'intro-to-ux-design','Intro to UX Design'),lesson(2,'design-thinking','Design Thinking'),lesson(3,'ux-research','UX Research'),lesson(4,'user-research','User Research'),lesson(5,'empathy','Empathy'),lesson(6,'intro-to-personas','Intro to Personas'),lesson(7,'personas-workshop','Personas Workshop'),lesson(8,'competitor-analysis','Competitor Analysis'),lesson(9,'user-logic-map-and-user-flows','User Logic Map & User Flows'),lesson(10,'customer-journey-map','Customer Journey Map'),lesson(11,'customer-journey-map-workshop','Customer Journey Map Workshop'),
    ]},
    {id:'02',title:'UI, Figma & Visual Systems',status:'active',lessons:[
      lesson(12,'intro-to-ui','Intro to UI'),lesson(13,'ui-elements','UI Elements'),lesson(14,'layout-design-grid-systems-and-wireframes','Layout Design, Grid Systems & Wireframes'),lesson(15,'figma-and-figjam','Figma & FigJam'),lesson(16,'typography','Typography'),lesson(17,'color','Color'),lesson(18,'information-architecture','Information Architecture'),lesson(19,'ui-kits-and-figma','UI Kits & Figma'),lesson(20,'ui-kit-workshop','UI Kit Workshop'),lesson(21,'components','Components'),lesson(22,'high-fidelity-prototypes-and-micro-interactions','High-Fidelity Prototypes & Micro-Interactions'),
    ]},
    {id:'03',title:'Product Design in Practice',status:'active',lessons:[
      lesson(23,'design-project-kick-off','Design Project Kick-off'),lesson(24,'landing-pages','Landing Pages'),lesson(25,'blog','Blog'),lesson(26,'ecommerce','eCommerce'),lesson(27,'admin-panel','Admin Panel'),lesson(28,'cross-platform-design','Cross-platform Design'),lesson(29,'mobile-ux','Mobile UX'),lesson(30,'design-resources','Design Resources'),lesson(31,'ux-laws','UX Laws'),lesson(32,'ideation-techniques','Ideation Techniques'),lesson(33,'testing','Testing'),lesson(34,'design-handoff','Design Handoff'),
    ]},
    {id:'04',title:'Product Thinking, Delivery & Career',status:'active',lessons:[
      lesson(35,'building-a-case-study','Building a Case Study'),lesson(36,'hook-model-snp-and-dark-patterns','Hook Model, SNP & Dark Patterns'),lesson(37,'progress-check','Progress Check'),lesson(38,'interaction-design','Interaction Design'),lesson(39,'project-management','Project Management'),lesson(40,'roadmapping','Roadmapping'),lesson(41,'how-to-create-a-great-application','How to Create a Great Application'),lesson(42,'accessibility','Accessibility'),lesson(43,'mental-models','Mental Models'),lesson(44,'final-quiz-and-progress-check','Final Quiz & Progress Check'),
    ]},
  ],
}

export const courses=[aiDesignCourse]
export const course=aiDesignCourse
export const skills=[]
export const assignments=[
  {title:'Research synthesis',status:'Not started',mark:'—',note:'Turn research findings into a clear problem statement, key insights and design opportunities.'},
  {title:'Persona & journey map',status:'Not started',mark:'—',note:'Build a grounded persona and customer journey based on evidence from research.'},
  {title:'UI foundations',status:'Not started',mark:'—',note:'Create the visual foundation: layout, typography, color and reusable UI patterns.'},
  {title:'Interactive prototype',status:'Not started',mark:'—',note:'Build and test a high-fidelity Figma prototype with key flows and important interaction states.'},
  {title:'Product design project',status:'Not started',mark:'—',note:'Design a complete product experience across the required screens/platforms.'},
  {title:'Case study',status:'Not started',mark:'—',note:'Turn the full project into a portfolio case study explaining process, decisions and outcomes.'},
]
export const outcomes=[
  'Investigate users, problems and product context before choosing a solution',
  'Turn research into user flows, information architecture and interface decisions',
  'Work with typography, color, layout, components and UI systems in Figma',
  'Build prototypes, interaction states and mobile or cross-platform experiences',
  'Test the work, revise it and prepare clear design handoff',
  'Build a case study that explains the project, process and decisions',
]
