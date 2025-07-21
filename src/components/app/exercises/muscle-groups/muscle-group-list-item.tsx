import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MuscleGroup } from "@prisma/client";
import MuscleGroupDialog from "@/components/app/exercises/muscle-groups/muscle-group-dialog/muscle-group-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

interface Props {
  muscleGroup: MuscleGroup;
  viewVariant: "list" | "card";
}

const MuscleGroupListItem = ({ muscleGroup, viewVariant = "card" }: Props) => {
  return (
    <>
      {viewVariant === "card" ? (
        <Card className="bg-secondary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{muscleGroup.name}</CardTitle>
              {muscleGroup.isSystem ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={"ghost"}
                        className={"opacity-50 cursor-not-allowed"}
                      >
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
                <Badge variant="default">System</Badge>
              ) : (
                <Badge variant="tertiary">Custom</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <TableRow key={muscleGroup.id}>
          <TableCell className="font-medium">{muscleGroup.name}</TableCell>
          <TableCell>
            {muscleGroup.isSystem ? (
              <Badge variant="default">System</Badge>
            ) : (
              <Badge variant="tertiary">Custom</Badge>
            )}
          </TableCell>
          <TableCell className="flex items-center justify-end">
            {muscleGroup.isSystem ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant={"ghost"}
                      className={"opacity-50 cursor-not-allowed"}
                    >
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
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default MuscleGroupListItem;
