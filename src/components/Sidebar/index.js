import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { LuMusic4 } from "react-icons/lu";
import { IoLogoGameControllerB } from "react-icons/io";

const Sidebar = ({ collapsed }) => {
  const [show, setShow] = useState(false);
  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-white shadow-md h-full flex flex-col transition-all duration-300 ease-out`}
    >
      <nav className="py-4">
        {/* Main Sections */}
        <SidebarSection>
          <SidebarItem icon={<HomeIcon />} label="Home" collapsed={collapsed} />
          <SidebarItem
            onClick={() => alert("clicked")}
            icon={<ShortsIcon />}
            label="Shorts"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<SubscriptionsIcon />}
            label="Subscriptions"
            collapsed={collapsed}
          />
        </SidebarSection>
        {/* ----------- */}
        <SidebarSection>
          <SidebarItem
            icon={
              <MdOutlineVideoLibrary
                style={{ fontSize: "25px", color: "black" }}
              />
            }
            label="Library"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<FaHistory style={{ fontSize: "22px" }} />}
            label="History"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<MdOutlineOndemandVideo style={{ fontSize: "25px" }} />}
            label="Your Videos"
            collapsed={collapsed}
          />
        </SidebarSection>

        {collapsed ? null : (
          <SidebarSection>
            <SidebarTitle title="Explore" collapsed={collapsed} />
            <SidebarItem
              onClick={() => setShow(!show)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9.75l-3.75 3.75-3.75-3.75"
                  />
                </svg>
              }
              label="Trending"
              collapsed={collapsed}
            />
            {show ? (
              <>
                <SidebarItem
                  icon={<LuMusic4 style={{ fontSize: "25px" }} />}
                  label="Music"
                  collapsed={collapsed}
                />
                <SidebarItem
                  icon={<IoLogoGameControllerB style={{ fontSize: "25px" }} />}
                  label="Gaming"
                  collapsed={collapsed}
                />
              </>
            ) : null}
          </SidebarSection>
        )}
      </nav>
    </aside>
  );
};

const SidebarSection = ({ children }) => <div className="mb-4">{children}</div>;

const SidebarTitle = ({ title, collapsed }) => {
  if (collapsed) return null; // Hide title in collapsed mode
  return (
    <div className="px-4 py-2 text-sm font-semibold text-gray-600 uppercase">
      {title}
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center ${
      collapsed ? "justify-center" : "px-4"
    } py-2 text-sm font-medium rounded-lg cursor-pointer text-black-700 hover:bg-gray-100 hover:text-red-600 mt-3`}
  >
    {icon}
    {!collapsed && <span className="ml-4">{label}</span>}
  </div>
);

const HomeIcon = () => <AiFillHome style={{ fontSize: "25px" }} />;

// Add more icons here
const ShortsIcon = () => <SiYoutubeshorts style={{ fontSize: "25px" }} />;

const SubscriptionsIcon = () => (
  <MdOutlineSubscriptions style={{ fontSize: "25px" }} />
);

// Continue adding relevant icons for other items.

export default Sidebar;
