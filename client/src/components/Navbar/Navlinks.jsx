import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import UserStatus from "./UserStatus";

function Navlinks() {
  return (
    <div className="relative z-10 h-full w-full center gap-8">
      <Link href="/">Home</Link>
      <Link href="/products">Shop</Link>
      <Link href="/wishlist">
        <CiHeart />
      </Link>
      <Link href="/cart">
        <IoCartOutline />
      </Link>
     <UserStatus/>
    </div>
  );
}

export default Navlinks;
