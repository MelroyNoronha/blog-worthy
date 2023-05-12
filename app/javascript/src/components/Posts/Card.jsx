import React from "react";

import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const Card = ({ data }) => {
  const location = useLocation();

  return (
    <div className="h-36 shadow rounded">
      <Link
        to={{
          pathname: `/posts/${data.slug}`,
          state: { background: location },
        }}
      >
        <p
          className="block w-3/4 cursor-pointer
              px-6 py-2 text-sm font-medium capitalize leading-8 text-bb-purple"
        >
          {data.title}
        </p>
      </Link>
      <p
        className="truncate block w-64 px-6 text-xs
              font-medium leading-8 text-bb-gray-700"
      >
        {data.description}
      </p>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Card;
