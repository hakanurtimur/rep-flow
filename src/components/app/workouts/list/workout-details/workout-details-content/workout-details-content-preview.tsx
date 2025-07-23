import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ActivityIcon,
  BicepsFlexedIcon,
  DumbbellIcon,
  TimerIcon,
} from "lucide-react";
import DifficultyRating from "@/components/ui/difficulty-rating";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedWorkout } from "@/zod-schemas/workout-schemas";

interface Props {
  workout: ExtendedWorkout;
}

const WorkoutDetailsContentPreview = ({ workout }: Props) => {
  return (
    <>
      <p className="text-lg font-semibold">
        {workout.description || "No description provided."}
      </p>
      <div className="flex flex-row gap-2 text-sm font-semibold h-6">
        <Separator orientation={"vertical"} className={"h-full min-h-full"} />

        <div className="flex flex-row items-center gap-2 text-sm font-semibold">
          <TimerIcon className="w-4 h-4" /> <span>{workout.duration} min</span>
        </div>
        <Separator orientation={"vertical"} className={"h-full min-h-full"} />
        <DifficultyRating value={workout.difficulty} />
        <Separator orientation={"vertical"} className={"h-full min-h-full"} />
        <Badge variant="tertiary">
          <BicepsFlexedIcon className="w-4 h-4 fill-tertiary-foreground" />
          {workout.exercises.length} Exercises
        </Badge>
      </div>

      <div className="flex flex-row items-center gap-2 text-sm font-semibold"></div>

      <div className="space-y-4 w-full">
        {workout.exercises.map((te, index) => (
          <Card key={te.id} className="flex flex-col gap-4 w-1/2">
            <CardHeader className="flex gap-4 items-center">
              <h3 className="text-base font-semibold">
                {index + 1} - {te.exercise.name}
              </h3>
              <DifficultyRating value={te.exercise.totalDifficulty} />
            </CardHeader>
            <CardContent className="flex flex-row gap-8">
              {/*<div className="flex flex-col gap-2">*/}
              {/*<Badge className="text-base">*/}
              {/*  <BicepsFlexedIcon className="w-4 h-4 fill-primary-foreground" />*/}
              {/*  Muscle Groups*/}
              {/*</Badge>*/}
              {/*{te.exercise.muscleGroupLinks.map((link) => (*/}
              {/*  <Badge*/}
              {/*    key={link.muscleGroupId}*/}
              {/*    className="text-sm flex flex-row gap-4 items-center justify-between w-full"*/}
              {/*    variant="secondary"*/}
              {/*  >*/}
              {/*    {link.muscleGroup.name}:*/}
              {/*    <DifficultyRating value={link.difficulty} />*/}
              {/*  </Badge>*/}
              {/*))}*/}
              {/*</div>*/}

              <div className="flex flex-col gap-2">
                <Badge variant="tertiary" className="text-base">
                  <ActivityIcon className="w-4 h-4" />
                  {te.sets.length} Sets
                </Badge>
                {te.sets.map((set) => (
                  <div
                    key={set.id}
                    className="gap-4 grid grid-cols-3 text-sm font-semibold"
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 text-sm"
                    >
                      <ActivityIcon className="w-4 h-4" />
                      {set.reps} reps
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 text-sm"
                    >
                      <DumbbellIcon className="w-4 h-4" />
                      {set.weight ?? 0}kg
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 text-sm"
                    >
                      <TimerIcon className="w-4 h-4" />
                      {set.restTime ?? 0}s
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default WorkoutDetailsContentPreview;
