"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
const menuItems = [
  {
    text:"Home",
    path:"/"
  },
  {
    text:"Shop",
    path:"/products"
  },
  {
    text:"Cart",
    path:"/cart"
  },
  {
    text:"About",
    path:"/"
  },
  {
    text:"Contact",
    path:"/"
  },
]
function Menu() {
  const [menuOpen,setMenuOpen] = useState(false);
  return (
    <div className='center'>
        <button onClick = {()=>setMenuOpen(prev => !prev)}><RxHamburgerMenu/></button>
        {
          menuOpen &&  (
            <div className='absolute w-full h-80 top-20 left-0 z-20 flex-col text-xl gap-8 center bg-ydark text-white'> 
              {
                menuItems.map((item, index) => (
                  <Link onClick = {()=>setMenuOpen(false)}href={item.path} key={index}>
                    {item.text}
                  </Link>
                ))
              }
            </div>
          )
        }
    </div>
  )
}

export default Menu