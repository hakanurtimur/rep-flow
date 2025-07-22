import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { BicepsFlexedIcon, MousePointer2Icon } from "lucide-react";
import { WorkoutListElement } from "@/zod-schemas/workout-schemas";
import Link from "next/link";

interface Props {
  workout: WorkoutListElement;
}

const WorkoutListItemHoverCard = ({ workout }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="flex gap-2 items-center text-sm font-semibold cursor-pointer">
        <Badge variant="secondary">
          <BicepsFlexedIcon className="w-4 h-4 fill-secondary-foreground" />
          <span>{workout.exercises.length} Exercises</span>
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="flex max-w-md flex-col gap-2 bg-primary text-primary-foreground">
        {workout.templates.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Included Templates:</span>
            <div className="flex flex-row gap-2 items-center">
              {workout.templates.map((template) => (
                <Link
                  key={template.template.id}
                  href={`/workouts/templates/${template.template.id}?by=/workouts/list`}
                >
                  <Badge variant="tertiary">
                    <MousePointer2Icon className="w-4 h-4 fill-tertiary-foreground" />
                    {template.template.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
        {workout.exercises.map((e) => (
          <div
            key={e.id}
            className="flex flex-row justify-between items-center"
          >
            <Badge variant="secondary">{e.exercise.name}</Badge>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Total Sets:</span>
              <span>{e.sets.length}</span>
            </div>
          </div>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
};

export default WorkoutListItemHoverCard;
