import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CheckIcon, SquareMousePointerIcon } from "lucide-react";
import * as React from "react";
import { useUpdateScheduledWorkoutStatus } from "@/hooks/scheduled-workout/use-update-scheduled-workout-status";
import { toast } from "sonner";

interface Props {
  foregroundColor: string;
  workoutId: string;
  completed: boolean;
}

const UpdateScheduledWorkoutStatusButton = ({
  foregroundColor,
  workoutId,
  completed,
}: Props) => {
  const updateStatusMutation = useUpdateScheduledWorkoutStatus({
    onSuccess: () => {
      toast(
        !completed
          ? "Scheduled workout marked as completed"
          : "Scheduled workout marked as todo",
      );
    },
  });
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="hover:bg-transparent aspect-square"
            variant={"ghost"}
            loading={updateStatusMutation.isPending}
            onClick={() =>
              updateStatusMutation.mutate({
                id: workoutId,
                input: {
                  completed: !completed,
                },
              })
            }
          >
            {completed ? (
              <SquareMousePointerIcon
                className="w-5 h-5"
                style={{
                  color: `var(${foregroundColor})`,
                }}
              />
            ) : (
              <CheckIcon
                className="w-5 h-5"
                style={{
                  color: `var(${foregroundColor})`,
                }}
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="capitalize">
          Mark as {completed ? "Todo" : "Completed"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UpdateScheduledWorkoutStatusButton;
