import React from "react";

import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const Card = ({ postData }) => {
  const location = useLocation();
  const { slug, title, description } = postData;

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
              px-6 py-2 text-sm font-medium capitalize leading-8 text-bb-purple"
        >
          {title}
        </p>
      </Link>
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
