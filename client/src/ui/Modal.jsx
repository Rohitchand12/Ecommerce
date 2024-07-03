"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

function Modal({children,open, className}) {
const dialog = useRef()
  useEffect(()=>{
    if(open){
        dialog.current.showModal();
    }
    else{
        dialog.current.close();
    }
  },[open])  
  return createPortal((
    <dialog className = {className} ref = {dialog}>
        {children}
    </dialog>
  ),document.body)
}

export default Modal