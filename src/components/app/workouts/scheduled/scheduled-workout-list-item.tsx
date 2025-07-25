import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarIcon,
  ClockIcon,
  EditIcon,
  MousePointer2Icon,
  TimerIcon,
} from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import DifficultyRating from "@/components/ui/difficulty-rating";
import { Separator } from "@/components/ui/separator";
import {
  EventColorKey,
  ScheduledWorkoutListElement,
} from "@/zod-schemas/scheduled-workout-schemas";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EditScheduledWorkoutDialog from "@/components/app/workouts/scheduled/edit-scheduled-workout-dialog/edit-scheduled-workout-dialog";
import { eventColorMap } from "@/lib/event-color-map";

interface Props {
  scheduledWorkout: ScheduledWorkoutListElement;
  viewVariant: "list" | "card";
}

const ScheduledWorkoutListItem = ({ scheduledWorkout, viewVariant }: Props) => {
  const displayDate = format(scheduledWorkout.scheduledAt, "MMMM do, yyyy");
  const displayTime = format(scheduledWorkout.scheduledAt, "HH:mm");

  const rawKey = scheduledWorkout.calendarEvent.colorKey;
  const key = (
    rawKey && rawKey in eventColorMap ? rawKey : "muted"
  ) as keyof typeof eventColorMap;

  const { bg, fg } = eventColorMap[key];

  return (
    <>
      {viewVariant === "card" ? (
        <Card
          style={{
            backgroundColor: `var(${bg})`,
            color: `var(${fg})`,
          }}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href={`/workouts/list/${scheduledWorkout.workout.id}?from=/workouts/scheduled`}
                      className="flex gap-2 items-center font-semibold hover:underline"
                    >
                      <MousePointer2Icon
                        className="w-3 h-3"
                        style={{
                          color: `var(${fg})`,
                          fill: `var(${fg})`,
                        }}
                      />
                      {scheduledWorkout.workout.name}{" "}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Go To Workout Details</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <EditScheduledWorkoutDialog
                      model={{
                        id: scheduledWorkout.id,
                        scheduledAt: scheduledWorkout.scheduledAt,
                        workoutId: scheduledWorkout.workout.id,
                        colorKey:
                          (scheduledWorkout.calendarEvent
                            .colorKey as EventColorKey) ?? undefined,
                      }}
                    >
                      <Button size="icon" variant={"ghost"}>
                        <EditIcon />
                      </Button>
                    </EditScheduledWorkoutDialog>
                  </TooltipTrigger>
                  <TooltipContent>Update Scheduled Workout</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription
              style={{
                color: `var(${fg})`,
              }}
            >
              {scheduledWorkout.workout.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-start w-full">
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
            <div className="flex flex-row gap-2 text-xs font-semibold h-6">
              <div className="flex flex-row items-center gap-2 font-semibold">
                <TimerIcon className="w-4 h-4" />{" "}
                <span>{scheduledWorkout.workout.duration} min</span>
              </div>
              <Separator
                orientation={"vertical"}
                className={"h-full min-h-full"}
              />
              <DifficultyRating
                flameColor={`var(${fg})`}
                value={scheduledWorkout.workout.difficulty}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <TableRow key={scheduledWorkout.workout.id}>
          <TableCell className="font-medium">
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href={`/workouts/list/${scheduledWorkout.workout.id}?from=/workouts/scheduled`}
                      className="flex gap-2 items-center hover:underline"
                    >
                      <MousePointer2Icon className="w-3 h-3 fill-primary text-primary" />
                      {scheduledWorkout.workout.name}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Go To Workout Details</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TableCell>

          <TableCell className="font-medium">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-start">
                  <div className="max-w-24 w-24 truncate">
                    {scheduledWorkout.workout.description}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {scheduledWorkout.workout.description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
          <TableCell className="font-medium">
            <div className="flex flex-row items-center gap-2 font-semibold">
              <CalendarIcon className="w-4 h-4" />
              <span>{displayDate}</span>
              <span>{displayTime}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-row items-center gap-2 font-semibold">
              <TimerIcon className="w-4 h-4" />{" "}
              <span>{scheduledWorkout.workout.duration} min</span>
            </div>
          </TableCell>
          <TableCell>
            <DifficultyRating value={scheduledWorkout.workout.difficulty} />
          </TableCell>
          <TableCell className="flex items-center justify-end gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <EditScheduledWorkoutDialog
                    model={{
                      id: scheduledWorkout.id,
                      scheduledAt: scheduledWorkout.scheduledAt,
                      workoutId: scheduledWorkout.workout.id,
                      colorKey:
                        (scheduledWorkout.calendarEvent
                          .colorKey as EventColorKey) ?? undefined,
                    }}
                  >
                    <Button size="icon" variant={"ghost"}>
                      <EditIcon />
                    </Button>
                  </EditScheduledWorkoutDialog>
                </TooltipTrigger>
                <TooltipContent>Edit Scheduled Workout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ScheduledWorkoutListItem;
