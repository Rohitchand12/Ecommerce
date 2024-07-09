"use client";

import Login from "@/libs/Login";
import Logout from "@/libs/Logout";
import { useUserStore } from "@/store/store";
import ButtonFilled from "@/ui/ButtonFilled";
import Input from "@/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function LoginForm() {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const router = useRouter();
  console.log(user);

  console.log("zustand store  = ", user);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  async function submitHandler(data) {
    try{
      const userData = await Login(data);
      if(!userData) return ;
      setUser(userData);
      toast.success("Logged in successfuly !");
      router.back();
    }catch(error){
      console.log(error);
      setError("invalid",{
        message:error.response.data.message
      })
    }
  }
  return (
    <form
      className="h-3/4 sm:w-[80%] center flex-col"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        label="Email"
        error={errors?.email}
        type="text"
        placeholder="abc@gmail.com"
        {...register("email", {
          required: {
            value: true,
            message:"Email is required"
          },
        })}
      />
      <Input
        label="Password"
        type="password"
        error={errors?.password}
        placeholder="password"
        {...register("password", {
          required: {
            value:true,
            message:"Password is required"
          },
        })}
      />
      {errors?.invalid && <p className="text-sm text-red-500 mb-4">{errors.invalid.message}</p>}
      <ButtonFilled className="disabled:bg-ylight" disabled ={isSubmitting} loading = {isSubmitting} onClick={()=>clearErrors()}>Login</ButtonFilled>
      <div className="center flex-col w-full gap-2 mt-8 text-sm">
        <div className="center gap-2">
          <p>Create account </p>
          <Link href="signup" className="text-ydark">
            Register
          </Link>
        </div>
        <div className="center gap-2">
          <p>Forgot Password ? </p>
          <Link href="signup" className="text-ydark">
            Reset password
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
