import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  EditProfile,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TopBar,
} from "../components";
import { posts } from "../assets/data";
const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo, edit } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  // const { posts } = useSelector((state) => state.post);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="w-full h-screen px-0 pb-20 overflow-hidden home lg:px-10 2xl:px-40 bg-bgColor lg:rounded-lg">
        <TopBar />
        <div className="flex w-full h-full gap-2 pt-5 pb-10 lg:gap-4 lg:px-0 md:px-4">
          <div className="flex-col hidden w-1/3 gap-6 overflow-y-auto lg:w-1/4 md:flex">
            <ProfileCard userInfo={userInfo} />

            <div className="block lg:hidden">
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>

          <div className="flex flex-col flex-1 h-full gap-6 px-4 overflow-y-auto bg-orimary">
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  post={post}
                  key={post?._id}
                  userInfo={userInfo}
                  deletePost={() => {}}
                  likePost={() => {}}
                />
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          <div className="flex-col hidden w-1/4 h-full gap-8 overflow-y-auto lg:flex">
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>
      </div>
      {edit && <EditProfile />}
    </>
  );
};

export default Profile;
