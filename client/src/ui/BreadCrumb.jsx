"use client"

import { usePathname } from "next/navigation"

function BreadCrumb() {
    const path = usePathname();
    console.log(path);
  return (
    <div>BreadCrumb</div>
  )
}

export default BreadCrumb