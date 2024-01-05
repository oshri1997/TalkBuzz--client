import React from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";

const FriendsCard = ({ friends }) => {
  return (
    <div className="w-full px-6 py-5 rounded-lg shadow-sm bg-primary">
      <div className="flex items-start justify-between pb-2 border-b text-ascent-1 border-[#66666645]">
        <span>Friends</span>
        <span>{friends?.length}</span>
      </div>
      <div className="flex flex-col w-full gap-4 pt-4">
        {friends?.map((friend) => (
          <Link
            key={friend?._id}
            to={`/profile/${friend?._id}`}
            className="flex items-center w-full gap-4 cursor-pointer"
          >
            <img
              src={friend?.profileUrl ?? NoProfile}
              alt={friend?.firstName}
              className="object-cover w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-basee text-ascent-1">
                {friend?.firstName} {friend?.lastName}
              </p>
              <span className="text-sm text-ascent-2">
                {friend?.profession ?? "No profession"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FriendsCard;
