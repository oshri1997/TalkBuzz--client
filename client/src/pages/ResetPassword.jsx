import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton, Loading, TextInput } from "../components";
import { Link } from "react-router-dom";
import { apiRequest } from "../utils";

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (formData) => {
    try {
      const res = await apiRequest({
        url: "/users/requestpasswordreset",
        method: "POST",
        data: formData,
      });
      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen p-6 bg-bgColor">
      <div className="w-full px-6 py-8 rounded-lg shadow-xl bg-primary md:w-2/4 2xl:w-1/4">
        <p className="text-lg font-semibold text-ascent-1">Email Address</p>
        <span className="text-sm text-ascent-2">
          Enter your email address and we will send you a link to reset your password
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-4 ">
          <TextInput
            name="email"
            placeholder="email@example.com"
            type="email"
            label="Email Address"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                message: "Invalid email address",
              },
            })}
            styles="w-full "
            labelStyles="ml-2"
            error={errors.email?.message}
          />
          {errMsg?.message && (
            <span
              className={`text sm ${
                errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe] mt-0.5"
              }`}
            >
              {errMsg?.message}
            </span>
          )}
          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
              title="Reset Password"
            />
          )}
        </form>
        <p className="text-sm text-center text-ascent-2">
          Don't have an account?
          <Link to="/register" className="ml-2 text-[#065ad8] font-semibold cursor-pointer">
            Create An Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
