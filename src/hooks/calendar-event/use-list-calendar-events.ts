import { useQuery } from "@tanstack/react-query";
import { CalendarEventListElement } from "@/zod-schemas/calendar-event-schemas";
import { getCalendarEvents } from "@/api/calendar-event-api";

export const useListCalendarEvents = () => {
  return useQuery<CalendarEventListElement[]>({
    queryKey: ["calendar-events"],
    queryFn: async () => await getCalendarEvents(),
  });
};
