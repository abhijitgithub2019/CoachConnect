"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SelectedInstructorDetails from "./SelectedInstructor";

export default function InstructorList({ instructors, className }) {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const scrollRef = useRef(null);
  const router = useRouter();

  const goToDetails = (ins) => {
    router.push(`/instructorDetails/${encodeURIComponent(ins.name)}`);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200, // adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const toggleFavorite = (name) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div>
        <div className="relative max-w-[960px] -ml-10">
          {/* Conditionally render left arrow if more than 4 instructors */}
          {instructors.length > 4 && (
            <button
              aria-label="Scroll Left"
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow hover:bg-gray-100"
            >
              &#8592;
            </button>
          )}

          {/* Scroll container showing 4 cards by width */}
          <div
            ref={scrollRef}
            className="flex space-x-5 overflow-x-auto no-scrollbar py-4 scroll-smooth w-[956px]"
          >
            {instructors.map((ins) => {
              const isSelected = selectedInstructor?.name === ins.name;
              const isFavorite = favorites.includes(ins.name);
              return (
                <div
                  key={ins.name}
                  className={`shrink-0 w-56 bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    isSelected ? "ring-4 ring-blue-400" : "hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedInstructor(ins)}
                >
                  {/* Image with Overlay Favorite Button */}
                  <div className="relative">
                    <Image
                      src={ins.avatar}
                      alt={ins.name}
                      className="h-56 w-56 object-cover mb-3 rounded-lg"
                      height={200}
                      width={200}
                    />

                    {/* Overlay Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent parent onClick
                        toggleFavorite(ins.name);
                      }}
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      className={`absolute top-2 right-2 p-2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200 ${
                        isFavorite ? "text-red-500" : "text-gray-800"
                      }`}
                    >
                      {isFavorite ? "❤️" : "🤍"}
                    </button>
                  </div>

                  {/* Instructor Name */}
                  <div className="font-medium text-center">{ins.name}</div>

                  {/* More Button */}
                  <button
                    className="mt-3 w-full bg-blue-500 text-white rounded py-1 hover:bg-blue-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToDetails(ins);
                    }}
                  >
                    More..
                  </button>
                </div>
              );
            })}
          </div>

          {/* Conditionally render right arrow if more than 4 instructors */}
          {instructors.length > 4 && (
            <button
              aria-label="Scroll Right"
              onClick={() => scroll("right")}
              className="absolute -right-70 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow hover:bg-gray-100"
            >
              &#8594;
            </button>
          )}
        </div>
        {selectedInstructor && (
          <SelectedInstructorDetails
            selectedInstructor={selectedInstructor}
          ></SelectedInstructorDetails>
        )}
      </div>
    </div>
  );
}
