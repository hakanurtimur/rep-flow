import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { BicepsFlexedIcon } from "lucide-react";
import { WorkoutTemplateList } from "@/zod-schemas/workout-template-schemas";

interface Props {
  template: WorkoutTemplateList;
}

const TemplateListItemHoverCard = ({ template }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="flex gap-2 items-center text-sm font-semibold cursor-pointer">
        <Badge variant="secondary">
          <BicepsFlexedIcon className="w-4 h-4 fill-secondary-foreground" />
          <span>{template.templateExercises.length} Exercises</span>
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="flex max-w-md flex-col gap-2">
        {template.templateExercises.map((e) => (
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

export default TemplateListItemHoverCard;
