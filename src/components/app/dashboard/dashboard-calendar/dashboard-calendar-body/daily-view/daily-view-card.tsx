import { CalendarEventListElement } from "@/zod-schemas/calendar-event-schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import * as React from "react";
import { format } from "date-fns";
import { eventColorMap } from "@/lib/event-color-map";
import { CalendarIcon, ClockIcon, MousePointer2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import UpdateScheduledWorkoutStatusButton from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/update-calendar-event-status-button/update-scheduled-workout-status-button";
import StartCalendarEventButton from "@/components/app/dashboard/dashboard-calendar/dashboard-calendar-body/start-calendar-event-button/start-calendar-event-button";

interface Props {
  calendarEvent: CalendarEventListElement;
  variant: "nutrition" | "workout";
}

const DailyViewCard = ({ calendarEvent, variant }: Props) => {
  const displayDate = format(calendarEvent.date, "MMMM do, yyyy");
  const displayTime = format(calendarEvent.date, "HH:mm");

  const rawKey = calendarEvent.colorKey;
  const key = (
    rawKey && rawKey in eventColorMap ? rawKey : "muted"
  ) as keyof typeof eventColorMap;

  const { bg, fg } = eventColorMap[key];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center">
        <Badge
          style={{
            color: `var(${fg}`,
            backgroundColor: `var(${bg}`,
          }}
          className="flex flex-row items-center gap-1 text-sm"
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
      <Card
        key={calendarEvent.id}
        style={{
          backgroundColor: `var(${bg})`,
          color: `var(${fg})`,
        }}
        className="relative"
      >
        <CardHeader>
          <div className="flex items-center justify-between">
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
            </TooltipProvider>
            <div className="flex gap-2 items-center">
              {variant === "workout" && (
                <StartCalendarEventButton foregroundColor={fg} />
              )}
              {variant === "workout" && (
                <UpdateScheduledWorkoutStatusButton
                  completed={calendarEvent.scheduledWorkout!.completed}
                  workoutId={calendarEvent.scheduledWorkout!.id}
                  foregroundColor={fg}
                />
              )}
            </div>
          </div>
          <CardDescription
            style={{
              color: `var(${fg})`,
            }}
          >
            {variant === "nutrition"
              ? calendarEvent.nutrition!.description
              : calendarEvent.workout!.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-2 text-xs font-semibold h-6">
            <div className="flex flex-row items-center gap-2 font-semibold">
              <CalendarIcon className="w-4 h-4" />
              <span>{displayDate}</span>
            </div>
            <Separator
              orientation={"vertical"}
              className={"h-full min-h-full"}
            />
            <div className="flex flex-row items-center gap-2 font-semibold">
              <ClockIcon className="w-4 h-4" />
              <span>{displayTime}</span>
            </div>
          </div>
          {variant === "workout" &&
            calendarEvent.scheduledWorkout!.completed && (
              <Badge className="absolute bottom-6 right-5" variant="tertiary">
                Completed
              </Badge>
            )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyViewCard;
