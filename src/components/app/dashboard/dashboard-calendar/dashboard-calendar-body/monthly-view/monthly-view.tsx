import { CalendarEventListElement } from "@/zod-schemas/calendar-event-schemas";
import { cn } from "@/lib/utils";
import MonthlyViewCard from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/monthly-view/monthly-view-card";

interface Props {
  dayNames: string[];
  getEventsForDate: (date: Date) => CalendarEventListElement[];
  currentDate: Date;
  days: Date[];
}

const MonthlyView = ({
  dayNames,
  getEventsForDate,
  currentDate,
  days,
}: Props) => {
  return (
    <div className="grid grid-cols-7 gap-px bg-border h-full w-full">
      {dayNames.map((day) => (
        <div
          key={day}
          className="bg-primary text-primary-foreground p-4 text-center font-medium text-sm"
        >
          {day}
        </div>
      ))}
      {days.map((day, index) => {
        const events = getEventsForDate(day);
        const isToday = day.toDateString() === new Date().toDateString();
        const isCurrentMonth = day.getMonth() === currentDate.getMonth();

        return (
          <div key={index} className="bg-card min-h-[100px] p-2">
            <div
              className={cn(
                "text-sm font-medium mb-1",
                isToday &&
                  "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center",
                !isCurrentMonth && "text-muted-foreground",
              )}
            >
              {day.getDate()}
            </div>
            <div className="space-y-1">
              {events.slice(0, 2).map((event) => (
                <MonthlyViewCard
                  variant={event.nutrition ? "nutrition" : "workout"}
                  calendarEvent={event}
                  key={event.id}
                />
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
  );
};

export default MonthlyView;
