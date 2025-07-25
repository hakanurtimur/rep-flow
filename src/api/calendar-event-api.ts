// GET
import api from "@/lib/axios-client";
import { CalendarEventListElement } from "@/zod-schemas/calendar-event-schemas";

export const getCalendarEvents = async (): Promise<
  CalendarEventListElement[]
> => {
  const res = await api.get<CalendarEventListElement[]>("calendar-event");
  return res.data;
};
