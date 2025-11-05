
"use client";

import { useRef } from "react";

export default function TopicFilterBar({
  topics,
  selected,
  onSelect,
  classname,
}) {
  const scrollRef = useRef(null);

  // Function to scroll left or right by 100px (adjustable)
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -100 : 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`relative flex items-center ${classname}`}>
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        aria-label="Scroll left"
      >
        &#8592;
      </button>

      {/* Scrollable topics container */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto no-scrollbar py-2 px-10"
      >
        {topics.map((topic) => (
          <button
            key={topic}
            className={`px-4 py-1 rounded-full whitespace-nowrap text-xl
              ${
                selected === topic
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }
              transition`}
            onClick={() => onSelect(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        aria-label="Scroll right"
      >
        &#8594;
      </button>
    </div>
  );
}
