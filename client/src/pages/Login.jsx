import React, { useState } from "react";
import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
import { CustomButton, TextInput } from "../components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BgImage } from "../assets";
import { Loading } from "../components";
import { apiRequest } from "../utils";
import { userLogin } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (formData) => {
    try {
      const res = await apiRequest({
        url: "/auth/login",
        method: "POST",
        data: formData,
      });
      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg(res);
        const newData = { token: res.token, ...res.user };
        dispatch(userLogin(newData));
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen p-6 bg-bgColor">
      <div className="flex w-full h-auto py-8 overflow-hidden shadow-xl md:w-2/3 lg:h-4/6 2xl:h-5/6 lg:py-0 bg-primary rounded-xl">
        <div className="flex flex-col justify-center w-full h-full p-10 lg:w-1/2 2xl:px-20">
          <div className="flex items-center w-full gap-2 mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial />
            </div>
            <span className="text-2xl font-semibold text-[#065ad8]">TalkBuzz</span>
          </div>
          <p className="text-base font-semibold text-ascent-1">Log in to your account</p>
          <span className="mt-2 text-sm text-ascent-2">Welcome back</span>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-8">
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
              styles="w-full rounded-full"
              labelStyles="ml-2"
              error={errors.email?.message}
            />
            <TextInput
              name="password"
              placeholder="********"
              type="password"
              label="Password"
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              styles="w-full rounded-full"
              labelStyles="ml-2"
              error={errors.password?.message}
            />
            <Link to="/reset-password" className="text-sm font-semibold text-right text-blue">
              Forgot Password ?
            </Link>

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
                title="Login"
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
        <div className="flex-col items-center justify-center hidden w-1/2 h-full bg-blue lg:flex">
          <div className="relative flex items-center justify-center w-full ">
            <img
              src={BgImage}
              alt="BgImage"
              className="object-cover w-48 h-48 rounded-full 2xl:w-64 2xl:h-64"
            />
            <div className="absolute flex items-center gap-1 px-5 py-2 bg-white rounded-full right-10 top-10">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share</span>
            </div>
            <div className="absolute flex items-center gap-1 px-5 py-2 bg-white rounded-full left-10 top-5">
              <ImConnection />
              <span className="text-xs font-medium">Connect</span>
            </div>
            <div className="absolute flex items-center gap-1 px-5 py-2 bg-white rounded-full bottom-1 left-12">
              <AiOutlineInteraction />
              <span className="text-xs font-medium">Interact</span>
            </div>
          </div>
          <div className="mt-16 text-center ">
            <p className="text-base text-white 2xl:text-lg">
              Connect with friends & have fun on TalkBuzz
            </p>
            <span className="text-sm 2xl:text-base text-white/80">
              Share photos and videos, send messages and get updates
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
