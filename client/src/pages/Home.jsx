import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  EditProfile,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TextInput,
  TopBar,
} from "../components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { useForm } from "react-hook-form";
import {
  apiRequest,
  deletePost,
  fetchPosts,
  getUserInfo,
  handleFileUpload,
  likePost,
  sendFriendRequest,
} from "../utils";
import { userLogin } from "../redux/userSlice";
const Home = () => {
  const { userInfo, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const [frienRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const handlePostSubmit = async (formData) => {
    setPosting(true);
    setErrMsg("");
    try {
      console.log(file);
      const image = file && (await handleFileUpload(file));
      const newData = image ? { ...formData, image } : { ...formData };
      const res = await apiRequest({
        url: "/posts/createpost",
        method: "POST",
        token: userInfo?.token,
        data: newData,
      });

      if (res?.status === "failed") {
        setErrMsg(res?.message);
      } else {
        reset({
          description: "",
        });
        setFile(null);
        setErrMsg("");
        await fetchPosts(userInfo?.token, dispatch);
      }
      setPosting(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPost = async () => {
    try {
      await fetchPosts(userInfo?.token, dispatch);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikePost = async (url) => {
    try {
      await likePost(userInfo?.token, url);
      await fetchPost();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePost = async (id) => {
    try {
      await deletePost(userInfo?.token, id);
      await fetchPost();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFriendRequest = async () => {
    try {
      const res = await apiRequest({
        url: "/users/getfriendrequest",
        method: "GET",
        token: userInfo?.token,
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSuggestedFriends = async () => {
    try {
      const res = await apiRequest({
        url: "/users/suggetedfriends",
        method: "GET",
        token: userInfo?.token,
      });
      setSuggestedFriends(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFriendRequest = async (friendId) => {
    try {
      await sendFriendRequest(userInfo?.token, friendId);
      await fetchFriendRequest();
    } catch (error) {
      console.log(error);
    }
  };
  const acceptFriendRequest = async (id, status) => {
    try {
      const res = await apiRequest({
        url: "/users/acceptrequest",
        method: "POST",
        token: userInfo?.token,
        data: { rid: id, status },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await getUserInfo(userInfo?.token);
      const updatedUser = { token: userInfo?.token, ...res };
      dispatch(userLogin(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    fetchPost();
    fetchFriendRequest();
    fetchSuggestedFriends();
  }, []);

  return (
    <>
      <div className="w-full h-screen pb-20 overflow-hidden home lg:px-10 2xl:px-40 bg-bgColor lg:rounded-lg">
        <TopBar />
        <div className="flex w-full h-full gap-2 pt-5 pb-10 md:px-4 lg:px-0 lg:gap-4">
          <div className="flex-col hidden w-1/3 h-full gap-6 overflow-y-auto lg:w-1/4 md:flex">
            <ProfileCard userInfo={userInfo} />
            <FriendsCard friends={userInfo?.friends} />
          </div>
          <div className="flex flex-col flex-1 h-full gap-6 px-4 overflow-y-auto bg-primary">
            <form
              onSubmit={handleSubmit(handlePostSubmit)}
              className="px-4 rounded-lg bg-primary"
            >
              <div className="flex flex-col items-center w-full gap-2 py-4 rounded-lg sm:flex-row">
                <img
                  src={userInfo?.profileUrl ?? NoProfile}
                  alt="User Profle Image"
                  className="object-cover rounded-full w-14 h-14"
                />
                <TextInput
                  styles="w-full rounded-full py-5"
                  placeholder="What's on your mind..."
                  name="description"
                  register={register("description", {
                    required: "Write something to post",
                  })}
                  error={errors.description?.message}
                />
              </div>

              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe] mt-0.5"
                  }`}
                >
                  {errMsg?.message}
                </span>
              )}
              <div className="flex items-center justify-between py-4">
                <div className="flex justify-between w-1/3 gap-2">
                  <label
                    className="flex items-center gap-1 cursor-pointer text-ascent-2 hover:text-ascent-1"
                    htmlFor="imgUpload"
                  >
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="hidden"
                      id="imgUpload"
                      accept=".jpg,.jpeg,.png"
                      // data-max-size="5120"
                    />
                    <BiImages />
                    <span>Image</span>
                  </label>

                  {/* <label
                  className="flex items-center gap-1 cursor-pointer text-ascent-2 hover:text-ascent-1"
                  htmlFor="videoUpload"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="videoUpload"
                    accept=".mp4,.wav"
                    // data-max-size="5120"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label> */}
                  <label
                    className="flex items-center gap-1 cursor-pointer text-ascent-2 hover:text-ascent-1"
                    htmlFor="vgifUpload"
                  >
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="hidden"
                      id="vgifUpload"
                      accept=".gif"
                      data-max-size="5120"
                    />
                    <BsFiletypeGif />
                    <span>Gif</span>
                  </label>
                </div>
                {posting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type="submit"
                    title="Post"
                    containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibolad text-sm"
                  />
                )}
              </div>
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="post"
                  className="object-cover w-2/3 h-auto pb-1 mx-auto "
                />
              )}
            </form>
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  userInfo={userInfo}
                  deletePost={handleDeletePost}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-lg text-ascent-2">No Post Avaliable</p>
              </div>
            )}
          </div>

          <div className="flex-col hidden w-1/4 h-full gap-8 overflow-y-auto lg:flex">
            <div className="w-full px-6 py-5 rounded-lg shadow-sm bg-primary">
              <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                <span>Friends Request</span>
                <span>{frienRequest?.length}</span>
              </div>
              <div className="flex flex-col w-full gap-4 pt-4">
                {frienRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className="flex items-center justify-between ">
                    <Link
                      className="flex items-center w-full gap-4 cursor-pointer"
                      to={`/profile/${from?._id}`}
                    >
                      <img
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className="object-cover w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>
                    <div className="flex gap-1.5">
                      <CustomButton
                        title="Accept"
                        onClick={() => acceptFriendRequest(_id, "Accepted")}
                        containerStyles="bg-[#0444a4] text-xs text-white px-2 py-1 rounded-full"
                      />
                      <CustomButton
                        title="Deny"
                        onClick={() => acceptFriendRequest(_id, "Denied")}
                        containerStyles="border border-[#666] text-xs text-ascent-1 px-2 py-1 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full px-5 py-5 rounded-lg shadow-sm bg-primary ">
              <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span>Suggested Friends</span>
              </div>
              <div className="flex flex-col w-full gap-4 pt-4">
                {suggestedFriends?.map((suggest) => (
                  <div key={suggest?._id} className="flex items-center justify-between">
                    <Link
                      className="flex items-center w-full gap-4 cursor-pointer"
                      to={`/profile/${suggest?._id}`}
                    >
                      <img
                        src={suggest?.profileUrl ?? NoProfile}
                        alt={suggest?.firstName}
                        className="object-cover w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {suggest?.firstName} {suggest?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {suggest?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>
                    {/* <div className="flex gap-1"> */}

                    <button
                      className="bg-[#0444a430] text-sm text-white p-1 rounded"
                      onClick={() => {
                        handleFriendRequest(suggest?._id);
                      }}
                    >
                      <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                    </button>
                    {/* </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {edit && <EditProfile />}
    </>
  );
};

export default Home;
