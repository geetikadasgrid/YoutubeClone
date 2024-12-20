import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoCard, { AdVideoCard } from "../VideoCard";
import VideosData from "../../utils/VideosData";
import Shimmer from "../Shimmer";

const VideoContainer = ({ searchQuery }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [nextPageToken, setNextPageToken] = useState(""); // Token for next page

  const API_KEY = "AIzaSyBgSV0_J-iSpl7iwucLGIOW8XCfPZCZy8s";
  const API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=${API_KEY}`;
  console.log(searchQuery);
  // Fetch videos based on current page
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_URL}&pageToken=${nextPageToken}`
        );
        const fetchedVideos = response.data.items;

        setVideos(fetchedVideos);
        setNextPageToken(response.data.nextPageToken);
        console.log(nextPageToken);
        setTotalPages(Math.ceil(response.data.pageInfo.totalResults / 20)); // 20 items per page
        console.log(videos);
      } catch (err) {
        setError("Failed to fetch videos. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [page]);

  // Filter videos based on search query
  const filteredData = videos.filter((video) =>
    video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log("filterd data", filteredData);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Function to render page numbers
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 text-white ${
            page === i ? "bg-blue-500" : "bg-blue-300"
          } rounded`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="w-full">
      <VideosData />
      <div className="flex-1 bg-gray-50 p-6">
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}
        {loading && (
          <div className="text-center">
            <Shimmer />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* {videos[0] && <AdVideoCard video={videos[0]} />} */}
          {!loading && filteredData.length === 0 ? (
            <div className="text-center col-span-full">No videos found.</div>
          ) : (
            filteredData.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))
          )}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {/* Previous Page Button */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {renderPagination()}

            {/* Next Page Button */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoContainer;
