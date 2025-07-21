import { MuscleGroup } from "@prisma/client";
import MuscleGroupListItem from "@/components/app/exercises/muscle-groups/muscle-group-list-item";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MotionContainerY from "@/components/motioned-components/motion-container-y";

interface Props {
  muscleGroups: MuscleGroup[];
  viewVariant: "card" | "list";
}

const MuscleGroupList = ({ muscleGroups, viewVariant }: Props) => {
  return (
    <>
      {viewVariant === "card" ? (
        <MotionContainerY key={"card"} className="grid grid-cols-4 gap-4">
          {muscleGroups.map((muscleGroup) => (
            <div key={muscleGroup.id}>
              <MuscleGroupListItem
                viewVariant={viewVariant}
                muscleGroup={muscleGroup}
              />
            </div>
          ))}
        </MotionContainerY>
      ) : (
        <MotionContainerY key={"list"} className="max-w-4xl">
          <Table className="max-w-full w-full!">
            <TableCaption>
              List of Muscle Groups. Click on the edit icon to modify a muscle
              group.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Muscle Group Name</TableHead>
                <TableHead></TableHead>
                <TableHead>
                  <div className="flex items-center justify-end">Actions</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {muscleGroups.map((muscleGroup) => (
                <MuscleGroupListItem
                  key={muscleGroup.id}
                  viewVariant={viewVariant}
                  muscleGroup={muscleGroup}
                />
              ))}
            </TableBody>
          </Table>
        </MotionContainerY>
      )}
    </>
  );
};

export default MuscleGroupList;
