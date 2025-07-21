import { ExerciseTemplateForDragDrop } from "@/zod-schemas/template-exercise-schemas";
import { EyeIcon } from "lucide-react";

interface Props {
  activeExercise: ExerciseTemplateForDragDrop;
}

const DragOverlayCard = ({ activeExercise }: Props) => {
  return (
    <div
      className={`bg-tertiary w-80 flex flex-row items-center gap-2 text-tertiary-foreground rounded-sm active:cursor-grabbing transition-all max-w-80 px-3 py-1.5 duration-300 hover:shadow-md`}
    >
      <EyeIcon className="w-4 h-4" />
      <p className="w-full truncate font-semibold text-sm">
        {activeExercise.name}
      </p>
    </div>
  );
};

export default DragOverlayCard;
