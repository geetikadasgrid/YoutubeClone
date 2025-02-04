import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import axios from "axios";
import VideoSuggestions from "../../components/VideoSuggestions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentSection from "../../components/CommentSection";

const VideoPage = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [subscribe, setSubscribe] = useState(false);
  const [error, setError] = useState(null);
  const [showText, setShowText] = useState(false);
  const API_KEY = "AIzaSyBgSV0_J-iSpl7iwucLGIOW8XCfPZCZy8s";

  const notify = () => {
    setSubscribe(!subscribe);
    if (subscribe) return toast("Unsubscribed 😢");
    toast("Subscribed Successfully!");
  };

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${API_KEY}`
        );
        setVideoDetails(response.data.items[0]);
      } catch (err) {
        setError("Failed to load video details.");
        console.error(err);
      }
    };

    fetchVideoDetails();
  }, [id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!videoDetails) return <div>Loading...</div>;

  const { snippet, statistics } = videoDetails;
  const { title, description, channelTitle, thumbnails } = snippet;
  const { viewCount, likeCount } = statistics;

  return (
    <div className="flex flex-col lg:flex-row bg-white">
      {/* Main Video Section */}
      <div className="p-4 lg:w-2/3 w-full bg-white">
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
        <h1 className="text-xl lg:text-3xl font-semibold mt-4 line-clamp-1 md:line-clamp-3 ">
          {title}
        </h1>
        <div className="py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <img
                src={thumbnails.default.url}
                alt="Channel Logo"
                className="w-12 h-12 lg:w-20 lg:h-20 rounded-full"
              />
              <div>
                <p className="text-black-600 text-lg lg:text-2xl font-semibold">
                  {channelTitle}
                </p>
                <p className="text-gray-600 text-sm">10k Subscribers</p>
              </div>
              <button
                className="bg-black text-white font-bold p-2 rounded-full px-4 hover:bg-white hover:text-black hover:border"
                onClick={notify}
              >
                {!subscribe ? "Subscribe" : "Unsubscribe"}
              </button>
              <ToastContainer />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-start lg:justify-center gap-2 mt-4 lg:mt-0">
              <button className="inline-flex gap-1 items-center border rounded-l-lg p-2 hover:bg-black hover:text-white">
                {likeCount} <AiFillLike style={{ fontSize: "20px" }} />
              </button>
              <button className="inline-flex items-center border rounded-r-lg p-2 hover:bg-black hover:text-white">
                <AiFillDislike style={{ fontSize: "20px" }} />
              </button>
              <button className="inline-flex gap-1 items-center border rounded-full p-2 px-4 hover:bg-black hover:text-white">
                <IoIosShareAlt style={{ fontSize: "20px" }} /> Share
              </button>
            </div>
          </div>

          {/* Video Description */}
          {description && (
            <div className="bg-gray-200 border rounded-md p-4 mt-4">
              <p className="text-gray-600 font-semibold text-lg lg:text-2xl">
                Description
              </p>
              <p
                className={`text-gray-600 mt-2 ${
                  showText ? "line-clamp-none" : "line-clamp-3"
                }`}
              >
                {description}
              </p>
              <button
                className="text-blue-600 cursor-pointer"
                onClick={() => setShowText(!showText)}
              >
                {showText ? "Show Less" : "Read More"}
              </button>
            </div>
          )}
        </div>
        <CommentSection />
      </div>

      {/* Video Suggestions */}
      <div className="p-4 lg:w-1/3 w-full bg-white">
        <VideoSuggestions />
      </div>
    </div>
  );
};

export default VideoPage;
