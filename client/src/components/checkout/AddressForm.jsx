"use client";
import { useForm } from "react-hook-form";
import Input from "@/ui/Input";
import ButtonFilled from "@/ui/ButtonFilled";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Signup from "@/libs/Signup";
import toast from "react-hot-toast";
import createAddress from "@/libs/createAddress";
function AddressForm({onSuccess}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  async function submitHandler(data) {
   const address = {...data};
   await createAddress({address})
   toast.success("Address created successfully!");
   onSuccess();
   router.refresh();
  }

  return (
    <form
      className="center flex-col w-[80%]"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Input
        label="City"
        error={errors?.city}
        type="text"
        placeholder="eg. Sundar Pichai"
        {...register("city", {
          required: {
            value: true,
            message: "city is required",
          },
        })}
      />
      <Input
        label="Location"
        error={errors?.location}
        type="text"
        placeholder=""
        {...register("location", {
          required: {
            value: true,
            message: "location is required",
          },
        })}
      />
      <Input
        label="Street"
        error={errors?.street}
        type="text"
        {...register("street", {
          required: {
            value: true,
            message: "street is required",
          },
        })}
      />
      <Input
      label="Pincode"
        type="text"
        error={errors?.pinCode}
        {...register("pinCode", {
          required: {
            value: true,
            message: "pincode is required",
          },
        })}
      />
      <Input
        label="Country"
        error={errors?.country}
        type="text"
        {...register("country",{
          required: {
            value: true,
            message: "pincode is required",
          },
        })}
      />
      <ButtonFilled
        className="disabled:bg-ylight"
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Save address
      </ButtonFilled>
    </form>
  );
}

export default AddressForm;
