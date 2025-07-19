import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import DifficultyRating from "@/components/ui/difficulty-rating";
import { WorkoutTemplateList } from "@/zod-schemas/workout-template-schemas";
import TemplateListItemHoverCard from "@/components/workouts/templates/template-list-item-hover-card";

interface Props {
  template: WorkoutTemplateList;
  viewVariant: "list" | "card";
}

const TemplateListItem = ({ template, viewVariant }: Props) => {
  return (
    <>
      {viewVariant === "card" ? (
        <Card className="bg-bg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{template.name}</CardTitle>
              {template.isSystem ? (
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
                        System Workout Templates cannot be edited
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Button size="icon" variant={"ghost"}>
                  <EditIcon />
                </Button>
              )}
            </div>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-start w-full">
            <TemplateListItemHoverCard template={template} />
            <div className="flex flex-row gap-2 items-center">
              <span className="text-sm font-semibold">Difficulty:</span>
              <DifficultyRating value={template.difficulty} />
            </div>
            <div className="flex flex-col gap-2">
              {template.isSystem ? (
                <Badge variant="default">System</Badge>
              ) : (
                <Badge variant="tertiary">Custom</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <TableRow key={template.id}>
          <TableCell className="font-medium">{template.name}</TableCell>
          <TableCell className="font-medium">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-start">
                  <div className="max-w-24 w-24 truncate">
                    {template.description}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{template.description}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
          <TableCell>
            {template.isSystem ? (
              <Badge variant="default">System</Badge>
            ) : (
              <Badge variant="tertiary">Custom</Badge>
            )}
          </TableCell>
          <TableCell>
            <TemplateListItemHoverCard template={template} />
          </TableCell>
          <TableCell className="flex items-center justify-end">
            {template.isSystem ? (
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
                      System Workout Templates cannot be edited
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button size="icon" variant={"ghost"}>
                <EditIcon />
              </Button>
            )}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TemplateListItem;
