"use client";

import { useEffect, useMemo, useState } from "react";
import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DraggableCard } from "./draggable-card";
import { DroppableArea } from "./droppable-area";
import { SortableCard } from "./sortable-card";
import { WorkoutTemplateOption } from "@/zod-schemas/workout-template-schemas";
import { SearchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface Props {
  templateOptions: WorkoutTemplateOption[];
  existedTemplates: WorkoutTemplateOption[];
  onChange: (data: string[]) => void;
}

export default function WorkoutTemplateDragDrop({
  templateOptions,
  onChange,
  existedTemplates,
}: Props) {
  const [availableTemplates, setAvailableTemplates] =
    useState<WorkoutTemplateOption[]>(templateOptions);
  const [droppedTemplates, setDroppedTemplates] =
    useState<WorkoutTemplateOption[]>(existedTemplates);
  const [activeTemplate, setActiveTemplate] =
    useState<WorkoutTemplateOption | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return availableTemplates;

    return availableTemplates.filter((e) => {
      const target = `
      ${e.name.toLowerCase()} ${e.description?.toLowerCase()}`;
      return target.includes(q);
    });
  }, [searchQuery, availableTemplates]);

  useEffect(() => {
    const ids = droppedTemplates.map((te) => {
      return te.id;
    });
    onChange(ids);
  }, [droppedTemplates, onChange]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card = [...availableTemplates, ...droppedTemplates].find(
      (card) => card.id === active.id,
    );
    setActiveTemplate(card || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find if the active item is in available cards
    const activeCard = availableTemplates.find((card) => card.id === activeId);
    const isOverDropArea = overId === "drop-area";
    const isOverDroppedCard = droppedTemplates.some(
      (card) => card.id === overId,
    );

    // If dragging from available cards to drop area or over a dropped card
    if (activeCard && (isOverDropArea || isOverDroppedCard)) {
      // Remove from available cards
      setAvailableTemplates((prev) =>
        prev.filter((card) => card.id !== activeId),
      );

      // Add to dropped cards
      if (isOverDroppedCard) {
        // Insert at the position of the card we're over
        const overIndex = droppedTemplates.findIndex(
          (card) => card.id === overId,
        );
        setDroppedTemplates((prev) => {
          const newCards = [...prev];
          newCards.splice(overIndex, 0, activeCard);
          return newCards;
        });
      } else {
        // Add to the end if dropping on the drop area itself
        setDroppedTemplates((prev) => [...prev, activeCard]);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTemplate(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Handle sorting within the dropped cards area
    const activeIndex = droppedTemplates.findIndex(
      (card) => card.id === activeId,
    );
    const overIndex = droppedTemplates.findIndex((card) => card.id === overId);

    // If both cards are in the dropped area and they're different positions
    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      setDroppedTemplates((prev) => arrayMove(prev, activeIndex, overIndex));
    }
  };

  const handleRemoveCard = (cardId: string) => {
    const cardToRemove = droppedTemplates.find((card) => card.id === cardId);
    if (cardToRemove) {
      setDroppedTemplates((prev) => prev.filter((card) => card.id !== cardId));
      setAvailableTemplates((prev) => [...prev, cardToRemove]);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-8 min-h-[27rem] h-[27rem] bg-background">
        {/* Drop Area Column */}
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Workout</CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 min-h-96 max-w-full">
              <SortableContext
                items={droppedTemplates.map((card) => card.id)}
                strategy={verticalListSortingStrategy}
              >
                <DroppableArea>
                  <div className="space-y-4 max-h-full min-h-full overflow-y-scroll overflow-x-hidden">
                    {droppedTemplates.map((card) => (
                      <SortableCard
                        key={card.id}
                        card={card}
                        onRemove={handleRemoveCard}
                      />
                    ))}
                    {droppedTemplates.length === 0 && (
                      <div className="text-center text-muted-foreground py-12 border-2 border-dashed border-border rounded-lg">
                        Drop templates here to organize them
                      </div>
                    )}
                  </div>
                </DroppableArea>
              </SortableContext>
            </CardContent>
          </Card>
        </div>
        {/* Available Cards Column */}
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Workout Templates</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex h-9 border border-border rounded-md bg-background text-foreground">
                <div className="min-h-full aspect-square h-full flex items-center justify-center">
                  <SearchIcon className="w-4 h-4 mx-2" />
                </div>
                <Separator
                  orientation="vertical"
                  className="min-h-full h-full"
                />
                <Input
                  placeholder="Search exercises, muscle groups"
                  className="outline-0 border-0 shadow-none text-inherit"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 max-h-72 overflow-y-scroll flex flex-col gap-4">
                {filteredTemplates.map((card) => (
                  <DraggableCard key={card.id} card={card} />
                ))}
                {filteredTemplates.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    All cards have been moved to the drop area
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeTemplate ? (
          <Card className="w-80 opacity-90 rotate-3 shadow-lg border-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-foreground">
                {activeTemplate.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {activeTemplate.description}
              </CardDescription>
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
