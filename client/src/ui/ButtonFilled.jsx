"use client"

import React from 'react'
import { BeatLoader } from 'react-spinners';
function ButtonFilled({children,loading, className, ...props}) {
  return (
    <button {...props} className={`px-6 py-2 bg-ydark text-white font-semibold  ${className}`}>{loading ? <BeatLoader color='#B88E2F'/> :children}</button>
  )
}

export default ButtonFilled;