"use client";
import brand from "../../public/brand.svg";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="grid grid-cols-12 min-h-[40vh] px-5 py-4 border-y-2 border-gray-300 text-gray-500 text-sm">
      <div className="center col-span-12 md:col-span-3 gap-5 md:gap-10 flex-col">
        <div>
          <Link href="/" className="center gap-2">
            <Image src={brand} alt="Brand image" height={32} width={50} />
            <h1 className="xl tracking-wide font-bold">MYSTIC</h1>
          </Link>
        </div>
        <div className="flex flex-col gap-2 ">
          <h1>Rajeshwar Nagar , Phase 1 ,street 8 Lane 1 </h1>
          <h1>Dehradun</h1>
          <h1>India</h1>
        </div>
      </div>
      <div className=" col-span-6 md:col-span-2 center flex-col gap-5">
        <Link href="/">Home</Link>
        <Link href="/">Shop</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
      </div>
      <div className=" col-span-6 md:col-span-2 center flex-col gap-5">
        <Link href="/">Payment Options</Link>
        <Link href="/">Returns</Link>
        <Link href="/">Privacy Policy</Link>
      </div>
      <div className=" col-span-12 md:col-span-5 center">
        <form className="bg-gray-100 flex justify-between w-2/3">
          <input type="text" placeholder= "Email" className="w-2/3 py-3 px-4 bg-transparent"/>
          <button className="bg-ydark text-white px-4 py-2">Submit</button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
