"use client";

import Image from "next/image";
import women from "../../../public/women.jpg";
import withAuthLogin from "../../components/protect/withAuthLogin";
import SignupForm from "@/components/signup/SignupForm";

function Signup() {
  return (
    <section className=" w-full center py-8">
      {/* image */}
      <div className="relative h-screen w-1/2 hidden sm:block">
        <Image alt="woman" src={women} fill={true} sizes="100%" className="object-cover" />
      </div>
      {/* form */}
      <div className="w-full sm:w-1/2 h-full center flex-col gap-8 sm:gap-2">
        <h1 className="text-center text-xl text-ydark tracking-wider font-semibold">
          Welcome to Mystic-kart!
        </h1>
        <SignupForm/>
      </div>
    </section>
  )
}

export default withAuthLogin(Signup)