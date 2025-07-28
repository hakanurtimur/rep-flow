import { cn } from "@/lib/utils";
import { CalendarEventListElement } from "@/zod-schemas/calendar-event-schemas";
import { MousePointer2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import * as React from "react";
import { eventColorMap } from "@/lib/event-color-map";

interface Props {
  calendarEvent: CalendarEventListElement;
  variant: "nutrition" | "workout";
}
const MonthlyViewCard = ({ calendarEvent, variant }: Props) => {
  const rawKey = calendarEvent.colorKey;
  const key = (
    rawKey && rawKey in eventColorMap ? rawKey : "muted"
  ) as keyof typeof eventColorMap;

  const { bg, fg } = eventColorMap[key];

  return (
    <div
      className={cn("text-xs px-3 py-1.5 rounded-sm flex flex-col gap-2")}
      style={{
        color: `var(${fg}`,
        backgroundColor: `var(${bg}`,
      }}
    >
      <div className="flex flex-row justify-between items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={
                  variant === "nutrition"
                    ? "/nutrition-plans/list"
                    : `/workouts/list/${calendarEvent.workout?.id}?from=/dashboard`
                }
                className="flex gap-2 items-center font-semibold hover:underline"
              >
                <MousePointer2Icon
                  className="w-3 h-3"
                  style={{
                    color: `var(${fg})`,
                    fill: `var(${fg})`,
                  }}
                />
                {variant === "nutrition"
                  ? "Nutrition"
                  : calendarEvent.workout?.name}
              </Link>
            </TooltipTrigger>
            <TooltipContent className="capitalize">
              Go To {variant} Details
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MonthlyViewCard;
