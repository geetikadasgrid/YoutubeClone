import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "../VideoCard";
import Shimmer from "../Shimmer";

const VideoContainer = ({ searchQuery, videos, setVideos }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(""); // Token for next page

  const API_KEY = "AIzaSyBgSV0_J-iSpl7iwucLGIOW8XCfPZCZy8s";
  const API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&key=${API_KEY}`;

  // Fetch videos with memoized function to prevent re-creation
  const fetchVideos = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_URL}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`
      );

      const fetchedVideos = response.data.items;

      // Ensure no duplicate videos by ID
      setVideos((prevVideos) => {
        const uniqueVideos = [
          ...new Map(
            [...prevVideos, ...fetchedVideos].map((video) => [video.id, video])
          ).values(),
        ];
        return uniqueVideos;
      });

      setNextPageToken(response.data.nextPageToken || null);
    } catch (err) {
      setError("Failed to fetch videos. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [nextPageToken]);

  useEffect(() => {
    if (filteredData.length === 0) fetchVideos();
    console.log("this is me");
  }, [nextPageToken]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      // console.log(
      //   "top==",
      //   scrollTop,
      //   "sheight===",
      //   scrollHeight,
      //   "cheight",
      //   clientHeight
      // );

      if (
        scrollHeight - scrollTop <= clientHeight * 1.5 &&
        !loading &&
        nextPageToken
      ) {
        fetchVideos();
      }
    };
    console.log("This is vara prasad");

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPageToken]);

  // Filter videos based on search query
  const filteredData = videos.filter((video) =>
    video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex-1 bg-gray-50 p-6">
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((video, index) => (
            <MemoizedVideoCard
              key={video.id || `${video.snippet.title}-${index}`}
              video={video}
            />
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center mt-4">
            <Shimmer />
          </div>
        )}

        {/* No Videos Found */}
        {!loading && filteredData.length === 0 && (
          <div className="text-center col-span-full">No videos found.</div>
        )}
      </div>
    </div>
  );
};

const MemoizedVideoCard = React.memo(VideoCard);

export default VideoContainer;
