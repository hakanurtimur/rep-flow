import { Button } from "@/components/ui/button";
import { useStartWorkoutSession } from "@/hooks/workout-session/use-start-workout-session";
import { useRouter } from "next/navigation";
import { PlayIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  scheduledWorkoutId: string;
  onExtraSuccess?: () => void;
  variant: "icon" | "default";
  className?: string;
  fg?: string;
}

const StartWorkoutSessionButton = ({
  scheduledWorkoutId,
  onExtraSuccess,
  variant,
  className,
  fg,
}: Props) => {
  const router = useRouter();
  const mutation = useStartWorkoutSession({
    onSuccess: (data) => {
      router.push(`/workout-session/${data.id}`);
      if (onExtraSuccess) {
        onExtraSuccess();
      }
    },
  });
  return (
    <>
      {variant === "icon" ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={variant}
                loading={mutation.isPending}
                variant={"ghost"}
                onClick={() => mutation.mutate({ scheduledWorkoutId })}
                className={cn(className, "hover:bg-transparent")}
              >
                <PlayIcon
                  style={{
                    color: `var(${fg})`,
                    fill: `var(${fg})`,
                  }}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start Workout Session</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Button
          size={variant}
          loading={mutation.isPending}
          variant={"ghost"}
          onClick={() => mutation.mutate({ scheduledWorkoutId })}
          className={className}
        >
          Start Session
        </Button>
      )}
    </>
  );
};

export default StartWorkoutSessionButton;
