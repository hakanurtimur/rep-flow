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
import { ClockIcon, MousePointer2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import UpdateScheduledWorkoutStatusButton from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/update-calendar-event-status-button/update-scheduled-workout-status-button";
import StartWorkoutSessionButton from "@/components/app/shared/start-workout-session-button";

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
        className={cn(
          "text-xs px-3 py-1.5 rounded-sm flex flex-col gap-2 relative",
        )}
        style={{
          color: `var(${fg}`,
          backgroundColor: `var(${bg}`,
        }}
      >
        {variant === "workout" && calendarEvent.scheduledWorkout?.completed && (
          <Badge className="absolute top-1.5 right-3" variant="tertiary">
            Completed
          </Badge>
        )}
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
          <div className="flex gap-2 items-center">
            {variant === "workout" &&
              !calendarEvent.scheduledWorkout?.completed && (
                <StartWorkoutSessionButton
                  scheduledWorkoutId={calendarEvent.scheduledWorkout?.id ?? ""}
                  variant={"icon"}
                  fg={fg}
                />
              )}
            {variant === "workout" && (
              <UpdateScheduledWorkoutStatusButton
                completed={calendarEvent.scheduledWorkout?.completed ?? false}
                workoutId={calendarEvent.scheduledWorkout?.id ?? ""}
                foregroundColor={fg}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyViewCard;
