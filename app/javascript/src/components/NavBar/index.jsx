import React from "react";

import { auth as authApi } from "apis";

import { resetAuthTokens } from "apis/axios";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import NavItem from "./NavItem";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserName");

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="shadow bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <NavItem name="Posts" path="/" />
            </div>
            <div className="hidden lg:flex">
              <NavItem name="Create Post" path="/create" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <p
              className="mx-8 border-b-2 border-transparent px-1
              pt-1 text-sm font-bold leading-5 text-bb-gray-600"
            >
              {userName}
            </p>
            <a
              className="transition focus:outline-none inline-flex cursor-pointer items-center
              border-b-2 border-transparent px-1 pt-1
              text-sm font-semibold leading-5 text-bb-gray-600
              text-opacity-50 duration-150 ease-in-out
              hover:text-bb-gray-600 focus:text-bb-gray-700"
              onClick={handleLogout}
            >
              LogOut
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
