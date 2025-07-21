import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ExtendedExercises } from "@/zod-schemas/exercise-schemas";
import DifficultyRating from "@/components/ui/difficulty-rating";
import ExerciseListItemHoverCard from "@/components/app/exercises/list/exercise-list-item-hover-card";
import EditExerciseDialog from "@/components/app/exercises/list/edit-exercise-dialog/edit-exercise-dialog";

interface Props {
  exercise: ExtendedExercises;
  viewVariant: "list" | "card";
}

const ExerciseListItem = ({ exercise, viewVariant = "card" }: Props) => {
  return (
    <>
      {viewVariant === "card" ? (
        <Card className="bg-tertiary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{exercise.name}</CardTitle>

              {exercise.isSystem ? (
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
                        System Exercises Groups cannot be edited
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <EditExerciseDialog id={exercise.id}>
                  <Button size="icon" variant={"ghost"}>
                    <EditIcon />
                  </Button>
                </EditExerciseDialog>
              )}
            </div>
            <CardDescription>
              {exercise.description || "No description"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-start">
            <ExerciseListItemHoverCard exercise={exercise} />

            <div className="flex flex-row gap-2 items-center">
              <span className="text-sm font-semibold">Difficulty:</span>
              <DifficultyRating value={exercise.totalDifficulty} />
            </div>
            <div className="flex flex-col gap-2">
              {exercise.isSystem ? (
                <Badge variant="default">System</Badge>
              ) : (
                <Badge variant="secondary">Custom</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <TableRow key={exercise.id}>
          <TableCell className="font-medium">{exercise.name}</TableCell>
          <TableCell className="font-medium">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-start">
                  <div className="max-w-24 w-24 truncate">
                    {exercise.description}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{exercise.description}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
          <TableCell>
            {exercise.isSystem ? (
              <Badge variant="default">System</Badge>
            ) : (
              <Badge variant="secondary">Custom</Badge>
            )}
          </TableCell>
          <TableCell>
            <ExerciseListItemHoverCard exercise={exercise} />
          </TableCell>
          <TableCell>
            <DifficultyRating value={exercise.totalDifficulty} />
          </TableCell>
          <TableCell className="flex items-center justify-end">
            {exercise.isSystem ? (
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
                      System Exercises Groups cannot be edited
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <EditExerciseDialog id={exercise.id}>
                <Button size="icon" variant={"ghost"}>
                  <EditIcon />
                </Button>
              </EditExerciseDialog>
            )}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ExerciseListItem;
