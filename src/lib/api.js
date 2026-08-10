import {demoMode,supabase} from './supabase'
import {course as demoCourse,assignments as demoAssignments,skills as demoSkills} from '../data'

const demoResources=[
  {id:'demo-slides',title:'Session slides',kind:'slides',url:'#',lessonTitle:'Flows before screens'},
  {id:'demo-worksheet',title:'Flow mapping worksheet',kind:'file',url:'#',lessonTitle:'Flows before screens'},
]

function demoExperience(){
  const mappedAssignments=demoAssignments.map((a,i)=>({id:`demo-${i+1}`,title:a.title,brief:a.note,due_at:null,status:a.status.toLowerCase().replace(' ','_'),mark:a.mark==='—'?null:Number(a.mark),feedback:a.status==='Reviewed'?a.note:'',submission_url:'',submission_note:''}))
  const mappedCourse={...demoCourse,modules:demoCourse.modules.map(module=>({...module,lessons:module.lessons.map(lesson=>({...lesson}))}))}
  mappedCourse.progress=calculateProgress(mappedCourse.modules,mappedAssignments)
  return {profile:{full_name:'David P.'},enrollment:{cohort:'03'},course:mappedCourse,assignments:mappedAssignments,resources:demoResources,skills:demoSkills,isDemo:true}
}

function calculateProgress(modules,assignments){
  const lessons=modules.flatMap(module=>module.lessons).filter(lesson=>lesson.required!==false)
  const requiredAssignments=assignments.filter(assignment=>assignment.required!==false)
  const completeLessons=lessons.filter(lesson=>lesson.done).length
  const submitted=requiredAssignments.filter(assignment=>['submitted','reviewed'].includes(assignment.status)).length
  const total=lessons.length+requiredAssignments.length
  return total?Math.round(((completeLessons+submitted)/total)*100):0
}

export async function getStudentExperience(userId){
  if(demoMode)return demoExperience()
  const [{data:profile,error:profileError},{data:enrollment,error:enrollmentError}]=await Promise.all([
    supabase.from('profiles').select('id,full_name,avatar_url').eq('id',userId).single(),
    supabase.from('enrollments').select('id,cohort,course:courses(id,slug,title,summary)').eq('user_id',userId).order('enrolled_at',{ascending:false}).limit(1).maybeSingle(),
  ])
  if(profileError)throw profileError
  if(enrollmentError)throw enrollmentError
  if(!enrollment)return {profile,enrollment:null,course:null,assignments:[],resources:[],skills:[],isDemo:false}

  const courseId=enrollment.course.id
  const {data:modules,error:modulesError}=await supabase.from('modules').select('id,title,position').eq('course_id',courseId).eq('published',true).order('position')
  if(modulesError)throw modulesError
  const moduleIds=(modules||[]).map(module=>module.id)
  const [{data:lessons,error:lessonsError},{data:progress,error:progressError},{data:assignments,error:assignmentsError},{data:submissions,error:submissionsError},{data:resources,error:resourcesError},{data:skillScores,error:skillsError}]=await Promise.all([
    moduleIds.length?supabase.from('lessons').select('id,module_id,slug,title,description,video_url,recording_url,slides_url,position,required').in('module_id',moduleIds).eq('published',true).order('position'):Promise.resolve({data:[],error:null}),
    supabase.from('lesson_progress').select('lesson_id,completed_at').eq('user_id',userId),
    supabase.from('assignments').select('id,lesson_id,title,brief,due_at,position,required').eq('course_id',courseId).order('position'),
    supabase.from('submissions').select('id,assignment_id,content,file_url,status,mark,feedback,submitted_at,reviewed_at').eq('user_id',userId),
    supabase.from('resources').select('id,lesson_id,course_id,title,kind,url,storage_path').eq('course_id',courseId),
    supabase.from('skill_scores').select('skill,score').eq('user_id',userId).eq('course_id',courseId),
  ])
  for(const error of [lessonsError,progressError,assignmentsError,submissionsError,resourcesError,skillsError])if(error)throw error
  const completed=new Set((progress||[]).filter(item=>item.completed_at).map(item=>item.lesson_id))
  const lessonsByModule=new Map()
  for(const lesson of lessons||[]){
    const item={...lesson,id:lesson.slug,dbId:lesson.id,done:completed.has(lesson.id),type:lesson.recording_url?'Recording':lesson.video_url?'Video lesson':'Lesson',required:lesson.required!==false}
    lessonsByModule.set(lesson.module_id,[...(lessonsByModule.get(lesson.module_id)||[]),item])
  }
  const mappedModules=(modules||[]).map((module,index)=>{const items=lessonsByModule.get(module.id)||[];return {...module,id:String(index+1).padStart(2,'0'),dbId:module.id,lessons:items,status:items.length&&items.every(item=>item.done)?'complete':'active'}})
  const submissionByAssignment=new Map((submissions||[]).map(item=>[item.assignment_id,item]))
  const mappedAssignments=(assignments||[]).map(assignment=>{const submission=submissionByAssignment.get(assignment.id);return {...assignment,status:submission?.status||'not_started',mark:submission?.mark??null,feedback:submission?.feedback||'',submission_url:submission?.file_url||'',submission_note:submission?.content||'',submissionId:submission?.id,required:assignment.required!==false}})
  const mappedResources=await Promise.all((resources||[]).map(async resource=>{
    if(!resource.storage_path)return {...resource,lessonTitle:(lessons||[]).find(lesson=>lesson.id===resource.lesson_id)?.title}
    const {data}=await supabase.storage.from('course-materials').createSignedUrl(resource.storage_path,3600)
    return {...resource,url:data?.signedUrl||'',lessonTitle:(lessons||[]).find(lesson=>lesson.id===resource.lesson_id)?.title}
  }))
  const course={...enrollment.course,modules:mappedModules}
  course.progress=calculateProgress(mappedModules,mappedAssignments)
  return {profile,enrollment,course,assignments:mappedAssignments,resources:mappedResources,skills:(skillScores||[]).map(item=>[item.skill,item.score]),isDemo:false}
}

export async function setLessonComplete(userId,lessonId,complete=true){
  if(demoMode)return
  const {error}=await supabase.from('lesson_progress').upsert({user_id:userId,lesson_id:lessonId,completed_at:complete?new Date().toISOString():null},{onConflict:'user_id,lesson_id'})
  if(error)throw error
}

export async function saveSubmission(userId,assignmentId,{url,note}){
  if(demoMode)return
  const {error}=await supabase.from('submissions').upsert({user_id:userId,assignment_id:assignmentId,file_url:url||null,content:note||null,status:'submitted',submitted_at:new Date().toISOString()},{onConflict:'assignment_id,user_id'})
  if(error)throw error
}

export async function saveApplication(application){
  if(demoMode)return
  const {error}=await supabase.from('applications').insert(application)
  if(error)throw error
}
