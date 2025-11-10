"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SelectedInstructorDetails from "./SelectedInstructor";

export default function InstructorList({ instructors, className }) {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const scrollRef = useRef(null);
  const router = useRouter();

  const goToDetails = (ins) => {
    router.push(`/instructorDetails/${encodeURIComponent(ins.name)}`);
  };

  //   if (newDuration >= 15 && newDuration <= maxDuration) {
  //     const costData = selectedInstructor
  //       ? ((selectedInstructor.hourlyrRate * newDuration) / 60) *
  //         currencyChangeFees
  //       : 0;
  //     setCost(costData);
  //     setDuration(newDuration);
  //   }
  // };

  // const confirmBooking = () => {
  //   if (!selectedSlot || !selectedInstructor) return;

  //   // const parts = selectedSlot.split("-");
  //   // const slotTimeStr = parts.slice(3).join("-").trim();
  //   // const startTimeStr = slotTimeStr.split("-")[0].trim();
  //   // const startMinutes = timeStrToMinutes(startTimeStr);
  //   // const endMinutes = startMinutes + duration;

  //   // alert(
  //   //   `Booked with ${selectedInstructor.name} from ${minutesToTimeStr(
  //   //     startMinutes
  //   //   )} to ${minutesToTimeStr(endMinutes)} (${duration} minutes).`
  //   // );

  //   setShowModal(false);
  //   setShowPaymentOverlay(true);
  // };

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
              return (
                <div
                  key={ins.name}
                  className={`shrink-0 w-56 bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer m-1 transition-shadow duration-500 ${
                    isSelected ? "ring-4 ring-blue-400" : ""
                  } ${className}`}
                  onClick={() => {
                    setSelectedInstructor(ins);
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
                  <button
                    className="mt-3 w-full bg-blue-400 text-white rounded py-1 hover:bg-blue-500 transition"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering parent onClick
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
