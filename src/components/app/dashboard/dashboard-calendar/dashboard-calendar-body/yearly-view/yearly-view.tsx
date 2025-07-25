import { CalendarEventListElement } from "@/zod-schemas/calendar-event-schemas";
import { cn } from "@/lib/utils";

interface Props {
  currentDate: Date;
  monthNames: string[];
  dayNamesShort: string[];
  getEventsForDate: (date: Date) => CalendarEventListElement[];
}

const YearlyView = ({
  currentDate,
  monthNames,
  dayNamesShort,
  getEventsForDate,
}: Props) => {
  const months = Array.from({ length: 12 }, (_, i) => {
    return new Date(currentDate.getFullYear(), i, 1);
  });
  return (
    <div className="w-full grid grid-cols-3 gap-6 p-6">
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

export default YearlyView;
