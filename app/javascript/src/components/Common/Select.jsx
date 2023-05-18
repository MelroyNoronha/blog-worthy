import React from "react";

import ReactSelect from "react-select";

const Select = ({
  label,
  defaultValue,
  isSearchable,
  placeholder,
  onChange,
  options,
}) => (
  <div className="mt-6">
    {label && (
      <label
        className="block text-sm font-medium
        leading-5 text-bb-gray-700"
      >
        {label}
      </label>
    )}
    <ReactSelect
      defaultValue={defaultValue}
      isSearchable={isSearchable}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default Select;
