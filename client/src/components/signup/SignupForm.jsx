"use client";
import { useForm } from "react-hook-form";
import Input from "@/ui/Input";
import ButtonFilled from "@/ui/ButtonFilled";
import axios from "axios";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Signup from "@/libs/Signup";
function SignupForm() {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors , isSubmitting},
  } = useForm();
  async function submitHandler(data) {
    console.log(data);
    const formdata = { ...data };
    formdata.avatar = data.avatar[0];
    const userData = await Signup(formdata);
    console.log(userData);
    setUser(userData);
    router.back();
  }
  return (
    <form className = "center flex-col w-[80%]" onSubmit={handleSubmit(submitHandler)}>
      <Input
        label="Full name"
        error={errors?.name}
        type="text"
        placeholder="eg. Sundar Pichai"
        {...register("name", {
          required: {
            value: true,
            message: "name is required",
          },
        })}
      />
      <Input
        label="Email"
        error={errors?.email}
        type="email"
        placeholder="eg. abc@gmail.com"
        {...register("email", {
          required: {
            value: true,
            message: "email is required",
          },
        })}
      />
      <Input
        label="password"
        error={errors?.password}
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "password is required",
          },
        })}
      />
      <Input
        label="confirm password"
        type="text"
        error={errors?.passwordConfirm}
        {...register("passwordConfirm", {
          required: {
            value: true,
            message: "password confirmation is required",
          },
        })}
      />
      <Input
        label="Avatar"
        error={errors?.avatar}
        type="file"
        {...register("avatar")}
      />
      <ButtonFilled className="disabled:bg-ylight" disabled ={isSubmitting} loading = {isSubmitting} onClick={()=>clearErrors()}>Register</ButtonFilled>
    </form>
  );
}

export default SignupForm;
