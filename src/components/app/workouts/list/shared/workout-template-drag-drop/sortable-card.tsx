"use client";

import type React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, X } from "lucide-react";
import { WorkoutTemplateOption } from "@/zod-schemas/workout-template-schemas";

interface SortableCardProps {
  card: WorkoutTemplateOption;
  onRemove: (cardId: string) => void;
}

export function SortableCard({ card, onRemove }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(card.id);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`bg-tertiary text-tertiary-foreground cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md ${
        isDragging ? "bg-secondary/50 text-secondary-foreground shadow-lg" : ""
      }`}
      {...listeners}
      {...attributes}
    >
      <CardHeader className="pb-2 flex flex-row items-center space-y-0">
        <div className="flex items-center space-x-2 flex-1">
          <GripVertical className="h-4 w-4 text-foreground" />
          <CardTitle className="text-sm">{card.name}</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemoveClick}
          className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
        >
          <X className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <CardDescription>{card.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
