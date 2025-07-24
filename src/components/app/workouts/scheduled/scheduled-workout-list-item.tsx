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
import { ScheduledWorkoutListElement } from "@/zod-schemas/scheduled-workout-schemas";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  scheduledWorkout: ScheduledWorkoutListElement;
  viewVariant: "list" | "card";
}

const ScheduledWorkoutListItem = ({ scheduledWorkout, viewVariant }: Props) => {
  const displayDate = format(scheduledWorkout.scheduledAt, "MMMM do, yyyy"); // July 8th, 2025
  const displayTime = format(scheduledWorkout.scheduledAt, "HH:mm");
  return (
    <>
      {viewVariant === "card" ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href={`/workouts/list/${scheduledWorkout.workout.id}?from=/workouts/scheduled`}
                      className="flex gap-2 items-center font-semibold hover:underline"
                    >
                      <MousePointer2Icon className="w-3 h-3 fill-primary text-primary" />
                      {scheduledWorkout.workout.name}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Go To Workout Details</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>
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
              <DifficultyRating value={scheduledWorkout.workout.difficulty} />
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
                  <Button size="icon" variant={"ghost"}>
                    <EditIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Update Scheduled Workout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ScheduledWorkoutListItem;
