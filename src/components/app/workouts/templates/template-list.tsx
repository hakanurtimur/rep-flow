import { WorkoutTemplateList } from "@/zod-schemas/workout-template-schemas";
import MotionContainerY from "@/components/motioned-components/motion-container-y";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TemplateListItem from "@/components/app/workouts/templates/template-list-item";

interface Props {
  templates: WorkoutTemplateList[];
  viewVariant: "card" | "list";
}

const TemplateList = ({ templates, viewVariant }: Props) => {
  return (
    <>
      {viewVariant === "card" ? (
        <MotionContainerY key={"card"} className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <div key={template.id}>
              <TemplateListItem viewVariant={viewVariant} template={template} />
            </div>
          ))}
        </MotionContainerY>
      ) : (
        <MotionContainerY key={"list"} className="max-w-6xl">
          <Table className="max-w-full w-full!">
            <TableHeader>
              <TableRow>
                <TableHead>Workout Template</TableHead>
                <TableHead>Description</TableHead>
                <TableHead></TableHead>
                <TableHead>Exercises</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>
                  <div className="flex items-center justify-end">Actions</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TemplateListItem
                  key={template.id}
                  viewVariant={viewVariant}
                  template={template}
                />
              ))}
            </TableBody>
          </Table>
        </MotionContainerY>
      )}
    </>
  );
};

export default TemplateList;
