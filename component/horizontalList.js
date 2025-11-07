"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import PaymentOptions from "./paymentOptions";

export default function InstructorList({ instructors, className }) {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState(15); // minutes
  const [maxDuration, setMaxDuration] = useState(0); // max minutes
  const [cost, setCost] = useState(0);
  const [currencyChangeFees, setCurrencyChangeFees] = useState(1);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
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

  const minutesToTimeStr = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    if (h === 0) h = 12;
    else if (h > 12) h -= 12;
    return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const timeStrToMinutes = (timeStr) => {
    // If time has "-", use start time only
    if (timeStr.includes("-")) {
      const parts = timeStr.split("-");
      return timeStrToMinutes(parts[0].trim());
    }
    let num = parseInt(timeStr.match(/\d+/)[0], 10);
    const isPM = /PM/i.test(timeStr);
    const isAM = /AM/i.test(timeStr);

    if (isPM && num !== 12) num += 12;
    if (isAM && num === 12) num = 0;

    return num * 60;
  };

  const closeModal = () => {
    setShowPaymentOverlay(false);
    setCost(0);
  };

  const openBookingModal = (slotKey) => {
    let intialcurrencyChangeFees = 1;
    if (selectedInstructor?.currencyType === "DOLLARS") {
      intialcurrencyChangeFees = 86;
      setCurrencyChangeFees(86);
    }
    const costData = selectedInstructor
      ? ((selectedInstructor.hourlyrRate * 15) / 60) * intialcurrencyChangeFees
      : 0;
    setCost(costData);
    setSelectedSlot(slotKey);
    setDuration(15); // minimum 15 minutes
    // SlotKey example: "2025-11-06-9AM - 3PM" or "2025-11-06-1PM"
    const parts = slotKey.split("-");
    // Get last part which is time string
    const slotTimeStr = parts.slice(3).join("-").trim(); // handle cases with "-" in time slot label
    // Parse start and end times from slotTimeStr
    const timeRanges = slotTimeStr.split("-").map((t) => t.trim());
    const startMins = timeStrToMinutes(timeRanges[0]);
    let endMins = 0;
    if (timeRanges.length > 1) {
      endMins = timeStrToMinutes(timeRanges[1]);
    } else {
      // If no end time given, assume max 1 hour booking from start
      endMins = startMins + 60;
    }
    // Handle midnight wrap (if end < start, add 24h)
    if (endMins <= startMins) endMins += 24 * 60;

    setMaxDuration(endMins - startMins);
    setShowModal(true);
  };

  const handleDurationChange = (newDuration) => {
    if (newDuration >= 15 && newDuration <= maxDuration) {
      const costData = selectedInstructor
        ? ((selectedInstructor.hourlyrRate * newDuration) / 60) *
          currencyChangeFees
        : 0;
      setCost(costData);
      setDuration(newDuration);
    }
  };

  const confirmBooking = () => {
    if (!selectedSlot || !selectedInstructor) return;

    // const parts = selectedSlot.split("-");
    // const slotTimeStr = parts.slice(3).join("-").trim();
    // const startTimeStr = slotTimeStr.split("-")[0].trim();
    // const startMinutes = timeStrToMinutes(startTimeStr);
    // const endMinutes = startMinutes + duration;

    // alert(
    //   `Booked with ${selectedInstructor.name} from ${minutesToTimeStr(
    //     startMinutes
    //   )} to ${minutesToTimeStr(endMinutes)} (${duration} minutes).`
    // );

    setShowModal(false);
    setShowPaymentOverlay(true);
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
                    <div className="w-40 font-semibold whitespace-nowrap">
                      {`${dayString} (${formattedDate}) -`}
                    </div>

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
                                  className="mt-2 bg-green-600 text-white px-5 py-1 rounded hover:bg-green-700 text-xs whitespace-nowrap cursor-pointer"
                                  onClick={() => openBookingModal(slotKey)}
                                >
                                  Book
                                </button>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="italic text-gray-400 shrink-0">
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

        {showModal && (
          <div className="fixed inset-0 bg-blue-200 bg-opacity-10 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold mb-4">
                Adjust Booking Duration
              </h3>
              <p className="mb-4">
                Selected Time:{" "}
                {(() => {
                  if (!selectedSlot) return "";
                  const parts = selectedSlot.split("-");
                  const timeStr = parts.slice(3).join("-").trim();
                  const timeRanges = timeStr.split("-").map((t) => t.trim());
                  const start = timeStrToMinutes(timeRanges[0]);
                  const end = start + duration;
                  return `${minutesToTimeStr(start)} - ${minutesToTimeStr(
                    end
                  )}`;
                })()}
              </p>
              <p className="mb-4 font-medium">
                Fees: {"₹"}
                {`${cost.toFixed(2)}/-`}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <button
                  className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  onClick={() => handleDurationChange(duration - 15)}
                  disabled={duration <= 15}
                >
                  -
                </button>
                <span>{duration} minutes</span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  onClick={() => handleDurationChange(duration + 15)}
                  disabled={duration + 15 > maxDuration}
                >
                  +
                </button>
              </div>
              <button
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition cursor-pointer"
                onClick={confirmBooking}
              >
                Confirm Booking & Pay
              </button>
            </div>
          </div>
        )}
      </div>
      {showPaymentOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              aria-label="Close payment modal"
            >
              &times;
            </button>

            {/* PaymentOptions Component with amount */}
            <PaymentOptions amount={cost} />
          </div>
        </div>
      )}
    </div>
  );
}
