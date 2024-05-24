import React from "react";
import Image from "next/image";
import brand from "../../public/brand.png"
import Menu from "./Menu";


function Navbar() {
  return (
    <nav className="flex h-[10vh] bg-black">
        <h1 className="text-4xl">hello there</h1>
        {/* <div className="relative w-24 h-24"> */}
            <Image
                className="w-[100px] h-[100px]"
                src={brand}
                alt="Brand image"
                
                height={2000}
                width={1999}
            />
        {/* </div> */}
      <Menu />
    </nav>
  );
}

export default Navbar;
