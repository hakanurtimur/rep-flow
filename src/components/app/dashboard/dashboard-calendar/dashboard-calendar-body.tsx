"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

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
  events: {
    id: string;
    title: string;
    date: Date;
    time?: string;
    color: string;
  }[];
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

    return (
      <AnimatePresence>
        <motion.div
          key={currentDate.toString()}
          initial={{
            opacity: 0,
            x:
              isNavigateTriggered === "prev"
                ? -100
                : isNavigateTriggered === "next"
                  ? 100
                  : 0,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center justify-center h-full min-w-full"
        >
          <div className="flex flex-col h-full min-w-full">
            <div className="grid grid-cols-1 gap-4 p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  {currentDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <div className="space-y-2">
                  {events.length > 0 ? (
                    events.map((event) => (
                      <Card key={event.id} className="p-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn("w-3 h-3 rounded-full", event.color)}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{event.title}</p>
                            {event.time && (
                              <p className="text-xs text-muted-foreground">
                                {event.time}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No events scheduled
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderWeeklyView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());

    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      return day;
    });

    return (
      <AnimatePresence>
        <motion.div
          key={currentDate.toString() + "week"}
          initial={{
            opacity: 0,
            x:
              isNavigateTriggered === "prev"
                ? -100
                : isNavigateTriggered === "next"
                  ? 100
                  : 0,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center justify-center h-full min-w-full min-h-full max-h-full flex-col"
        >
          <div className="grid grid-cols-7 gap-px bg-border min-w-full">
            {dayNames.map((day, idx) => (
              <div
                key={day + idx}
                className="bg-background p-4 text-center font-medium text-sm"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-7 gap-px bg-border min-w-full h-full border-t-2">
            {weekDays.map((day, index) => {
              const events = getEventsForDate(day);
              const isToday = day.toDateString() === new Date().toDateString();
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();

              return (
                <div key={index} className="bg-background min-h-full p-2">
                  <div
                    className={cn(
                      "text-sm font-medium mb-2",
                      isToday &&
                        "bg-black text-white rounded-full w-6 h-6 flex items-center justify-center",
                      !isCurrentMonth && "text-muted-foreground",
                    )}
                  >
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "text-xs p-1 rounded text-white truncate",
                          event.color,
                        )}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
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
      <AnimatePresence>
        <motion.div
          key={currentDate.toString() + "week"}
          initial={{
            opacity: 0,
            x:
              isNavigateTriggered === "prev"
                ? -100
                : isNavigateTriggered === "next"
                  ? 100
                  : 0,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex items-center justify-center h-full min-w-full min-h-full max-h-full flex-col"
        >
          <div className="grid grid-cols-7 gap-px bg-border h-full w-full">
            {dayNames.map((day) => (
              <div
                key={day}
                className="bg-background p-4 text-center font-medium text-sm"
              >
                {day}
              </div>
            ))}
            {days.map((day, index) => {
              const events = getEventsForDate(day);
              const isToday = day.toDateString() === new Date().toDateString();
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();

              return (
                <div key={index} className="bg-background min-h-[100px] p-2">
                  <div
                    className={cn(
                      "text-sm font-medium mb-1",
                      isToday &&
                        "bg-black text-white rounded-full w-6 h-6 flex items-center justify-center",
                      !isCurrentMonth && "text-muted-foreground",
                    )}
                  >
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "text-xs p-1 rounded text-white truncate",
                          event.color,
                        )}
                      >
                        {event.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{events.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderYearlyView = () => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const month = new Date(currentDate.getFullYear(), i, 1);
      return month;
    });

    return (
      <div className="grid grid-cols-3 gap-6 p-6">
        {months.map((month, index) => {
          const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
          const startDate = new Date(firstDay);
          startDate.setDate(startDate.getDate() - firstDay.getDay());

          const days = [];
          const current = new Date(startDate);

          for (let i = 0; i < 42; i++) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }

          return (
            <div key={index} className="space-y-2">
              <h3 className="font-medium text-center">
                {monthNames[month.getMonth()]}
              </h3>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {dayNamesShort.map((day, idx) => (
                  <div
                    key={day + idx}
                    className="text-center font-medium text-muted-foreground p-1"
                  >
                    {day}
                  </div>
                ))}
                {days.map((day, dayIndex) => {
                  const events = getEventsForDate(day);
                  const isCurrentMonth = day.getMonth() === month.getMonth();
                  const hasEvents = events.length > 0;

                  return (
                    <div
                      key={dayIndex}
                      className={cn(
                        "text-center p-1 relative",
                        !isCurrentMonth && "text-muted-foreground",
                        hasEvents && isCurrentMonth && "bg-accent rounded",
                      )}
                    >
                      {day.getDate()}
                      {hasEvents && isCurrentMonth && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
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
