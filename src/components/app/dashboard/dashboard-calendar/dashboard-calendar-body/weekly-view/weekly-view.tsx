import { cn } from "@/lib/utils";
import * as React from "react";
import { CalendarEventListElement } from "@/zod-schemas/calendar-event-schemas";
import WeeklyViewCard from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/weekly-view/weekly-view-card";

interface Props {
  currentDate: Date;
  getEventsForDate: (date: Date) => CalendarEventListElement[];
  dayNames: string[];
}

const WeeklyView = ({ currentDate, getEventsForDate, dayNames }: Props) => {
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    return day;
  });
  return (
    <>
      <div className="min-w-full overflow-x-scroll h-full">
        <div className="grid grid-cols-7 gap-px bg-border min-w-[calc(200%)]">
          {dayNames.map((day, idx) => (
            <div
              key={day + idx}
              className="bg-primary text-primary-foreground p-4 text-center font-medium text-sm flex flex-col gap-2 rounded-t-sm"
            >
              <div>{day}</div>
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 gap-px bg-border min-w-[calc(200%)] h-full border-t-2">
          {weekDays.map((day, index) => {
            const events = getEventsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            return (
              <div key={index} className={cn("min-h-full p-2 bg-card")}>
                <div
                  className={cn(
                    "text-sm font-medium mb-2",
                    isToday &&
                      "bg-primary text-primary-foreground rounded-full w-6 h-6 flex flex-col items-center justify-center",
                    !isCurrentMonth && "text-muted-foreground",
                  )}
                >
                  <span>{day.getDate()}</span>
                </div>
                <div className="space-y-4">
                  {events.map((event) => (
                    <WeeklyViewCard
                      variant={event.meal ? "nutrition" : "workout"}
                      key={event.id}
                      calendarEvent={event}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WeeklyView;
