import { MuscleGroup } from "@prisma/client";
import MuscleGroupListItem from "@/components/exercises/muscle-groups/muscle-group-list-item";

interface Props {
  muscleGroups: MuscleGroup[]; // Replace 'any' with the actual type of muscle groups
}

const MuscleGroupList = ({ muscleGroups }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {muscleGroups.map((muscleGroup) => (
        <div key={muscleGroup.id} className="">
          <MuscleGroupListItem muscleGroup={muscleGroup} />
        </div>
      ))}
    </div>
  );
};

export default MuscleGroupList;
