"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AdvertiseToHome() {
  const sessions = [
    {
      id: 1,
      title: "Exercise",
      description: "Personalized fitness routines.",
      imgSrc: "/images/exercise.jpg",
    },
    {
      id: 2,
      title: "Leadership",
      description: "Grow leadership skills.",
      imgSrc: "/images/leadership.jpg",
    },
    {
      id: 3,
      title: "Mental Health",
      description: "Confidential support.",
      imgSrc: "/images/mental_health.jpg",
    },
    {
      id: 4,
      title: "Meditation",
      description: "Guided meditation.",
      imgSrc: "/images/meditation.jpg",
    },
    {
      id: 5,
      title: "Nutrition",
      description: "Healthy eating plans.",
      imgSrc: "/images/nutrition.jpg",
    },
    {
      id: 6,
      title: "Time Management",
      description: "Better productivity.",
      imgSrc: "/images/time_management.jpg",
    },
    // Add more items as needed
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleCount = 4;
  const length = sessions.length;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setStartIndex((prev) => (prev + 1) % length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, length]);

  const visibleSessions = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleSessions.push(sessions[(startIndex + i) % length]);
  }

  return (
    <div className="w-full mt-12 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-emerald-700">
        One-to-one Session
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-7xl">
        {visibleSessions.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex flex-col items-center shadow-lg hover:shadow-xl  hover:-translate-y-1  transition-transform duration-700 ease-in-out"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Image
              src={item.imgSrc}
              alt={item.title}
              width={180}
              height={180}
              className="w-60 h-60 object-cover mb-3 border-4 border-cyan-200 rounded-full shadow-lg"
            />
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">
              {item.title}
            </h3>
            <p  className="text-gray-600 text-sm text-center">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
