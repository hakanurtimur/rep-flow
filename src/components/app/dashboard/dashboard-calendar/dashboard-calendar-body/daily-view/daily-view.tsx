import DailyViewCard from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/daily-view/daily-view-card";
import * as React from "react";
import { CalendarEventListElement } from "@/zod-schemas/calendar-event-schemas";

interface Props {
  currentDate: Date;
  events: CalendarEventListElement[];
}

const DailyView = ({ currentDate, events }: Props) => {
  return (
    <div className="flex flex-col h-full min-w-full bg-card">
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-foreground">
            {currentDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((event) => (
                <DailyViewCard
                  key={event.id}
                  variant={event.nutrition ? "nutrition" : "workout"}
                  calendarEvent={event}
                />
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
  );
};

export default DailyView;
