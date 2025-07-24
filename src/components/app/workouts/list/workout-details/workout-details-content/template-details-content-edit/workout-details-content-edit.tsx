"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExerciseForTemplateInput } from "@/zod-schemas/template-exercise-schemas";
import {
  BicepsFlexedIcon,
  DumbbellIcon,
  EditIcon,
  FlameIcon,
  TurtleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useListExerciseOptions } from "@/hooks/exercise/use-list-exercise-options";

import { WizardForm } from "@/components/ui/wizard-form/wizard-form";
import ExerciseDragDrop from "@/components/app/workouts/templates/shared/exercise-drag-drop/exercise-drag-drop";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ExtendedWorkout,
  UpdateWorkoutInput,
  UpdateWorkoutSchema,
} from "@/zod-schemas/workout-schemas";
import { useUpdateWorkout } from "@/hooks/workout/use-update-workout";
import { useListWorkoutTemplateOptions } from "@/hooks/workout-template/use-list-workout-template-options";
import { useListWorkoutTemplatesWithDetails } from "@/hooks/workout-template/use-list-workout-templates-with-details";
import WorkoutTemplateDragDrop from "@/components/app/workouts/list/shared/workout-template-drag-drop/workout-template-drag-drop";

interface Props {
  workout: ExtendedWorkout;
  onViewVariantChange: (variant: "edit" | "preview") => void;
}

const WorkoutDetailsContentEdit = ({ workout, onViewVariantChange }: Props) => {
  const [isExercisePlanSaved, setIsExercisePlanSaved] = useState(true);
  const [estimatedValues, setEstimatedValues] = useState<{
    duration: number;
    difficulty: number;
  }>({
    duration: 0,
    difficulty: 0,
  });
  const form = useForm<UpdateWorkoutInput>({
    resolver: zodResolver(UpdateWorkoutSchema),
    defaultValues: {
      id: workout.id,
      name: workout.name,
      description: workout.description ?? "",
      duration: workout.duration,
      difficulty: workout.difficulty,
      templateIds: workout.templates.map((t) => {
        return t.template.id;
      }),
      exercises: workout.exercises,
    },
  });

  const mutation = useUpdateWorkout({
    onSuccess: () => {
      toast("Workout Template Updated successfuly.");
      onViewVariantChange("preview");
    },
  });
  const templateOptionsQuery = useListWorkoutTemplateOptions();
  const exerciseOptionsQuery = useListExerciseOptions();
  const getTemplateDetailsMutation = useListWorkoutTemplatesWithDetails({
    onSuccess: (data) => {
      const templateIds = form.getValues("templateIds");

      const exercises = templateIds.flatMap((templateId) => {
        const template = data.find((t) => t.id === templateId);
        if (!template) return [];

        return template.templateExercises
          .sort((a, b) => a.order - b.order)
          .map((ex) => ({
            exerciseId: ex.exerciseId,
            order: ex.order,
            sets: ex.sets
              .sort((a, b) => a.order - b.order)
              .map((s) => ({
                reps: s.reps,
                weight: s.weight,
                duration: s.duration,
                restTime: s.restTime,
                order: s.order,
              })),
          }));
      });
      form.setValue("exercises", exercises);
    },
  });

  useEffect(() => {
    let duration = 0;
    let difficulty = 0;

    const tes = form.watch("exercises") ?? [];

    difficulty = 7;

    for (let i = 0; i < tes.length; i++) {
      for (let j = 0; j < tes[i].sets.length; j++) {
        duration += tes[i].sets[j].duration + tes[i].sets[j].restTime;
      }
    }

    setEstimatedValues({
      difficulty,
      duration: Math.round(duration / 60),
    });
  }, [form.watch("exercises")]);

  if (
    !templateOptionsQuery.data ||
    templateOptionsQuery.isPending ||
    !exerciseOptionsQuery.data ||
    exerciseOptionsQuery.isPending
  ) {
    return (
      <div className="relative min-h-96">
        <LoadingOverlay fullScreen={false} />
      </div>
    );
  }

  const existedTemplates = form
    .getValues("templateIds")
    .map((id) => templateOptionsQuery.data.find((t) => t.id === id))
    .filter(Boolean);

  const availableTemplateOptions = templateOptionsQuery.data.filter(
    (t) => !form.getValues("templateIds").includes(t.id),
  );

  return (
    <div>
      <WizardForm
        steps={[
          {
            id: 1,
            title: "Workout Information",
            components: [
              <FormField
                key={"name"}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Workout Template Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />,
              <FormField
                key={"description"}
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />,
            ],
            fields: ["name", "description"],
            icon: <EditIcon className="w-4 h-4" />,
          },
          {
            id: 2,
            title: "Workout Templates",
            components: [
              <WorkoutTemplateDragDrop
                key="template-board"
                templateOptions={availableTemplateOptions}
                existedTemplates={existedTemplates.filter(
                  (i) => i !== undefined,
                )}
                onChange={(data) => form.setValue("templateIds", data)}
              />,
            ],
            fields: [],
            icon: <BicepsFlexedIcon className="w-4 h-4" />,
            onExtraNext: async () => {
              await getTemplateDetailsMutation.mutateAsync(
                form.getValues("templateIds"),
              );
              return true;
            },
          },
          {
            id: 3,
            title: "Exercises",
            components: [
              <ExerciseDragDrop
                key="board"
                exercises={exerciseOptionsQuery.data}
                existedExercises={form.getValues("exercises")}
                onChange={(data: ExerciseForTemplateInput[]) =>
                  form.setValue("exercises", data)
                }
                onChangeIsExercisePlanSaved={setIsExercisePlanSaved}
                isExercisePlanSaved={isExercisePlanSaved}
              />,
            ],
            fields: [],
            icon: <DumbbellIcon className="w-4 h-4" />,
            onExtraNext: () => {
              if (!isExercisePlanSaved) {
                toast("Please save your workout plan before next step.", {
                  action: {
                    label: "OK",
                    onClick: () => console.log("Ok"),
                  },
                });
                return false;
              }
              return true;
            },
          },
          {
            id: 4,
            title: "Duration & Difficulty",
            components: [
              <FormField
                key="duration"
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      Duration (mins) (Estimated: {estimatedValues?.duration}{" "}
                      mins)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={"number"}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />,
              <FormField
                key="difficulty"
                control={form.control}
                name={"difficulty"}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      Workout Difficulty (Estimated:{" "}
                      {estimatedValues?.difficulty})
                    </FormLabel>
                    <FormControl>
                      <div className="flex-1 flex gap-2">
                        <TurtleIcon
                          className={cn(
                            "text-blue-600 fill-blue-600 w-6 h-6 transition-opacity duration-300 mt-1.5",
                            form.getValues(`difficulty`) === 1 &&
                              "animate-bounce",
                          )}
                          style={{
                            opacity: `${(11 - form.getValues(`difficulty`)) * 10}%`,
                          }}
                        />
                        <Slider
                          defaultValue={[field.value || 1]}
                          min={1}
                          max={10}
                          step={1}
                          className="max-h-8"
                          onValueChange={(val) => field.onChange(val[0])}
                        />
                        <FlameIcon
                          className={cn(
                            "text-destructive fill-destructive w-6 h-6 transition-opacity duration-300 mt-1.5",
                            form.getValues(`difficulty`) === 10 &&
                              "animate-bounce",
                          )}
                          style={{
                            opacity: `${form.getValues(`difficulty`) * 10}%`,
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />,
            ],
            fields: ["duration", "difficulty"],
            icon: <FlameIcon className="w-4 h-4" />,
          },
        ]}
        form={form}
        onSubmit={(data) => {
          mutation.mutate(data);
        }}
        loading={mutation.isPending || getTemplateDetailsMutation.isPending}
        onCancel={() => {
          form.reset();
          onViewVariantChange("preview");
        }}
        title={"Edit Workout"}
      />
    </div>
  );
};

export default WorkoutDetailsContentEdit;
