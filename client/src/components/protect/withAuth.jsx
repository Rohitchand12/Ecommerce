"use client"

import { useEffect } from "react";
import { useUserStore } from "@/store/store"
import { redirect } from "next/navigation";
import Propagate from "../loaders/Propagate";

function Protect(ProtectedComponent) {
  return (props)=>{
    const user = useUserStore(state=>state.user);
    useEffect(()=>{
        if(!user){
            redirect("/login");
        }
    },[user]);

    if(!user){
        return <Propagate/>
    }
    return <ProtectedComponent {...props}/>
  }
}

export default Protect