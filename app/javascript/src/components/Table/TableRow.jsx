import React from "react";

import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const TableRow = ({ data }) => {
  const location = useLocation();

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {data.map(rowData => (
        <div className="py-4" key={rowData.id}>
          <Link
            to={{
              pathname: `/posts/${rowData.slug}`,
              state: { background: location },
            }}
          >
            <td
              className="block w-64 cursor-pointer px-6 py-2
              text-sm font-medium capitalize leading-8 text-bb-purple"
            >
              {rowData.title}
            </td>
          </Link>
          <td
            className="truncate block w-64 px-6 text-xs
              font-medium leading-8 text-bb-gray-700"
          >
            {rowData.description}
          </td>
        </div>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TableRow;
