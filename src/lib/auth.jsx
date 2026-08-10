import React,{createContext,useContext,useEffect,useState} from 'react'
import {demoMode,supabase} from './supabase'

const AuthContext=createContext(null)
export function AuthProvider({children}){
  const [session,setSession]=useState(null)
  const [loading,setLoading]=useState(!demoMode)
  const [recovery,setRecovery]=useState(false)
  useEffect(()=>{
    if(demoMode)return
    supabase.auth.getSession().then(({data})=>{setSession(data.session);setLoading(false)})
    const {data}=supabase.auth.onAuthStateChange((event,next)=>{setSession(next);setLoading(false);if(event==='PASSWORD_RECOVERY')setRecovery(true)})
    return()=>data.subscription.unsubscribe()
  },[])
  const login=async(email,password)=>{if(demoMode)return {demo:true};const {data,error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;return data}
  const logout=async()=>{if(!demoMode)await supabase.auth.signOut()}
  const resetPassword=async email=>{if(demoMode)return;const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/login`});if(error)throw error}
  const updatePassword=async password=>{const {error}=await supabase.auth.updateUser({password});if(error)throw error;setRecovery(false)}
  return <AuthContext.Provider value={{session,user:session?.user||null,loading,login,logout,resetPassword,updatePassword,recovery,isDemo:demoMode}}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext)
