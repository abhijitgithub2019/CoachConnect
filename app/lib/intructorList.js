export function getInstructorList() {
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
          sessionCount: 35,
          totalMinutes: 1200,
          linkedinProfile: "https://linkedin.com/in/ushadeb",
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
          sessionCount: 25,
          totalMinutes: 1500,
          linkedinProfile: "https://linkedin.com/in/ushadeb",
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
      return INSTRUCTORS;
}