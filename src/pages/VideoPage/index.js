import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
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
  const API_KEY = "AIzaSyBgSV0_J-iSpl7iwucLGIOW8XCfPZCZy8s";

  const [showText, setShowText] = useState(false);
  const notify = () => {
    setSubscribe(!subscribe);

    if (subscribe) return toast("Un Subscribed 😢");
    else toast("Subscribed Successfully");
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
    <div className=" flex w-full bg-white">
      <div className="p-9 mx-auto bg-white shadow-lg rounded-lg w-[70%] aspect-video">
        <div className="h-[80vh]">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
        <h1 className="text-3xl font-semibold mt-4 ">{title}</h1>
        <div className="py-4">
          <div className="flex items-center space-x-3 justify-between">
            <div className="flex items-center gap-3">
              <img
                src={thumbnails.default.url}
                alt="img"
                className="w-20 h-20 rounded-full"
              />
              <span>
                <p className="text-black-600 text-2xl font-semibold">
                  {channelTitle}
                </p>
                <p>10k Subscribers</p>
              </span>

              <button
                className="bg-black text-white font-bold p-2 rounded-full px-4 hover:bg-white hover:text-black hover:border"
                onClick={notify}
              >
                {!subscribe ? "Subscribe" : "Un subscribe"}
              </button>
              <ToastContainer />
            </div>
            <div className="text-gray-800 flex justify-center gap-2 mt-4">
              <div className="flex justify-center">
                <button className="inline-flex gap-1 items-center border rounded-s-lg p-2 hover:bg-black hover:text-white">
                  {likeCount} <AiFillLike style={{ fontSize: "25px" }} />
                </button>
                <button className="inline-flex items-center border rounded-e-lg p-2.5 py-3">
                  {" "}
                  <AiFillDislike style={{ fontSize: "25px" }} />
                </button>
              </div>

              <button className="inline-flex gap-1 items-center text-black p-2 border rounded-full px-4 hover:bg-black hover:text-white">
                <IoIosShareAlt style={{ fontSize: "25px" }} /> Share
              </button>
            </div>
          </div>
          {/* <span>{viewCount} likes</span> */}
          {description ? (
            <>
              {" "}
              <div className="bg-gray-200 border rounded-md p-4 mt-4">
                <p className="text-gray-600 font-semibold text-2xl mt-4">
                  Description
                </p>
                <p
                  className={`text-gray-600 mt-2 ${
                    showText ? "line-clamp-none" : "line-clamp-3"
                  }`}
                >
                  {description}
                </p>
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setShowText(!showText)}
                >
                  read more
                </div>
              </div>
            </>
          ) : null}
        </div>
        <CommentSection />
      </div>

      {/* Video suggestions */}
      <div className="w-[30%] p-4 bg-white">
        <VideoSuggestions />
      </div>
    </div>
  );
};

export default VideoPage;
