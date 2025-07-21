"use client";

import React, { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { EyeIcon, X } from "lucide-react";
import {
  ExerciseForTemplateInput,
  ExerciseTemplateForDragDrop,
} from "@/zod-schemas/template-exercise-schemas";
import UpdateExerciseDialog from "@/components/workouts/templates/template-details/template-details-content/template-details-content-edit/exercise-drag-drop/update-exercise-dialog/update-exercise-dialog";

interface SortableCardProps {
  exercise: ExerciseTemplateForDragDrop;
  onRemove: (cardId: string) => void;
  onUpdate: (data: ExerciseForTemplateInput) => void;
  isPreview?: boolean;
}

export function SortableCard({
  exercise,
  onRemove,
  onUpdate,
  isPreview = false,
}: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id ?? "" });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(exercise.id ?? "");
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`cursor-grab bg-secondary flex flex-row items-center gap-2 text-secondary-foreground rounded-sm active:cursor-grabbing transition-all max-w-full w-full px-3 py-1.5 duration-300 hover:shadow-md ${
        isDragging ? "opacity-50" : "opacity-100"
      } ${isPreview ? "opacity-60 border-dashed border-tertiary bg-tertiary/50 text-tertiary-foreground" : ""}`}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center gap-2 flex-1">
        <p className="w-full truncate font-semibold text-sm">{exercise.name}</p>
      </div>
      {!isPreview && (
        <div className="flex flex-row items-center justify-center gap-2">
          <UpdateExerciseDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onCancel={() => setIsDialogOpen(false)}
            onConfirm={(data) => onUpdate(data)}
            exerciseToUpdate={exercise}
          >
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="h-6 w-6 p-0 hover:bg-primary/10 hover:text-primary cursor-pointer"
              onClick={() => {}}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
            >
              <EyeIcon className="w-3 h-3" />
            </Button>
          </UpdateExerciseDialog>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={handleRemoveClick}
            className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
