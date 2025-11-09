"use client";
import { useState } from "react";
import InstructorList from "../../component/horizontalList";
import TopicFilterBar from "../../component/topicFilter";
import MenuBar from "../menu/nav/page";
import SearchBar from "../../component/searchbar";
import Image from "next/image";
import BentWallImages from "../../component/bentWallImages";

export default function CoachLandingPage() {
  const TOPICS = [
    "Career",
    "Wellness",
    "Education",
    "Leadership",
    "Nutrition",
    "Meditation",
  ];
  const INSTRUCTORS = [
    {
      name: "Usha Deb",
      avatar: "/images/usha.jpg",
      topics: ["Career", "Education"],
      availableTimes: {
        // date strings in yyyy-mm-dd format with available time slots
        "2025-11-09": ["10AM - 12PM", "4PM - 5PM"],
        "2025-11-10": [
          "9AM - 11AM",
          "1PM - 2PM",
          "3PM - 4PM",
          "5PM - 8PM",
          "10PM -12PM",
        ],
        "2025-11-11": ["9AM - 11AM", "3PM - 4PM"],
        // add more dates and slots as needed
      },
      hourlyrRate: 2000,
      currencyType: "INR",
    },
    {
      name: "Jane Smith",
      avatar: "/images/jane.jpg",
      topics: ["Career"],
      availableTimes: {
        "2025-11-10": ["1PM - 3PM"],
        "2025-11-11": ["2AM-4AM", "6PM-7PM"],
      },
      hourlyrRate: 20,
      currencyType: "DOLLARS",
    },
    {
      name: "Amit Verma",
      avatar: "/images/amit.jpg",
      topics: ["Wellness", "Education"],
      availableTimes: {
        "2025-11-11": ["1AM-3PM"],
        "2025-11-12": ["2PM-4PM", "6AM-7AM"],
      },
      hourlyrRate: 400,
      currencyType: "INR",
    },
    {
      name: "Lisa Lee",
      avatar: "/images/lisa.jpg",
      topics: ["Leadership", "Career"],
      availableTimes: {
        "2025-11-06": ["1AM-3AM"],
        "2025-11-08": ["2PM-4PM", "6PM-8PM"],
      },
      hourlyrRate: 10,
      currencyType: "DOLLARS",
    },
    {
      name: "John Doe",
      avatar: "/images/john.jpg",
      topics: ["Wellness"],
      availableTimes: {
        "2025-11-06": ["1AM-3AM"],
        "2025-11-08": ["2PM-4PM", "6PM-8PM"],
      },
      hourlyrRate: 12,
      currencyType: "DOLLARS",
    },
    {
      name: "Abhijit Patra",
      avatar: "/images/abhijit.jpg",
      topics: ["Wellness", "Career"],
      availableTimes: {
        "2025-11-06": ["1AM-3AM"],
        "2025-11-08": ["2PM-4PM", "6PM-8PM"],
      },
      hourlyrRate: 1200,
      currencyType: "INR",
    },
    {
      name: "Gopal Mandal",
      avatar: "/images/gopal.jpg",
      topics: ["Leadership", "Education"],
      hourlyrRate: 1200,
      currencyType: "INR",
    },
    {
      name: "Minho",
      avatar: "/images/minho.jpg",
      topics: ["Career", "Education"],
      availableTimes: {
        // date strings in yyyy-mm-dd format with available time slots
        "2025-11-06": ["10AM - 12AM", "4PM - 5PM"],
        "2025-11-07": [
          "9AM - 11AM",
          "12AM - 4AM",
          "3PM - 4PM",
          "5PM - 8PM",
          "10PM -12PM",
        ],
        "2025-11-08": ["9-11", "3-4"],
        // add more dates and slots as needed
      },
      hourlyrRate: 14,
      currencyType: "DOLLARS",
    },
    // ...more
  ];
  const [selectedTopic, setSelectedTopic] = useState("Career");
  const [search, setSearch] = useState("");

  // Filter by topic if one is selected
  let filtered = INSTRUCTORS;
  if (selectedTopic) {
    filtered = filtered.filter((inst) => inst.topics.includes(selectedTopic));
  }

  if (search.trim()) {
    filtered = filtered.filter(
      (inst) =>
        inst.name.toLowerCase().includes(search.toLowerCase()) ||
        inst.topics.some((topic) =>
          topic.toLowerCase().includes(search.toLowerCase())
        )
    );
  }
  return (
    <div className="bg-zinc-50 min-h-screen w-full  bg-linear-to-br from-white via-blue-50 to-blue-100">
      <MenuBar isLogOut={true}></MenuBar>
      <BentWallImages></BentWallImages>
      <div>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6 text-left px-20">
            Find Your Perfect 1:1 Coach
          </h2>
          {/* Search bar with avatar */}
          <div className="flex items-center space-x-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by topic or coach name"
              className="text-lg p-3"
            />
            <Image
              src="/images/searchAvatar.jpg"
              alt="UserAvatar"
              className="h-30 w-40 rounded-full object-cover"
              height={200}
              width={300}
            />
          </div>

          {/* Topic filter and instructor list with margin-top */}
          <div className="mt-7">
            <TopicFilterBar
              topics={TOPICS}
              selected={selectedTopic}
              onSelect={(topic) => setSelectedTopic(topic)}
              className="text-4xl space-x-6 py-4"
            />
            {filtered.length ? (
              <InstructorList
                instructors={filtered}
                className="py-6 space-x-6"
              />
            ) : (
              <h2 className="text-2xl font-semibold mb-6 text-center">
                No instructor is Available
              </h2>
            )}
          </div>
        </div>
      </div>
      <svg
        className="absolute top-0 left-0 w-64 h-64 opacity-20"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="100" fill="#e0e7ff" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-48 h-48 opacity-10"
        viewBox="0 0 200 200"
      >
        <rect width="200" height="200" fill="#bae6fd" />
      </svg>
    </div>
  );
}
