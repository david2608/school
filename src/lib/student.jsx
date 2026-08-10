import React,{createContext,useCallback,useContext,useEffect,useState} from 'react'
import {getStudentExperience,saveSubmission,setLessonComplete} from './api'
import {useAuth} from './auth'

const StudentContext=createContext(null)
export function StudentProvider({children}){
  const {user,isDemo}=useAuth()
  const [data,setData]=useState(null)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState('')
  const refresh=useCallback(async()=>{setLoading(true);setError('');try{setData(await getStudentExperience(user?.id))}catch(error){setError(error.message||'Could not load your course.')}finally{setLoading(false)}},[user?.id,isDemo])
  useEffect(()=>{if(isDemo||user)refresh();else{setData(null);setLoading(false)}},[isDemo,user,refresh])
  const updateCompletion=current=>{const lessons=current.course.modules.flatMap(module=>module.lessons);const requiredAssignments=current.assignments.filter(item=>item.required!==false);const total=lessons.length+requiredAssignments.length;const completed=lessons.filter(item=>item.done).length+requiredAssignments.filter(item=>['submitted','reviewed'].includes(item.status)).length;return {...current,course:{...current.course,progress:total?Math.round((completed/total)*100):0}}}
  const completeLesson=async lesson=>{setData(current=>updateCompletion({...current,course:{...current.course,modules:current.course.modules.map(module=>({...module,lessons:module.lessons.map(item=>item.id===lesson.id?{...item,done:true}:item)}))}}));await setLessonComplete(user?.id,lesson.dbId||lesson.id,true);if(!isDemo)await refresh()}
  const submitAssignment=async(assignmentId,values)=>{await saveSubmission(user?.id,assignmentId,values);if(isDemo)setData(current=>updateCompletion({...current,assignments:current.assignments.map(item=>item.id===assignmentId?{...item,status:'submitted',submission_url:values.url,submission_note:values.note}:item)}));else await refresh()}
  return <StudentContext.Provider value={{data,loading,error,refresh,completeLesson,submitAssignment}}>{children}</StudentContext.Provider>
}
export const useStudent=()=>useContext(StudentContext)
