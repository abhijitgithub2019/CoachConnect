"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function InstructorList({ instructors, className }) {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const scrollRef = useRef(null);
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200, // adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
     <div className="relative max-w-[960px] ml-[-40px]">
  {/* Left arrow button */}
  <button
    aria-label="Scroll Left"
    onClick={() => scroll("left")}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow hover:bg-gray-100"
  >
    &#8592;
  </button>

  {/* Scroll container showing 4 cards by width */}
  <div
    ref={scrollRef}
    className="flex space-x-5 overflow-x-auto no-scrollbar py-4 scroll-smooth w-[956px]"
  >
    {instructors.map((ins) => {
      const isSelected = selectedInstructor?.name === ins.name;
      return (
        <div
          key={ins.name}
          className={`shrink-0 w-56 bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer m-1 transition-shadow duration-500 ${
            isSelected ? "ring-4 ring-blue-400" : ""
          } ${className}`}
          onClick={() => {
            setSelectedInstructor(ins);
            setSelectedSlot(null);
          }}
        >
          <Image
            src={ins.avatar}
            alt={ins.name}
            className="h-56 w-56 object-cover mb-3 rounded-sm"
            height={200}
            width={200}
          />
          <div className="font-medium">{ins.name}</div>
        </div>
      );
    })}
  </div>

  {/* Right arrow button */}
  <button
    aria-label="Scroll Right"
    onClick={() => scroll("right")}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow hover:bg-gray-100"
  >
    &#8594;
  </button>
</div>


      {selectedInstructor && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">
            Select a Time Slot for {selectedInstructor.name}
          </h3>
          <div className="flex flex-col space-y-4">
            {getNext7Days().map((dateObj) => {
              const dateString = dateObj.toISOString().split("T")[0];
              const dayString = dateObj.toLocaleDateString(undefined, {
                weekday: "short",
              });
              const formattedDate = dateObj.toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });

              const slots =
                selectedInstructor.availableTimes?.[dateString] || [];

              return (
                <div key={dateString} className="flex items-center">
                  {/* Fixed day and date */}
                  <div className="w-40 font-semibold whitespace-nowrap">
                    {`${dayString} (${formattedDate}) -`}
                  </div>

                  {/* Horizontally scrollable time slots */}
                  <div className="flex space-x-4 overflow-x-auto no-scrollbar flex-1">
                    {slots.length > 0 ? (
                      slots.map((time) => {
                        const slotKey = `${dateString}-${time}`;
                        const isSelected = selectedSlot === slotKey;

                        return (
                          <div
                            className="flex flex-col items-center min-w-[60px] shrink-0"
                            key={time}
                          >
                            <button
                              className={`px-3 py-1 rounded text-sm border min-w-[60px] shrink-0 transition ${
                                isSelected
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                              }`}
                              onClick={() => setSelectedSlot(slotKey)}
                            >
                              {time}
                            </button>
                            {isSelected && (
                              <button
                                className="mt-2 bg-green-600 text-white px-5 py-1 rounded hover:bg-green-700 text-xs whitespace-nowrap"
                                onClick={() =>
                                  alert(
                                    `Booked slot: ${slotKey} with ${selectedInstructor.name}`
                                  )
                                }
                              >
                                Book
                              </button>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="italic text-gray-400 flex-shrink-0">
                        No slots
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
