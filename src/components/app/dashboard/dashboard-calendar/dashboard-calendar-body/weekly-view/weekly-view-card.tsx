import { format } from "date-fns";
import { eventColorMap } from "@/lib/event-color-map";
import { CalendarEventListElement } from "@/zod-schemas/calendar-event-schemas";
import { cn } from "@/lib/utils";
import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  MousePointer2Icon,
  PlayIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  calendarEvent: CalendarEventListElement;
  variant: "nutrition" | "workout";
}

const WeeklyViewCard = ({ calendarEvent, variant }: Props) => {
  const displayDate = format(calendarEvent.date, "MMMM do, yyyy");
  const displayTime = format(calendarEvent.date, "HH:mm");

  const rawKey = calendarEvent.colorKey;
  const key = (
    rawKey && rawKey in eventColorMap ? rawKey : "muted"
  ) as keyof typeof eventColorMap;

  const { bg, fg } = eventColorMap[key];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center">
        <Badge
          style={{
            color: `var(${fg}`,
            backgroundColor: `var(${bg}`,
          }}
          className="flex flex-row items-center gap-1"
        >
          <ClockIcon className="w-4 h-4" />
          <span>{displayTime}</span>
        </Badge>
        <Separator
          className="flex-1"
          style={{
            backgroundColor: `var(${bg}`,
          }}
        />
      </div>
      <div
        className={cn("text-xs px-3 py-1.5 rounded-sm flex flex-col gap-2")}
        style={{
          color: `var(${fg}`,
          backgroundColor: `var(${bg}`,
        }}
      >
        <div>
          {displayDate}-{displayTime}
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={
                    variant === "nutrition"
                      ? "/??"
                      : `/workouts/list/${calendarEvent.workout!.id}?from=/dashboard`
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
                    : calendarEvent.workout!.name}
                </Link>
              </TooltipTrigger>
              <TooltipContent className="capitalize">
                Go To {variant} Details
              </TooltipContent>
            </Tooltip>
            <div className="flex gap-2 items-center">
              {variant === "workout" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant={"ghost"}>
                      <PlayIcon
                        style={{
                          color: `var(${fg})`,
                          fill: `var(${fg})`,
                        }}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start Workout</TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant={"ghost"}>
                    <CheckIcon
                      style={{
                        color: `var(${fg})`,
                      }}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="capitalize">
                  Mark as completed {variant}
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default WeeklyViewCard;
