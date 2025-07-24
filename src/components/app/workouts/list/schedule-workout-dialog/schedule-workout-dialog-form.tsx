"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CreateScheduledWorkoutInput,
  CreateScheduledWorkoutSchema,
} from "@/zod-schemas/scheduled-workout-schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventColorMap } from "@/lib/event-color-map";
import { useCreateScheduledWorkout } from "@/hooks/scheduled-workout/use-create-scheduled-workout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormDateTimePicker } from "@/components/ui/custom-date-time-picker/form-date-time-picker";

interface Props {
  workoutId: string;
  closeDialog: () => void;
}

const ScheduleWorkoutDialogForm = ({ closeDialog, workoutId }: Props) => {
  const router = useRouter();
  const form = useForm<CreateScheduledWorkoutInput>({
    resolver: zodResolver(CreateScheduledWorkoutSchema),
    defaultValues: {
      workoutId: workoutId,
    },
  });

  const mutation = useCreateScheduledWorkout({
    onSuccess: () => {
      toast("Workout scheduled successfully!");
      closeDialog();
      router.push("/workouts/scheduled");
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            mutation.mutate(data);
          })}
          className="space-y-4"
        >
          <FormDateTimePicker control={form.control} name={"scheduledAt"} />
          <FormField
            control={form.control}
            name="colorKey"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-44">
                  {Object.entries(eventColorMap).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      <span
                        className="h-4 w-[9.5rem] rounded-sm border"
                        style={{ backgroundColor: `var(${value.bg})` }}
                      />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <DialogFooter
            className={cn("flex flex-row! items-center gap-2 w-full")}
          >
            <DialogClose type="button" asChild>
              <Button variant="outline" disabled={mutation.isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button loading={mutation.isPending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default ScheduleWorkoutDialogForm;
