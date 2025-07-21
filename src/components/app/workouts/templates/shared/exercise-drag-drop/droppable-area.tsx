"use client";

import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

interface DroppableAreaProps {
  children: ReactNode;
}

export function DroppableArea({ children }: DroppableAreaProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "drop-area",
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-80 max-h-[21.2rem] overflow-y-scroll p-4 rounded-lg border-2 border-dashed transition-all duration-200 ${
        isOver
          ? "border-primary bg-primary/5 shadow-inner"
          : "border-border bg-background hover:border-primary/50"
      }`}
    >
      {children}
    </div>
  );
}
