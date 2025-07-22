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
import { ExtendedWorkoutTemplate } from "@/zod-schemas/workout-template-schemas";

interface Props {
  template: ExtendedWorkoutTemplate;
}

const TemplateDetailsContentPreview = ({ template }: Props) => {
  return (
    <>
      <p className="text-lg font-semibold">
        {template.description || "No description provided."}
      </p>
      <div className="flex flex-row gap-2 text-sm font-semibold h-6">
        <Badge variant={template.isSystem ? "outline" : "default"}>
          {template.isSystem ? "System Template" : "Your Template"}
        </Badge>
        <Separator orientation={"vertical"} className={"h-full min-h-full"} />

        {template.isSystem && (
          <>
            <Badge variant={"destructive"}>Not Editable</Badge>
            <Separator
              orientation={"vertical"}
              className={"h-full min-h-full"}
            />
          </>
        )}

        <div className="flex flex-row items-center gap-2 text-sm font-semibold">
          <TimerIcon className="w-4 h-4" /> <span>{template.duration} min</span>
        </div>
        <Separator orientation={"vertical"} className={"h-full min-h-full"} />
        <DifficultyRating value={template.difficulty} />
        <Separator orientation={"vertical"} className={"h-full min-h-full"} />
        <Badge variant="tertiary">
          <BicepsFlexedIcon className="w-4 h-4 fill-tertiary-foreground" />
          {template.templateExercises.length} Exercises
        </Badge>
      </div>

      <div className="flex flex-row items-center gap-2 text-sm font-semibold"></div>

      <div className="space-y-4 w-full">
        {template.templateExercises.map((te, index) => (
          <Card key={te.id} className="flex flex-col gap-4 w-1/2">
            <CardHeader className="flex gap-4 items-center">
              <h3 className="text-base font-semibold">
                {index + 1} - {te.exercise.name}
              </h3>
              <DifficultyRating value={te.exercise.totalDifficulty} />
            </CardHeader>
            <CardContent className="flex flex-row gap-8">
              <div className="flex flex-col gap-2">
                <Badge className="text-base">
                  <BicepsFlexedIcon className="w-4 h-4 fill-primary-foreground" />
                  Muscle Groups
                </Badge>
                {te.exercise.muscleGroupLinks.map((link) => (
                  <Badge
                    key={link.muscleGroupId}
                    className="text-sm flex flex-row gap-4 items-center justify-between w-full"
                    variant="secondary"
                  >
                    {link.muscleGroup.name}:
                    <DifficultyRating value={link.difficulty} />
                  </Badge>
                ))}
              </div>

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

export default TemplateDetailsContentPreview;
