"use client";

import { useDraggable } from "@dnd-kit/core";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { WorkoutTemplateOption } from "@/zod-schemas/workout-template-schemas";

interface DraggableCardProps {
  card: WorkoutTemplateOption;
}

export function DraggableCard({ card }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`bg-tertiary text-tertiary-foreground cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md ${
        isDragging ? "opacity-50 shadow-lg scale-105" : ""
      }`}
      {...listeners}
      {...attributes}
    >
      <CardHeader className="pb-2 flex flex-row items-center space-y-0">
        <div className="flex-1">
          <CardTitle className="text-sm text-foreground">{card.name}</CardTitle>
        </div>
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">
          {card.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
