"use client";
import React from "react";

const mediaImages = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  image: "https://picsum.photos/200/300",
}));

const Media = () => {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-app-palePrimary">
      <h4 className="text-app-primary text-lg font-semibold sticky top-0 w-full bg-white pt-3 px-3">
        Media
      </h4>
      <div className="flex flex-wrap gap-2 mt-3 px-3">
        {mediaImages.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt="media-pic"
            className="w-20 h-20 rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Media;
