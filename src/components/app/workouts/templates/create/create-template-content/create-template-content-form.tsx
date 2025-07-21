"use client";

import {
  CreateWorkoutTemplateInput,
  CreateWorkoutTemplateSchema,
} from "@/zod-schemas/workout-template-schemas";
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
  Edit2Icon,
  FlameIcon,
  TurtleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useListExercises } from "@/hooks/exercise/use-list-exercise-options";

import { WizardForm } from "@/components/ui/wizard-form/wizard-form";
import ExerciseDragDrop from "@/components/app/workouts/templates/shared/exercise-drag-drop/exercise-drag-drop";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateWorkoutTemplate } from "@/hooks/workout-template/use-create-workout-template";
import { useRouter } from "next/navigation";

const CreateTemplateContentForm = () => {
  const [isExercisePlanSaved, setIsExercisePlanSaved] = useState(true);
  const router = useRouter();
  const [estimatedValues, setEstimatedValues] = useState<{
    duration: number;
    difficulty: number;
  }>();
  const form = useForm<CreateWorkoutTemplateInput>({
    resolver: zodResolver(CreateWorkoutTemplateSchema),
    defaultValues: {
      name: "",
      description: "",
      templateExercises: [],
      duration: 0,
    },
  });

  const exerciseOptionsQuery = useListExercises();

  const mutation = useCreateWorkoutTemplate({
    onSuccess: () => {
      toast("Workout Template created successfuly.");
      router.push("/workouts/templates");
    },
  });

  useEffect(() => {
    let duration = 0;
    let difficulty = 0;

    const tes = form.watch("templateExercises") ?? [];

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
  }, [form.watch("templateExercises")]);

  if (!exerciseOptionsQuery.data || exerciseOptionsQuery.isPending) {
    return (
      <div className="relative min-h-96">
        <LoadingOverlay fullScreen={false} />
      </div>
    );
  }

  return (
    <div>
      <WizardForm
        steps={[
          {
            id: 1,
            title: "Template Information",
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
            icon: <Edit2Icon className="w-4 h-4" />,
          },
          {
            id: 2,
            title: "Exercises",
            components: [
              <ExerciseDragDrop
                key="board"
                exercises={exerciseOptionsQuery.data}
                existedExercises={form.watch("templateExercises")}
                onChange={(data: ExerciseForTemplateInput[]) =>
                  form.setValue("templateExercises", data)
                }
                onChangeIsExercisePlanSaved={setIsExercisePlanSaved}
                isExercisePlanSaved={isExercisePlanSaved}
              />,
            ],
            fields: [],
            icon: <BicepsFlexedIcon className="w-4 h-4" />,
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
            id: 3,
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
        loading={mutation.isPending}
        onCancel={() => {
          form.reset();
          router.push("/workouts/templates");
        }}
        title={"Create Workout Template"}
      />
    </div>
  );
};

export default CreateTemplateContentForm;
