import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { ReactNode, useState } from "react";
import EditScheduledWorkoutDialog from "@/components/app/workouts/scheduled/edit-scheduled-workout-dialog/edit-scheduled-workout-dialog";
import {
  EventColorKey,
  ScheduledWorkoutListElement,
} from "@/zod-schemas/scheduled-workout-schemas";
import { Button } from "@/components/ui/button";
import { useUpdateScheduledWorkoutStatus } from "@/hooks/scheduled-workout/use-update-scheduled-workout-status";
import { toast } from "sonner";
import StartWorkoutSessionButton from "@/components/app/shared/start-workout-session-button";

interface Props {
  children: ReactNode;
  scheduledWorkout: ScheduledWorkoutListElement;
}

const ScheduledWorkoutListItemActionDropdown = ({
  children,
  scheduledWorkout,
}: Props) => {
  const [open, setOpen] = useState(false);
  const updateStatusMutation = useUpdateScheduledWorkoutStatus({
    onSuccess: () => {
      toast(
        !scheduledWorkout.completed
          ? "Scheduled workout marked as completed"
          : "Scheduled workout marked as todo",
      );
      setOpen(false);
    },
  });
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <div>
            <Button
              className="w-full justify-start pl-2 font-normal cursor-default"
              variant={"ghost"}
              loading={updateStatusMutation.isPending}
              onClick={() =>
                updateStatusMutation.mutate({
                  id: scheduledWorkout.id,
                  input: {
                    completed: !scheduledWorkout.completed,
                  },
                })
              }
            >
              Mark as {!scheduledWorkout.completed ? "Complete" : "Todo"}
            </Button>
          </div>
          <div>
            <StartWorkoutSessionButton
              className="w-full justify-start pl-2 font-normal cursor-default"
              scheduledWorkoutId={scheduledWorkout.id}
              variant={"default"}
            />
          </div>
          <DropdownMenuItem asChild>
            <EditScheduledWorkoutDialog
              model={{
                id: scheduledWorkout.id,
                scheduledAt: scheduledWorkout.scheduledAt,
                workoutId: scheduledWorkout.workout.id,
                colorKey:
                  (scheduledWorkout.calendarEvent.colorKey as EventColorKey) ??
                  undefined,
              }}
            >
              <Button
                className="w-full justify-start pl-2 font-normal cursor-default"
                variant={"ghost"}
              >
                Edit Scheduled Workout
              </Button>
            </EditScheduledWorkoutDialog>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ScheduledWorkoutListItemActionDropdown;
