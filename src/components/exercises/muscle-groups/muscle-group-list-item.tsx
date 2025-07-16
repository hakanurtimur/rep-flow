import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MuscleGroup } from "@prisma/client";
import MuscleGroupDialog from "@/components/exercises/muscle-groups/muscle-group-dialog/muscle-group-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  muscleGroup: MuscleGroup;
}

const MuscleGroupListItem = ({ muscleGroup }: Props) => {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{muscleGroup.name}</CardTitle>
          {muscleGroup.isSystem ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button size="icon" variant={"ghost"} disabled>
                    <EditIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-xs">
                    System Muscle Groups cannot be edited
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <MuscleGroupDialog variant={"edit"} model={muscleGroup}>
              <Button size="icon" variant={"ghost"}>
                <EditIcon />
              </Button>
            </MuscleGroupDialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {muscleGroup.isSystem ? (
            <span className="text-sm text-muted-foreground">
              System Muscle Group
            </span>
          ) : (
            <span className="text-sm text-primary">Custom Muscle Group</span>
          )}
          <span className="text-xs text-muted-foreground">
            Created at: {new Date(muscleGroup.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MuscleGroupListItem;
