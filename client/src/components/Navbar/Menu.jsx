"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

function Menu() {
  const [menuOpen,setMenuOpen] = useState(false);
  return (
    <div className='center'>
        <button onClick = {()=>setMenuOpen(prev => !prev)}><RxHamburgerMenu/></button>
        {
          menuOpen &&  (
            <div className='absolute w-full h-[calc(100vh-80px)] top-20 left-0 z-10 flex-col text-xl gap-8 center bg-black bg-opacity-30 backdrop-blur-md z-10'> 
              <Link href="/">Home</Link>
              <Link href="/products">Shop</Link>
              <Link href="/">About</Link>
              <Link href="/">Contact</Link>
            </div>
          )
        }
    </div>
  )
}

export default Menu