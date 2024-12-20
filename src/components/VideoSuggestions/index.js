import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../VideoCard";

const VideoSuggestions = ({ video }) => {
  var unitlist = ["", "K", "M", "G"];
  const formatNumber = (number) => {
    let sign = Math.sign(number);
    let unit = 0;

    while (Math.abs(number) >= 1000) {
      unit = unit + 1;
      number = Math.floor(Math.abs(number) / 100) / 10;
    }
    return sign * Math.abs(number) + unitlist[unit];
  };
  const getTimeAgo = (publishedAt) => {
    if (!publishedAt) return "Unknown";

    const publishedDate = new Date(publishedAt);
    const currentDate = new Date();

    const totalMonths =
      (currentDate.getFullYear() - publishedDate.getFullYear()) * 12 +
      (currentDate.getMonth() - publishedDate.getMonth());

    if (totalMonths < 12) {
      return totalMonths === 0
        ? "This month"
        : totalMonths === 1
        ? "1 month ago"
        : `${totalMonths} months ago`;
    }

    const years = Math.floor(totalMonths / 12);
    return years === 1 ? "1 year ago" : `${years} years ago`;
  };
  const [suggestionVideo, setSuggestionVideo] = useState([]);
  console.log(suggestionVideo);
  const getVideoSuggestion = async () => {
    const data = await fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=6&regionCode=IN&key=AIzaSyBgSV0_J-iSpl7iwucLGIOW8XCfPZCZy8s"
    );
    const json = await data.json();
    setSuggestionVideo(json.items);
  };
  useEffect(() => {
    getVideoSuggestion();
  }, []);
  return (
    <div>
      {suggestionVideo &&
        suggestionVideo.map((video) => {
          return (
            <div className="group bg-white shadow-md rounded-lg overflow-hidden mt-5">
              <img
                alt={video.snippet.localized.title}
                className="w-full h-48 object-cover"
                src={video.snippet.thumbnails.high.url}
              />
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt="img"
                    className="w-10 h-10 rounded-full"
                  />

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {video.snippet.localized.title}{" "}
                    </h3>
                    <p className="text-gray-600">
                      {video.snippet.channelTitle}
                    </p>
                    <p className="text-sm text-gray-600">{}</p>
                    <p className="text-xs text-gray-500">
                      {formatNumber(video.statistics.viewCount)} •{" "}
                      {getTimeAgo(video.snippet.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default VideoSuggestions;
