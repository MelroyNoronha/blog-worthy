import React from "react";

import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import Button from "./Button";

const Card = ({ postData, handleUpvotePress, handleDownvotePress }) => {
  const location = useLocation();
  const { slug, title, description, author, net_votes } = postData;

  return (
    <div className="h-36 shadow rounded flex flex-row justify-between">
      <div className="flex-grow w-3/4">
        <Link
          to={{
            pathname: `/posts/${slug}`,
            state: { background: location },
          }}
        >
          <p
            className="block w-3/4 cursor-pointer
              px-6 py-2 text-base font-medium capitalize leading-8 text-bb-purple underline"
          >
            {title}
          </p>
        </Link>
        <p
          className="block w-3/4 cursor-pointer
              px-6 text-xs font-medium capitalize leading-8"
        >
          Created by: {author.name}
        </p>
        <p
          className="truncate block w-64 px-6
              text-sm leading-8 text-bb-gray-700"
        >
          {description}
        </p>
      </div>
      <div className="flex-grow flex flex-col items-center justify-between">
        <Button type="upvote" onClick={handleUpvotePress} />
        <p className="text-base font-bold">{net_votes}</p>
        <Button type="downvote" onClick={handleDownvotePress} />
      </div>
    </div>
  );
};

Card.propTypes = {
  postData: PropTypes.object.isRequired,
};

export default Card;
