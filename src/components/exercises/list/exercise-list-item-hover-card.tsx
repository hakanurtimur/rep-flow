import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ExtendedExercises } from "@/zod-schemas/exercise-schemas";
import { Badge } from "@/components/ui/badge";
import DifficultyRating from "@/components/ui/difficulty-rating";
import { EyeIcon } from "lucide-react";

interface Props {
  exercise: ExtendedExercises;
}

const ExerciseListItemHoverCard = ({ exercise }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="flex gap-2 items-center text-sm font-semibold cursor-pointer">
        <Badge variant="default">
          <EyeIcon className="w-4 h-4" />
          <span>Muscle Groups</span>
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="flex max-w-md flex-col gap-2">
        {exercise.muscleGroupLinks.map((link) => (
          <div
            key={link.muscleGroupId}
            className="flex flex-row justify-between items-center"
          >
            <Badge variant="secondary">{link.muscleGroup.name}</Badge>
            <DifficultyRating value={link.difficulty} />
          </div>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
};

export default ExerciseListItemHoverCard;
