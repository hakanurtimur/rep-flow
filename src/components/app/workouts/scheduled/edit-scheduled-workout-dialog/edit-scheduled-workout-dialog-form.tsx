"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  UpdateScheduledWorkoutInput,
  UpdateScheduledWorkoutSchema,
} from "@/zod-schemas/scheduled-workout-schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventColorMap } from "@/lib/event-color-map";
import { toast } from "sonner";
import { FormDateTimePicker } from "@/components/ui/custom-date-time-picker/form-date-time-picker";
import { useUpdateScheduledWorkout } from "@/hooks/scheduled-workout/use-update-scheduled-workout";
import DeleteAlertDialog from "@/components/delete-alert-dialog";
import { useState } from "react";
import { useDeleteScheduledWorkout } from "@/hooks/scheduled-workout/use-delete-scheduled-workout";

interface Props {
  model: UpdateScheduledWorkoutInput;
  closeDialog: () => void;
}

const EditScheduledWorkoutDialogForm = ({ closeDialog, model }: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const form = useForm<UpdateScheduledWorkoutInput>({
    resolver: zodResolver(UpdateScheduledWorkoutSchema),
    defaultValues: {
      ...model,
    },
  });

  const mutation = useUpdateScheduledWorkout({
    onSuccess: () => {
      toast("Workout scheduled successfully!");
      closeDialog();
    },
  });

  const deleteMutation = useDeleteScheduledWorkout({
    onSuccess: () => {
      toast("Exercise deleted successfully.");
      closeDialog();
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
          <FormDateTimePicker
            label={"Select Date"}
            control={form.control}
            name={"scheduledAt"}
          />
          <FormField
            control={form.control}
            name="colorKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select An Event Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
              </FormItem>
            )}
          />
          <DialogFooter
            className={cn("flex flex-row! items-center gap-2 w-full")}
          >
            <DialogClose type="button" asChild>
              <Button
                variant="outline"
                disabled={mutation.isPending || deleteMutation.isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={deleteMutation.isPending}
              loading={mutation.isPending}
              type="submit"
            >
              Save
            </Button>
            <DeleteAlertDialog
              title="Delete Scheduled Workout"
              description="Are you sure you want to delete this scheduled workout? This action cannot be undone."
              onDelete={() => {
                if (model) {
                  deleteMutation.mutate(model.id);
                }
              }}
              isOpen={isDeleteDialogOpen}
              onOpenChange={(open) => {
                setIsDeleteDialogOpen(open);
                if (!open) {
                  setTimeout(() => {
                    deleteMutation.reset();
                  }, 200);
                }
              }}
              disabled={mutation.isPending || deleteMutation.isPending}
              loading={deleteMutation.isPending}
              customError={deleteMutation.error?.message}
            >
              <Button
                disabled={mutation.isPending || deleteMutation.isPending}
                variant={"destructive"}
                type="button"
              >
                Delete
              </Button>
            </DeleteAlertDialog>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default EditScheduledWorkoutDialogForm;
