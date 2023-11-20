import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { updateProfile } from "../redux/userSlice";

const EditProfile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState("");
  const [picture, setPicture] = useState(null);
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...userInfo },
  });
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {};
  const handleClose = () => {
    dispatch(updateProfile(false));
  };
  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-[#000] opacity-70"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div
          className="inline-block overflow-hidden text-left align-bottom transition-all transform shadow-xl bg-primary rouned-lg sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="flex justify-between px-6 pt-5 pb-2">
            <label
              className="block text-xl font-medium text-left text-ascent-1"
              htmlFor="name"
            >
              Edit Profile
            </label>
            <button onClick={handleClose} className="text-ascent-1">
              <MdClose size={22} />
            </button>
          </div>
          <form
            className="flex flex-col gap-3 px-4 sm:px-6 2xl:gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="firstName"
              label="First Name"
              placeholder="First Name"
              type="text"
              styles="w-full"
              register={register("firstName", {
                required: "First Name is required!",
              })}
              error={errors.firstName ? errors.firstName?.message : ""}
            />

            <TextInput
              label="Last Name"
              placeholder="Last Name"
              type="lastName"
              styles="w-full"
              register={register("lastName", {
                required: "Last Name do no match",
              })}
              error={errors.lastName ? errors.lastName?.message : ""}
            />

            <TextInput
              name="profession"
              label="Profession"
              placeholder="Profession"
              type="text"
              styles="w-full"
              register={register("profession", {
                required: "Profession is required!",
              })}
              error={errors.profession ? errors.profession?.message : ""}
            />

            <TextInput
              label="Location"
              placeholder="Location"
              type="text"
              styles="w-full"
              register={register("location", {
                required: "Location do no match",
              })}
              error={errors.location ? errors.location?.message : ""}
            />

            <label
              className="flex items-center gap-1 my-4 text-base cursor-pointer text-ascent-2 hover:text-ascent-1"
              htmlFor="imgUpload"
            >
              <input
                type="file"
                className=""
                lang="en"
                id="imgUpload"
                onChange={(e) => handleSelect(e)}
                accept=".jpg, .png, .jpeg"
              />
            </label>
            {errMsg?.message && (
              <span
                role="alert"
                className={`text-sm ${
                  errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}
            <div className="py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]">
              {isSubmitting ? (
                <Loading />
              ) : (
                <CustomButton
                  type="submit"
                  containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                  title="Submit"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
