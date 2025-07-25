"use client";

import DashboardCalendarHeader from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-header";
import * as React from "react";
import { useState } from "react";
import { DashboardCalendarBody } from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/dashboard-calendar-body";
import { useListCalendarEvents } from "@/hooks/calendar-event/use-list-calendar-events";
import LoadingOverlay from "@/components/ui/loading-overlay";

const DashboardCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date(Date.now()));
  const [calendarMode, setCalendarMode] = useState<
    "monthly" | "yearly" | "weekly" | "daily"
  >("daily");
  const [isNavigateTriggered, setIsNavigateTriggered] = useState<
    "prev" | "next" | null
  >(null);

  const query = useListCalendarEvents();

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

  if (query.isLoading || !query.data) {
    return <LoadingOverlay fullScreen={false} />;
  }

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
          events={query.data.map((ce) => {
            return {
              ...ce,
              date: new Date(ce.date),
            };
          })}
        />
      </div>
    </div>
  );
};

export default DashboardCalendar;
