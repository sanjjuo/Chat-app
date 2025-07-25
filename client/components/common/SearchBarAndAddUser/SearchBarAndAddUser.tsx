"use client";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";
import React from "react";

const SearchBarAndAddUser = () => {
  const [searchIcon, setSearchIcon] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const handleMouseEnter = () => {
    setSearchIcon(!searchIcon);
  };
  const handleInputClear = () => {
    setSearchInput("");
    setSearchIcon(!searchIcon);
  };
  return (
    <div className="bg-white px-4 rounded-full h-16 w-full flex items-center justify-between">
      <Input
        type="search"
        value={searchInput}
        onClick={handleMouseEnter}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search chat or group"
        className="border-none shadow-none p-0 h-auto !text-base placeholder:text-base focus:!ring-0 text-black"
      />
      {searchIcon ? (
        <X
          className="w-6 h-6 cursor-pointer stroke-black"
          onClick={handleInputClear}
        />
      ) : (
        <Search className="w-6 h-6 stroke-black" />
      )}
    </div>
  );
};

export default SearchBarAndAddUser;
