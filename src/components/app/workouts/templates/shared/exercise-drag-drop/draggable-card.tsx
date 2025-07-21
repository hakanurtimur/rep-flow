"use client";

import { useDraggable } from "@dnd-kit/core";
import { EyeIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import DifficultyRating from "@/components/ui/difficulty-rating";
import { ExerciseTemplateForDragDrop } from "@/zod-schemas/template-exercise-schemas";

interface DraggableCardProps {
  exercise: ExerciseTemplateForDragDrop;
}

export function DraggableCard({ exercise }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: exercise.id ?? "",
  });
  const style = {};

  return (
    <HoverCard>
      <HoverCardTrigger
        ref={setNodeRef}
        style={style}
        className={`cursor-grab bg-primary flex flex-row items-center gap-2 text-primary-foreground rounded-sm active:cursor-grabbing transition-all max-w-full w-full px-3 py-1.5 duration-300 hover:shadow-md ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
        {...listeners}
        {...attributes}
      >
        <EyeIcon className="w-4 h-4" />
        <p className="w-full truncate font-semibold text-sm">{exercise.name}</p>
      </HoverCardTrigger>
      <HoverCardContent className="w-[28rem] flex max-w-md flex-col gap-2 bg-tertiary text-tertiary-foreground">
        <p className="max-w-full truncate text-sm font-semibold">
          {exercise.name}
        </p>
        <p className="max-w-full truncate text-sm ">{exercise.description}</p>
        <div className="flex w-full items-center gap-2">
          <span className="text-sm font-semibold">Exercise Difficulty:</span>
          <DifficultyRating value={exercise.totalDifficulty} />
        </div>
        {exercise.muscleGroupLinks.map((link, idx) => (
          <div key={idx} className="flex flex-row justify-between items-center">
            <Badge>{link.muscleGroup.name}</Badge>
            <DifficultyRating value={link.difficulty} />
          </div>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}
