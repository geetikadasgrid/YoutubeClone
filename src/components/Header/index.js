import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { BiCameraMovie } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { MdSubscriptions, MdVideoLibrary } from "react-icons/md";
<<<<<<< HEAD
<<<<<<< HEAD
import img from "../../assests/unnamed.png";
=======
>>>>>>> 52e8d2e (responsive is done)
=======
import img from "../../assests/unnamed.png";
>>>>>>> ee4eec9 (responsive)

const Header = ({ setSearchQuery, toggleSidebar }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setIsSearchActive(false); // Hide search bar after search
  };

  return (
    <>
      <header className="flex items-center justify-between bg-white shadow-md px-4 py-2">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-4">
          <button className="hidden p-2 hover:bg-gray-100 rounded-full md:block">
            <AiOutlineMenu
              style={{ fontSize: "25px" }}
              onClick={toggleSidebar}
            />
          </button>
          <a href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube Logo"
              className="w-24"
            />
          </a>
        </div>

        {/* Desktop Search Bar */}
        <form
          className="hidden sm:flex items-center w-2/5"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search"
            className="flex-grow border border-gray-300 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-gray-100 border border-gray-300 rounded-r-full px-4 py-2"
          >
            <CiSearch style={{ fontSize: "20px" }} />
          </button>
        </form>

        {/* Mobile Search Icon */}
        <button
          className="sm:hidden p-2 hover:bg-gray-100 rounded-full"
          onClick={handleSearchToggle}
        >
          <CiSearch style={{ fontSize: "25px" }} />
        </button>

        {/* Right Section: Other Icons */}
        <div className="hidden sm:flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <BiCameraMovie style={{ fontSize: "25px" }} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <IoMdNotifications style={{ fontSize: "25px" }} />
          </button>
<<<<<<< HEAD
<<<<<<< HEAD
          <img src={img} alt="Profile" className="w-8 h-8 rounded-full" />
=======
          <img
            src="https://yt3.ggpht.com/yti/ANjgQV86Fy6uxfLfBcuDpwPuBYASOZ7d4L1olXw4l2VfE90=s88-c-k-c0x00ffffff-no-rj-mo"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
>>>>>>> 52e8d2e (responsive is done)
=======
          <img src={img} alt="Profile" className="w-8 h-8 rounded-full" />
>>>>>>> ee4eec9 (responsive)
        </div>

        {/* Mobile Search Bar */}
        {isSearchActive && (
          <form
            className="absolute top-0 left-0 right-0 bg-white shadow-md p-4 sm:hidden flex items-center"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search"
              className="flex-grow border border-gray-300 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-gray-100 border border-gray-300 rounded-r-full px-4 py-2"
            >
              <CiSearch style={{ fontSize: "20px" }} />
            </button>
          </form>
        )}
      </header>

      {/* Bottom Navbar for Mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200">
        <ul className="flex justify-around items-center py-2">
          <li>
            <a href="/" className="flex flex-col items-center text-gray-700">
              <AiFillHome style={{ fontSize: "25px" }} />
              <span className="text-xs">Home</span>
            </a>
          </li>
          <li>
            <a
              href="/subscriptions"
              className="flex flex-col items-center text-gray-700"
            >
              <MdSubscriptions style={{ fontSize: "25px" }} />
              <span className="text-xs">Subscriptions</span>
            </a>
          </li>
          <li>
            <a
              href="/library"
              className="flex flex-col items-center text-gray-700"
            >
              <MdVideoLibrary style={{ fontSize: "25px" }} />
              <span className="text-xs">Library</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
