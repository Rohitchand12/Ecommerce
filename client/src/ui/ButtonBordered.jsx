import React from 'react'

function ButtonBordered({children, className, ...props}) {
  return (
    <button {...props} className={`px-6 py-2 border border-ydark bg-transparent text-ydark font-semibold ${className}`}>{children}</button>
  )
}

export default ButtonBordered;