import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const { id, snippet, statistics } = video;
  const { title, thumbnails, channelTitle, publishedAt } = snippet;
  const { viewCount } = statistics;

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
  return (
    <Link
      to={`/video/${id}`}
      className="group bg-white shadow-md rounded-lg overflow-hidden"
    >
      <img
        loading="lazy"
        src={thumbnails.high.url}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <img
            src={thumbnails.default.url}
            alt="img"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
              {title}{" "}
            </h3>
            <p className="text-gray-600">{channelTitle}</p>
            <p className="text-sm text-gray-600">{}</p>
            <p className="text-xs text-gray-500">
              {formatNumber(viewCount)} • {getTimeAgo(publishedAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export const AdVideoCard = ({ video }) => {
  return (
    <div className="">
      <VideoCard video={video} />
    </div>
  );
};

export default VideoCard;
