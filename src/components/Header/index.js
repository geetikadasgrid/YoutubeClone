import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { BiCameraMovie } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

const Header = ({ setSearchQuery, toggleSidebar }) => {
  const [inputChange, setInputChange] = useState(null);
  const hanldeInputChnage = (e) => {
    setInputChange(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputChange);
  };

  return (
    <header className="flex items-center justify-between bg-white shadow-md px-4 py-2">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-4">
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={toggleSidebar}
        >
          {/* Menu Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5h16.5M3.75 12h16.5M3.75 19h16.5"
            />
          </svg>
        </button>
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className="w-24"
          />
        </a>
      </div>

      <form className="flex items-center w-2/5" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          className="flex-grow border border-gray-300 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          // value={input}
          onChange={hanldeInputChnage}
        />
        <button
          type="submit"
          className="bg-gray-100 border border-gray-300 rounded-r-full px-4 py-2"
        >
          <CiSearch style={{ fontSize: "20px" }} />
        </button>
      </form>

      {/* Right Section: Other Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <BiCameraMovie style={{ fontSize: "25px" }} />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <IoMdNotifications style={{ fontSize: "25px" }} />
        </button>
        <img
          src="https://yt3.ggpht.com/yti/ANjgQV86Fy6uxfLfBcuDpwPuBYASOZ7d4L1olXw4l2VfE90=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
