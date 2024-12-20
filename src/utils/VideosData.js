import { useState } from "react";

export default function VideosData() {
  const categories = [
    "All",
    "Music",
    "Trailers",
    "Gaming",
    "Sports",
    "News",
    "Education",
    "Fashion",
    "Podcasts",
    "Allis",
    "Music",
    "Trailers",
    "Gaming",
    "Sports",
    "News",
    "Education",
    "Fashion",
    "Podcasts",
  ];
  const [currentCategory, setCurrentCategory] = useState("All");

  //   const filteredVideos =
  //     currentCategory === "All"
  //       ? videos
  //       : videos.filter((video) => video.category === currentCategory);

  return (
    <div className="flex overflow-x-auto whitespace-nowrap bg-white py-2 px-4 space-x-4 no-scrollbar">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition ${
            currentCategory === category
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
