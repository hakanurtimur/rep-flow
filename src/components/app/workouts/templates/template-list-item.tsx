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
import { EyeIcon, TimerIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import DifficultyRating from "@/components/ui/difficulty-rating";
import { WorkoutTemplateList } from "@/zod-schemas/workout-template-schemas";
import TemplateListItemHoverCard from "@/components/app/workouts/templates/template-list-item-hover-card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface Props {
  template: WorkoutTemplateList;
  viewVariant: "list" | "card";
}

const TemplateListItem = ({ template, viewVariant }: Props) => {
  return (
    <>
      {viewVariant === "card" ? (
        <Card className="bg-background">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{template.name}</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/workouts/templates/${template.id}`}>
                      <Button size="icon" variant={"ghost"}>
                        <EyeIcon />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    {template.isSystem ? "See Details" : "See Details & Update"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-start w-full">
            <div className="flex flex-row gap-2 text-xs font-semibold h-6">
              <Badge variant={template.isSystem ? "outline" : "default"}>
                {template.isSystem ? "System Template" : "Your Template"}
              </Badge>
              <Separator
                orientation={"vertical"}
                className={"h-full min-h-full"}
              />
              <div className="flex flex-row items-center gap-2 font-semibold">
                <TimerIcon className="w-4 h-4" />{" "}
                <span>{template.duration} min</span>
              </div>
              <Separator
                orientation={"vertical"}
                className={"h-full min-h-full"}
              />
              <DifficultyRating value={template.difficulty} />
            </div>
            <TemplateListItemHoverCard template={template} />
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
          <TableCell>
            <DifficultyRating value={template.difficulty} />
          </TableCell>
          <TableCell className="text-sm">
            <div className="flex gap-2 items-center">
              <TimerIcon className="w-4 h-4" />{" "}
              <span>{template.duration} min</span>
            </div>
          </TableCell>
          <TableCell className="flex items-center justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/workouts/templates/${template.id}`}>
                    <Button size="icon" variant={"ghost"}>
                      <EyeIcon />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  {template.isSystem ? "See Details" : "See Details & Update"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TemplateListItem;
