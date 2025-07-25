"use client";

import * as React from "react";
import { CalendarEventListElement } from "@/zod-schemas/calendar-event-schemas";
import AnimatePresenceWrapper from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/animate-presence-wrapper";
import DailyView from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/daily-view/daily-view";
import WeeklyView from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/weekly-view/weekly-view";
import MonthlyView from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/monthly-view/monthly-view";
import YearlyView from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/yearly-view/yearly-view";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dayNamesShort = ["S", "M", "T", "W", "T", "F", "S"];

interface Props {
  isNavigateTriggered: "prev" | "next" | null;
  viewMode: "daily" | "weekly" | "monthly" | "yearly";
  currentDate: Date;
  events: CalendarEventListElement[];
}

export function DashboardCalendarBody({
  isNavigateTriggered,
  viewMode,
  currentDate,
  events,
}: Props) {
  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString(),
    );
  };

  const renderDailyView = () => {
    const events = getEventsForDate(currentDate);
    console.log(events);

    return (
      <AnimatePresenceWrapper
        key={currentDate.toString() + "day"}
        isNavigateTriggered={isNavigateTriggered}
      >
        <DailyView events={events} currentDate={currentDate} />
      </AnimatePresenceWrapper>
    );
  };

  const renderWeeklyView = () => {
    return (
      <AnimatePresenceWrapper
        key={currentDate.toString() + "week"}
        className="flex items-center justify-center h-full min-w-full min-h-full max-h-full flex-col"
        isNavigateTriggered={isNavigateTriggered}
      >
        <WeeklyView
          currentDate={currentDate}
          getEventsForDate={getEventsForDate}
          dayNames={dayNames}
        />
      </AnimatePresenceWrapper>
    );
  };

  const renderMonthlyView = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return (
      <AnimatePresenceWrapper
        key={currentDate.toString() + "month"}
        isNavigateTriggered={isNavigateTriggered}
        className="flex items-center justify-center h-full min-w-full min-h-full max-h-full flex-col"
      >
        <MonthlyView
          dayNames={dayNames}
          getEventsForDate={getEventsForDate}
          currentDate={currentDate}
          days={days}
        />
      </AnimatePresenceWrapper>
    );
  };

  const renderYearlyView = () => {
    return (
      <AnimatePresenceWrapper
        isNavigateTriggered={isNavigateTriggered}
        key={currentDate.toString() + "month"}
      >
        <YearlyView
          currentDate={currentDate}
          monthNames={monthNames}
          dayNamesShort={dayNamesShort}
          getEventsForDate={getEventsForDate}
        />
      </AnimatePresenceWrapper>
    );
  };

  const renderCurrentView = () => {
    switch (viewMode) {
      case "daily":
        return renderDailyView();
      case "weekly":
        return renderWeeklyView();
      case "monthly":
        return renderMonthlyView();
      case "yearly":
        return renderYearlyView();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-background h-full">
      <div className="border-t h-full">{renderCurrentView()}</div>
    </div>
  );
}
