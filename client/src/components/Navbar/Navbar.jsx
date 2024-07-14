import React from "react";
import Image from "next/image";
import brand from "../../../public/brand.svg";
import Menu from "./Menu";
import Link from "next/link";
import Navlinks from "./Navlinks";
import NavSearch from "./NavSearch";
import UserStatus from "./UserStatus";


function Navbar() {
  return (
    <nav className="font-sans sticky top-0 left-0 z-10 backdrop-blur-md bg-white bg-opacity-30 text-sm text-fcolor font-bold flex h-16 px-5 sm:px-8 md:px-10 justify-between">
      {/* MOBILE  */}
      <div className="md:hidden flex justify-between h-full w-full items-center px-2">
        <Link href="/" className="center gap-2">
          <Image src={brand} alt="Brand image" height={32} width={50} />
          <h1 className="text-xl tracking-wide font-bold">MYSTIC</h1>
        </Link>
        <div className="center gap-8">
          <UserStatus/>
          <Menu />
        </div>
      </div>

      {/* BIGGER SCREENS  */}
      <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-5 w-full h-full place-content-center place-items-stretch">
        {/* Logo  */}
        <div className="col-span-2 center">
          <Link href="/" className="center gap-2">
            <Image src={brand} alt="Brand image" height={32} width={50} />
            <h1 className="text-xl tracking-wide font-bold">MYSTIC</h1>
          </Link>
        </div>

        {/* Links  */}
        <div className="col-span-5">
          <NavSearch/>
        </div>

        {/* Buttons  */}
        <div className="col-span-5">
          <Navlinks/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
