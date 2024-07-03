"use client"

import { useLayoutEffect } from "react";
import { useUserStore } from "@/store/store"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

function Protect(ProtectedComponent) {
  const user = useUserStore(state=>state.user);
  return (props)=>{
    const router = useRouter();
    useLayoutEffect(()=>{
        if(user){
            router.back();
            return
        }
    },[user,router]);
    if(user){
        redirect("/");
    }
    return <ProtectedComponent {...props}/>
  }
}

export default Protect