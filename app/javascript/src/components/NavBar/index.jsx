import React from "react";

import NavItem from "./NavItem";

const NavBar = () => (
  <nav className="shadow bg-white">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex px-2 lg:px-0">
          <div className="hidden lg:flex">
            <NavItem name="Posts" path="/dashboard" />
          </div>
          <div className="hidden lg:flex">
            <NavItem name="Create Post" path="/create" />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <NavItem name="Profile" path="/profile" />
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
