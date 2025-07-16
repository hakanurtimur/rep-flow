import MuscleGroupDialog from "@/components/exercises/muscle-groups/muscle-group-dialog/muscle-group-dialog";
import { Button } from "@/components/ui/button";

const MuscleGroupsHeader = () => {
  return (
    <div className="flex w-full justify-end">
      <MuscleGroupDialog variant="create">
        <Button variant="dark" className="w-fit">
          Add Muscle Group
        </Button>
      </MuscleGroupDialog>
    </div>
  );
};

export default MuscleGroupsHeader;
