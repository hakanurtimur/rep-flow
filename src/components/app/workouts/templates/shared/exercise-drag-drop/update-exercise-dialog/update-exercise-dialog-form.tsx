"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useRef, useState } from "react";
import {
  ExerciseForTemplateInput,
  ExerciseForTemplateSchema,
  ExerciseTemplateForDragDrop,
} from "@/zod-schemas/template-exercise-schemas";
import { Button } from "@/components/ui/button";
import MotionXWithDirection from "@/components/motioned-components/motion-container-x-with-direction";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import {
  ActivityIcon,
  BicepsFlexedIcon,
  DumbbellIcon,
  EditIcon,
  EyeIcon,
  TimerIcon,
  X,
} from "lucide-react";
import ExpandableButton from "@/components/ui/expandable-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DifficultyRating from "@/components/ui/difficulty-rating";
import { Badge } from "@/components/ui/badge";

interface Props {
  model: ExerciseTemplateForDragDrop;
  onClose: () => void;
  onConfirm: (data: ExerciseForTemplateInput) => void;
}

const viewVariants = [
  {
    mode: "preview",
    label: "Preview",
    icon: EyeIcon,
  },
  {
    mode: "edit",
    label: "Edit",
    icon: EditIcon,
  },
];

const AdjustedExerciseForTemplateSchema = ExerciseForTemplateSchema.extend({
  sets: ExerciseForTemplateSchema.shape.sets.min(1),
});

const UpdateExerciseDialogForm = ({ model, onClose, onConfirm }: Props) => {
  const [viewVariant, setViewVariant] = useState<"preview" | "edit">("preview");
  const form = useForm<z.infer<typeof AdjustedExerciseForTemplateSchema>>({
    resolver: zodResolver(AdjustedExerciseForTemplateSchema),
    defaultValues: {
      id: model.id,
      exerciseId: model.exerciseId,
      order: model.order,
      sets: model.sets,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sets",
  });

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onClose();
          onConfirm(data);
        })}
        className="space-y-4 px-4"
      >
        <div
          key={"muscleGroups"}
          className="space-y-4 max-h-[40rem] overflow-x-visible! overflow-y-scroll h-[40rem]"
          ref={ref}
        >
          <>
            <div className="sticky top-0 left-0 w-full bg-background pb-4 z-10 flex flex-row-reverse justify-between items-center">
              <div className="flex shadow-xs border rounded-md items-center justify-end">
                {viewVariants.map(({ mode, label, icon: Icon }) => (
                  <ExpandableButton
                    size="icon"
                    variant="ghost"
                    className="bg-transparent shadow-none cursor-pointer"
                    onClick={() => {
                      if (mode === "preview") {
                        form.reset();
                      }

                      setViewVariant(mode as "edit" | "preview");
                    }}
                    expanded={viewVariant === mode}
                    expandedText={label}
                    key={mode}
                  >
                    <Icon className="w-4 h-4" />
                  </ExpandableButton>
                ))}
              </div>
              {viewVariant === "edit" && (
                <MotionXWithDirection direction="left">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      append({
                        reps: 0,
                        weight: 0,
                        duration: 0,
                        restTime: 0,
                        order: 0,
                      });
                      setTimeout(() => {
                        if (ref.current) {
                          ref.current.scrollTo({
                            top: ref.current.offsetHeight,
                            behavior: "smooth",
                          });
                        }
                      }, 500);
                    }}
                  >
                    + Add Set
                  </Button>
                </MotionXWithDirection>
              )}
            </div>
            {viewVariant === "edit" ? (
              <>
                {fields.map((field, index) => (
                  <MotionXWithDirection
                    direction="left"
                    className="grid grid-cols2 gap-4 relative p-4 shadow-sm rounded-md border border-border"
                    key={field.id}
                  >
                    <div className="flex gap-2 items-center justify-between col-span-2">
                      <p className="text-sm font-semibold">Set {index + 1}:</p>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          remove(index);
                        }}
                        className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {/* Reps */}
                    <FormField
                      control={form.control}
                      name={`sets.${index}.reps`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-1 col-span-1">
                          <FormLabel>Reps</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              value={
                                field.value === null ||
                                field.value === undefined
                                  ? ""
                                  : field.value
                              }
                              onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val === "" ? null : Number(val));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Weight */}
                    <FormField
                      control={form.control}
                      name={`sets.${index}.weight`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-1 col-span-1">
                          <FormLabel>Weight</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              value={
                                field.value === null ||
                                field.value === undefined
                                  ? ""
                                  : field.value
                              }
                              onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val === "" ? null : Number(val));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Duration */}
                    <FormField
                      control={form.control}
                      name={`sets.${index}.duration`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-1 col-span-1">
                          <FormLabel>Duration (seconds)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              value={
                                field.value === null ||
                                field.value === undefined
                                  ? ""
                                  : field.value
                              }
                              onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val === "" ? null : Number(val));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Rest Time */}
                    <FormField
                      control={form.control}
                      name={`sets.${index}.restTime`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-1 col-span-1">
                          <FormLabel>Rest Time (seconds)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              value={
                                field.value === null ||
                                field.value === undefined
                                  ? ""
                                  : field.value
                              }
                              onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val === "" ? null : Number(val));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </MotionXWithDirection>
                ))}
              </>
            ) : (
              <MotionXWithDirection direction="left">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      {model.name}
                    </CardTitle>
                    <CardDescription>{model.description ?? ""}</CardDescription>
                    <DifficultyRating value={model.totalDifficulty} />
                  </CardHeader>
                  <CardContent className="flex flex-row gap-8">
                    <div className="flex flex-col gap-2">
                      <Badge className="text-base">
                        <BicepsFlexedIcon className="w-4 h-4 fill-primary-foreground" />
                        Muscle Groups
                      </Badge>
                      {model.muscleGroupLinks.map((link, idx) => (
                        <Badge
                          key={"link-" + idx}
                          className="text-sm flex flex-row gap-4 items-center justify-between w-full"
                          variant="secondary"
                        >
                          {link.muscleGroup.name}:
                          <DifficultyRating value={link.difficulty} />
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Badge variant="tertiary" className="text-base">
                        <ActivityIcon className="w-4 h-4" />
                        {model.sets.length} Sets
                      </Badge>
                      {model.sets.map((set, idx) => (
                        <div
                          key={"set-" + idx}
                          className="gap-4 grid grid-cols-3 text-sm font-semibold"
                        >
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1 text-sm"
                          >
                            <ActivityIcon className="w-4 h-4" />
                            {set.reps} reps
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1 text-sm"
                          >
                            <DumbbellIcon className="w-4 h-4" />
                            {set.weight ?? 0}kg
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1 text-sm"
                          >
                            <TimerIcon className="w-4 h-4" />
                            {set.restTime ?? 0}s
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </MotionXWithDirection>
            )}
          </>
        </div>
        {form.formState.errors.sets && (
          <span className="text-sm text-destructive ml-2">
            {form.formState.errors.sets.message}
          </span>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {viewVariant === "preview" ? "Close" : "Cancel"}
            </Button>
          </DialogClose>
          {viewVariant === "edit" && (
            <Button variant="default" type="submit">
              Save
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpdateExerciseDialogForm;
