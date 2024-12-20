import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VideoContainer from "./components/VideoContainer";
import VideoPage from "./pages/VideoPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Check if we are on the VideoPlayerPage
  const isVideoPlayerPage = location.pathname.includes("/video/");

  return (
    <div className="flex flex-col h-screen">
      <div className="h-16">
        <Header
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <div className="flex flex-1">
        {!isVideoPlayerPage && <Sidebar collapsed={isSidebarCollapsed} />}

        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <Routes>
            {/* Main Route (Video Container) */}
            <Route
              path="/"
              element={<VideoContainer searchQuery={searchQuery} />}
            />

            {/* Video Player Route */}
            <Route path="/video/:id" element={<VideoPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
