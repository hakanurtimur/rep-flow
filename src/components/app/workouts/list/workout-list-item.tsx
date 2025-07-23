import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CalendarPlusIcon, EyeIcon, TimerIcon } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import DifficultyRating from "@/components/ui/difficulty-rating";
import Link from "next/link";
import { WorkoutListElement } from "@/zod-schemas/workout-schemas";
import { Separator } from "@/components/ui/separator";
import WorkoutListItemHoverCard from "@/components/app/workouts/list/workout-list-item-hover-card";
import ScheduleWorkoutDialog from "@/components/app/workouts/list/schedule-workout-dialog/schedule-workout-dialog";

interface Props {
  workout: WorkoutListElement;
  viewVariant: "list" | "card";
}

const WorkoutListItem = ({ workout, viewVariant }: Props) => {
  return (
    <>
      {viewVariant === "card" ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex-1">{workout.name}</CardTitle>

              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <ScheduleWorkoutDialog workoutId={workout.id}>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant={"tertiary"}>
                          <CalendarPlusIcon />
                        </Button>
                      </TooltipTrigger>
                    </ScheduleWorkoutDialog>

                    <TooltipContent>Schedule Workout</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/workouts/list/${workout.id}`}>
                        <Button size="icon" variant={"ghost"}>
                          <EyeIcon />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>See Details & Update</TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
            <CardDescription>{workout.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-start w-full">
            <div className="flex flex-row gap-2 text-xs font-semibold h-6">
              <div className="flex flex-row items-center gap-2 font-semibold">
                <TimerIcon className="w-4 h-4" />{" "}
                <span>{workout.duration} min</span>
              </div>
              <Separator
                orientation={"vertical"}
                className={"h-full min-h-full"}
              />
              <DifficultyRating value={workout.difficulty} />
            </div>
            <WorkoutListItemHoverCard workout={workout} />
          </CardContent>
        </Card>
      ) : (
        <TableRow key={workout.id}>
          <TableCell className="font-medium">{workout.name}</TableCell>
          <TableCell className="font-medium">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-start">
                  <div className="max-w-24 w-24 truncate">
                    {workout.description}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{workout.description}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
          <TableCell></TableCell>
          <TableCell>
            <WorkoutListItemHoverCard workout={workout} />
          </TableCell>
          <TableCell>
            <DifficultyRating value={workout.difficulty} />
          </TableCell>
          <TableCell className="flex items-center justify-end gap-2">
            <TooltipProvider>
              <Tooltip>
                <ScheduleWorkoutDialog workoutId={workout.id}>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant={"tertiary"}>
                      <CalendarPlusIcon />
                    </Button>
                  </TooltipTrigger>
                </ScheduleWorkoutDialog>

                <TooltipContent>Schedule Workout</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/workouts/list/${workout.id}`}>
                    <Button size="icon" variant={"ghost"}>
                      <EyeIcon />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>See Details & Update</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default WorkoutListItem;
