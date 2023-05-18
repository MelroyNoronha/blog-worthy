import React from "react";

import { Link } from "react-router-dom";

import { Button, Input, Select } from "components/Common";

const Signup = ({
  handleSubmit,
  setName,
  setEmail,
  setPassword,
  organizations,
  defaultOrganization,
  setSelectedOrganizationId,
  loading,
  setPasswordConfirmation,
}) => {
  const organizationOptions = organizations.map(organization => ({
    value: organization.id,
    label: organization.name,
  }));

  return (
    <div
      className="bg-gray-50 flex min-h-screen items-center justify-center
      px-4 py-12 sm:px-6 lg:px-8 "
    >
      <div className="w-full max-w-md">
        <h2
          className="mt-6 text-center text-3xl font-extrabold
          leading-9 text-gray-700"
        >
          Sign Up
        </h2>
        <div className="text-center">
          <Link
            to="/"
            className="transition focus:outline-none mt-2 text-center
              text-sm font-medium text-bb-purple duration-150
              ease-in-out focus:underline"
          >
            Or Login Now
          </Link>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <Input
            label="Name"
            placeholder="Oliver"
            onChange={e => setName(e.target.value)}
          />
          <Select
            isSearchable
            defaultValue={defaultOrganization}
            label="Organization"
            options={organizationOptions}
            placeholder="Select your organization"
            onChange={e => setSelectedOrganizationId(e.value)}
          />
          <Input
            label="Email"
            placeholder="oliver@example.com"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="********"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            label="Password Confirmation"
            placeholder="********"
            type="password"
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <Button buttonText="Register" loading={loading} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
