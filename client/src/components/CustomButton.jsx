import React from "react";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`inline-flex items-center text-base ${containerStyles}`}
    >
      {title}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default CustomButton;
