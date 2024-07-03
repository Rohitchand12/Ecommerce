"use client"
import { forwardRef } from "react"
import { FiEye } from "react-icons/fi";
import { useRef } from "react";
function Input({label,error,...props},ref) {
  return (
    <div className="w-full h-30 center flex-col mb-8 gap-4">
        <label className="text-left">{label}</label>
        <div className="center w-full">
          <input ref = {ref} {...props} className="w-full md:w-[80%] h-full outline-none px-4 py-4 border-b-2 text-center border-ydark "/>
          {props.type === "password" && <button><FiEye/></button>}
        </div>
        {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  )
}

export default forwardRef(Input);