"use client"
import { forwardRef } from "react"
import { FiEye } from "react-icons/fi";
import { useRef,useState } from "react";
function Input({label,error,type,...props},ref) {
  const [inputType,setInputType] = useState(type);
  const handleToggleVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };
  return (
    <div className="w-full h-30 center flex-col mb-8 gap-4">
        <label className="text-left font-semibold">{label}</label>
        <div className="center w-full">
          <input ref = {ref} type={inputType} {...props} className="w-full md:w-[80%] h-full outline-none px-4 py-4 border-b-2 text-center border-ydark "/>
          {type === "password" && <button type = "button" onClick = {handleToggleVisibility}><FiEye/></button>}
        </div>
        {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  )
}

export default forwardRef(Input);