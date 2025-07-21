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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DraggableCard } from "./draggable-card";
import { DroppableArea } from "./droppable-area";
import { SortableCard } from "./sortable-card";
import { ExerciseOption } from "@/zod-schemas/exercise-schemas";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SearchIcon, Undo2Icon } from "lucide-react";
import DragOverlayCard from "@/components/workouts/templates/template-details/template-details-content/template-details-content-edit/exercise-drag-drop/drag-overlay-card";

import {
  ExerciseForTemplateInput,
  ExerciseTemplateForDragDrop,
} from "@/zod-schemas/template-exercise-schemas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddExerciseDialog from "@/components/workouts/templates/template-details/template-details-content/template-details-content-edit/exercise-drag-drop/add-exercise-dialog/add-exercise-dialog";
import { toast } from "sonner";
import { isEqual } from "lodash";

export interface CardItem {
  id: string;
  title: string;
  description: string;
  category?: string;
}

interface Props {
  exercises: ExerciseOption[];
  existedExercises: ExerciseForTemplateInput[];
  onChange: (data: ExerciseForTemplateInput[]) => void;
  onChangeIsExercisePlanSaved: (isSaved: boolean) => void;
  isExercisePlanSaved: boolean;
}

export default function ExerciseDragDrop({
  exercises,
  existedExercises,
  onChange,
  onChangeIsExercisePlanSaved,
  isExercisePlanSaved,
}: Props) {
  const exerciseOptionsAsExerciseTemplateForDragDrop = exercises.map(
    (e, idx) => {
      return {
        id: Date.now().toString() + `${idx}`,
        exerciseId: e.id,
        order: 0,
        sets: [],
        muscleGroupLinks: e.muscleGroupLinks,
        name: e.name,
        description: e.description,
        totalDifficulty: e.totalDifficulty,
      };
    },
  );

  const existedExerciseAsExerciseTemplateForDragDrop = existedExercises.map(
    (te, idx) => {
      const opt = exercises.find((e) => e.id === te.exerciseId);
      return {
        id: "exercise-" + idx,
        exerciseId: te.exerciseId,
        order: 0,
        sets: te.sets,
        muscleGroupLinks: opt?.muscleGroupLinks ?? [],
        name: opt?.name ?? "",
        description: opt?.description ?? "",
        totalDifficulty: opt?.totalDifficulty ?? 0,
      };
    },
  );
  const [availableExercises] = useState<ExerciseTemplateForDragDrop[]>(
    exerciseOptionsAsExerciseTemplateForDragDrop,
  );
  const [droppedExercise, setDroppedExercise] = useState<
    ExerciseTemplateForDragDrop[]
  >(existedExerciseAsExerciseTemplateForDragDrop);
  const [activeExercise, setActiveExercise] =
    useState<ExerciseTemplateForDragDrop | null>(null);
  const [draggedFromAvailable, setDraggedFromAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [exerciseToAdd, setExerciseToAdd] =
    useState<ExerciseTemplateForDragDrop | null>(null);
  const [initial, setInitial] = useState<ExerciseTemplateForDragDrop[]>(
    exerciseOptionsAsExerciseTemplateForDragDrop,
  );

  const filteredExercises = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return availableExercises;

    return availableExercises.filter((e) => {
      const target =
        `${e.name} ${e.muscleGroupLinks.map((m) => m.muscleGroup.name).join(" ")}`.toLowerCase();
      return target.includes(q);
    });
  }, [searchQuery, availableExercises]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    const isSame = isEqual(droppedExercise, initial);

    onChangeIsExercisePlanSaved(isSame);
  }, [droppedExercise, initial, onChangeIsExercisePlanSaved]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card = [...availableExercises, ...droppedExercise].find(
      (card) => card.id === active.id,
    );

    if (card) {
      const isFromAvailableCards = availableExercises.some(
        (availableCard) => availableCard.id === active.id,
      );
      setDraggedFromAvailable(isFromAvailableCards);

      if (isFromAvailableCards) {
        const cardCopy = {
          ...card,
          id: `copy-${card.id}-${Date.now()}`,
        };
        setActiveExercise(cardCopy);
      } else {
        setActiveExercise(card);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (draggedFromAvailable && activeExercise) {
      const isOverDropArea = overId === "drop-area";
      const isOverDroppedCard = droppedExercise.some(
        (card) => card.id === overId,
      );

      if (isOverDropArea || isOverDroppedCard) {
        const activeIndex = droppedExercise.findIndex(
          (card) => card.id === activeExercise.id,
        );

        if (activeIndex === -1) {
          if (isOverDroppedCard) {
            const overIndex = droppedExercise.findIndex(
              (card) => card.id === overId,
            );
            setDroppedExercise((prev) => {
              const newCards = [...prev];
              newCards.splice(overIndex, 0, activeExercise);
              return newCards;
            });
          } else {
            setDroppedExercise((prev) => [...prev, activeExercise]);
          }
        } else {
          if (isOverDroppedCard) {
            const overIndex = droppedExercise.findIndex(
              (card) => card.id === overId,
            );
            if (activeIndex !== overIndex) {
              setDroppedExercise((prev) =>
                arrayMove(prev, activeIndex, overIndex),
              );
            }
          }
        }
      }
    } else {
      const activeIndex = droppedExercise.findIndex(
        (card) => card.id === activeId,
      );
      const overIndex = droppedExercise.findIndex((card) => card.id === overId);

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        setDroppedExercise((prev) => arrayMove(prev, activeIndex, overIndex));
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    const currentActiveCard = activeExercise;

    if (draggedFromAvailable && currentActiveCard) {
      setIsExerciseDialogOpen(true);
      setExerciseToAdd(currentActiveCard);
      if (
        !over ||
        (over.id !== "drop-area" &&
          !droppedExercise.some((card) => card.id === over.id))
      ) {
        setDroppedExercise((prev) =>
          prev.filter((card) => card.id !== currentActiveCard.id),
        );
      }
    }

    setActiveExercise(null);
    setDraggedFromAvailable(false);
  };

  const handleRemoveCard = (cardId: string) => {
    setDroppedExercise((prev) => prev.filter((card) => card.id !== cardId));
  };

  const handleSaveExercisePlan = () => {
    const exercisesToSave = droppedExercise.map((de, index) => {
      return {
        id: undefined,
        exerciseId: de.exerciseId,
        order: index,
        sets: de.sets,
      };
    });
    onChange(exercisesToSave);
    onChangeIsExercisePlanSaved(true);
    setInitial(droppedExercise);
  };

  const handleExerciseUpdate = (
    exercise: ExerciseForTemplateInput,
    variant: "added" | "updated",
  ) => {
    const selectedExercise = droppedExercise.find(
      (te) => te.id === exercise.id,
    );
    if (!selectedExercise) return;
    selectedExercise.sets = exercise.sets;
    toast(`Exercise ${variant}`);
    onChangeIsExercisePlanSaved(false);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      autoScroll={false}
    >
      <div className="flex gap-8 min-h-[27rem] h-[27rem] bg-background">
        {/* Drop Area Column */}
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between gap-2 min-h-10">
                <CardTitle className="flex-1">Workout Plan</CardTitle>
                {!isExercisePlanSaved && (
                  <>
                    <Button
                      type={"button"}
                      className={cn(!isExercisePlanSaved && "animate-pulse")}
                      onClick={handleSaveExercisePlan}
                    >
                      Save Workout Plan
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type={"button"}
                            size={"icon"}
                            variant={"outline"}
                            onClick={() => {
                              setDroppedExercise(
                                existedExerciseAsExerciseTemplateForDragDrop,
                              );
                              onChangeIsExercisePlanSaved(true);
                            }}
                          >
                            <Undo2Icon className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Undo</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent className="max-h-96">
              <SortableContext
                items={droppedExercise.map((card) => card.id ?? "")}
                strategy={verticalListSortingStrategy}
              >
                <DroppableArea>
                  <div className="space-y-4 max-h-full overflow-y-scroll">
                    {droppedExercise.map((exercise) => (
                      <SortableCard
                        key={exercise.id}
                        exercise={exercise}
                        onRemove={handleRemoveCard}
                        isPreview={
                          draggedFromAvailable &&
                          activeExercise?.id === exercise.id
                        }
                        onUpdate={(data) =>
                          handleExerciseUpdate(data, "updated")
                        }
                      />
                    ))}
                    {droppedExercise.length === 0 && (
                      <div className="text-center text-muted-foreground py-12 border-2 border-dashed border-border rounded-lg">
                        Drop cards here to organize them
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
              <CardTitle>Exercises</CardTitle>
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
                {filteredExercises.map((exercise) => (
                  <DraggableCard key={exercise.id} exercise={exercise} />
                ))}
                {filteredExercises.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No cards available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Drag Overlay - Shows the copy being dragged */}
      <DragOverlay dropAnimation={null}>
        {activeExercise ? (
          <DragOverlayCard activeExercise={activeExercise} />
        ) : null}
      </DragOverlay>

      {exerciseToAdd && (
        <AddExerciseDialog
          exerciseToAdd={exerciseToAdd}
          open={isExerciseDialogOpen}
          onOpenChange={setIsExerciseDialogOpen}
          onCancel={() => {
            setDroppedExercise((prev) =>
              prev.filter((ex) => ex.id !== exerciseToAdd?.id),
            );
            setExerciseToAdd(null);
          }}
          onConfirm={(formData) => {
            handleExerciseUpdate(formData, "added");
          }}
        />
      )}
    </DndContext>
  );
}
