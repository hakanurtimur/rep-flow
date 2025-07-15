"use client";

import DashboardCalendarHeader from "@/components/dashboard/dashboard-calendar/dashboard-calendar-header";
import * as React from "react";
import { useState } from "react";
import { DashboardCalendarBody } from "@/components/dashboard/dashboard-calendar/dashboard-calendar-body";

const sampleEvents = [
  {
    id: "1",
    title: "First day of Pride Month",
    date: new Date(2025, 5, 1),
    color: "bg-purple-500",
    type: "holiday",
  },
  {
    id: "2",
    title: "How It Started",
    date: new Date(2025, 5, 2),
    color: "bg-blue-500",
    type: "meeting",
  },
  {
    id: "3",
    title: "Top Five Tips",
    date: new Date(2025, 5, 4),
    color: "bg-blue-500",
    type: "content",
  },
  {
    id: "4",
    title: "First day of Eid-al-Adha",
    date: new Date(2025, 5, 5),
    color: "bg-purple-500",
    type: "holiday",
  },
  {
    id: "5",
    title: "Behind The Scenes",
    date: new Date(2025, 5, 6),
    color: "bg-blue-500",
    type: "content",
  },
  {
    id: "6",
    title: "Rachel Karten June Tip #1",
    date: new Date(2025, 5, 9),
    color: "bg-blue-500",
    type: "tip",
  },
  {
    id: "7",
    title: "Product / Service Launch",
    date: new Date(2025, 5, 9),
    color: "bg-blue-500",
    type: "launch",
  },
  {
    id: "8",
    title: "Creator Spotlight",
    date: new Date(2025, 5, 11),
    color: "bg-blue-500",
    type: "content",
  },
  {
    id: "9",
    title: "Rachel Karten June Tip #2",
    date: new Date(2025, 5, 13),
    color: "bg-blue-500",
    type: "tip",
  },
  {
    id: "10",
    title: "Product Demo",
    date: new Date(2025, 5, 13),
    color: "bg-blue-500",
    type: "demo",
  },
  {
    id: "11",
    title: "Introducing AS...",
    date: new Date(2025, 5, 13),
    time: "12:02 PM",
    color: "bg-gray-600",
    type: "post",
  },
  {
    id: "12",
    title: "Father's Day",
    date: new Date(2025, 5, 15),
    color: "bg-purple-500",
    type: "holiday",
  },
  {
    id: "13",
    title: "Client Testimonial",
    date: new Date(2025, 5, 16),
    color: "bg-blue-500",
    type: "testimonial",
  },
  {
    id: "14",
    title: "Introducing AS...",
    date: new Date(2025, 5, 16),
    time: "12:45 PM",
    color: "bg-gray-600",
    type: "post",
  },
  {
    id: "15",
    title: "Limited-Time Offer",
    date: new Date(2025, 5, 18),
    color: "bg-blue-500",
    type: "promotion",
  },
  {
    id: "16",
    title: "Rachel Karten June Tip #3",
    date: new Date(2025, 5, 18),
    color: "bg-blue-500",
    type: "tip",
  },
  {
    id: "17",
    title: "Juneteenth",
    date: new Date(2025, 5, 19),
    color: "bg-purple-500",
    type: "holiday",
  },
  {
    id: "18",
    title: "Industry Meme",
    date: new Date(2025, 5, 20),
    color: "bg-blue-500",
    type: "content",
  },
];

const DashboardCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date(2025, 5, 13));
  const [calendarMode, setCalendarMode] = useState<
    "monthly" | "yearly" | "weekly" | "daily"
  >("monthly");
  const [isNavigateTriggered, setIsNavigateTriggered] = useState<
    "prev" | "next" | null
  >(null);

  const navigateDate = (direction: "prev" | "next") => {
    setIsNavigateTriggered(direction);
    const newDate = new Date(currentDate);

    switch (calendarMode) {
      case "daily":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
        break;
      case "weekly":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        break;
      case "monthly":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
        break;
      case "yearly":
        newDate.setFullYear(
          newDate.getFullYear() + (direction === "next" ? 1 : -1),
        );
        break;
    }

    setCurrentDate(newDate);
    setTimeout(() => {
      setIsNavigateTriggered(null);
    }, 300);
  };

  return (
    <div className="w-full flex flex-col gap-8 h-full">
      <DashboardCalendarHeader
        calendarMode={calendarMode}
        setCalendarMode={setCalendarMode}
        date={currentDate}
        setDate={(date: Date | undefined) => {
          if (date) {
            setCurrentDate(date);
          }
        }}
        navigateDate={navigateDate}
      />
      <div className="min-w-full flex-1">
        <DashboardCalendarBody
          isNavigateTriggered={isNavigateTriggered}
          currentDate={currentDate}
          viewMode={calendarMode}
          events={sampleEvents}
        />
      </div>
    </div>
  );
};

export default DashboardCalendar;
