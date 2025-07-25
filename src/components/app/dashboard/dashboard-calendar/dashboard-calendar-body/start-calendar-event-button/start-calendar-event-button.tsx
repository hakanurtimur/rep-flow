import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import * as React from "react";

interface Props {
  foregroundColor: string;
}

const StartCalendarEventButton = ({ foregroundColor }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="hover:bg-transparent"
            size="icon"
            variant={"ghost"}
          >
            <PlayIcon
              style={{
                color: `var(${foregroundColor})`,
                fill: `var(${foregroundColor})`,
              }}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Start Workout</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StartCalendarEventButton;
