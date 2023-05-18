import React from "react";

import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const Card = ({ postData }) => {
  const location = useLocation();
  const { slug, title, description, author } = postData;

  return (
    <div className="h-36 shadow rounded">
      <Link
        to={{
          pathname: `/posts/${slug}`,
          state: { background: location },
        }}
      >
        <p
          className="block w-3/4 cursor-pointer
              px-6 py-2 text-sm font-medium capitalize leading-8 text-bb-purple underline"
        >
          {title}
        </p>
      </Link>
      <p
        className="block w-3/4 cursor-pointer
              px-6 py-2 text-xs font-medium capitalize leading-8"
      >
        {author.name}
      </p>
      <p
        className="truncate block w-64 px-6 text-xs
              font-medium leading-8 text-bb-gray-700"
      >
        {description}
      </p>
    </div>
  );
};

Card.propTypes = {
  postData: PropTypes.object.isRequired,
};

export default Card;
