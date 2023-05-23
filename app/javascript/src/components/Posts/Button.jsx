import React from "react";

const Button = ({ onClick, type = "upvote" }) => {
  const iconClass =
    type === "upvote" ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line";

  return (
    <button className="my-2 rounded-sm bg-gray-200 p-3 " onClick={onClick}>
      <i className={`${iconClass} font-bold`} />
    </button>
  );
};

export default Button;
