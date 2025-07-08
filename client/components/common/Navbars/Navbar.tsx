import React from "react";
import LogoText from "../LogoText/LogoText";
import { Bell, Search } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import { navbarContents } from "./data";

const Navbar = () => {
  return (
    <div className="sticky top-0 flex items-center justify-between bg-app-secondary h-14 lg:h-24 h z-50 w-full px-5 md:p-0">
      <LogoText placement="app-logo" />
      <div className="hidden lg:flex items-center gap-40">
        <ul className="flex items-center gap-10">
          {navbarContents.map((navLink) => (
            <li
              key={navLink.id}
              className="cursor-pointer hover:text-app-primary"
            >
              {navLink.label}
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-10">
          <li>
            <Search className="cursor-pointer hover:stroke-app-primary" />
          </li>
          <li>
            <Bell className="cursor-pointer hover:stroke-app-primary" />
          </li>
        </ul>
      </div>
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
