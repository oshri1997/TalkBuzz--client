import React from "react";
import { useForm } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { setTheme } from "../redux/themeSlice";
import { userLogout } from "../redux/userSlice";
import { fetchPosts } from "../utils";

const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const handleSearch = async (formData) => {
    try {
      await fetchPosts(userInfo.token, dispatch, "", formData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 topbar md:py-6 bg-primary">
      <Link to="/" className="flex items-center gap-2">
        <div className="p-2 bg-[#065ad8] rounded text-white">
          <TbSocial />
        </div>
        <span className="text-xl md:text-2xl font-semibold text-[#065ad8]">TalkBuzz</span>
      </Link>
      <form className="items-center justify-center hidden px-2 md:flex">
        <TextInput
          type="text"
          name="search"
          placeholder="Search"
          styles="w-[18rem] lg:w-[28rem] 2xl:w-[38rem] outline-none rounded-l-full py-3"
          register={register("search")}
        />
        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#0444a4] text-white px-6 py-3 mt-2 rounded-r-full"
          onClick={handleSubmit(handleSearch)}
        />
      </form>

      <div className="flex items-center gap-4 text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme === "dark" ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>
        <div>
          <CustomButton
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
            onClick={() => dispatch(userLogout())}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
