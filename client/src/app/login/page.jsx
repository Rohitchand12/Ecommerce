"use client";

import Image from "next/image";
import women from "../../../public/women.jpg";
import LoginForm from "@/components/Login/LoginForm";
import withAuthLogin from "../../components/protect/withAuthLogin";

function Login() {
  return (
    <section className="h-[calc(100vh-64px)] w-full center">
      {/* image */}
      <div className="relative h-full w-1/2 hidden sm:block">
        <Image alt="woman" src={women} fill={true} sizes="100%" className="object-cover" />
      </div>
      {/* form */}
      <div className="w-full sm:w-1/2 h-full center flex-col sm:gap-2">
        <h1 className="text-center text-xl text-ydark tracking-wider font-semibold">
          Welcome to Mystic-kart!
        </h1>
        <LoginForm />
      </div>
    </section>
  );
}

export default withAuthLogin(Login);
