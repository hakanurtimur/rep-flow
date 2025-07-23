import MotionContainerY from "@/components/motioned-components/motion-container-y";
import { ExtendedWorkout } from "@/zod-schemas/workout-schemas";
import WorkoutDetailsContentPreview from "@/components/app/workouts/list/workout-details/workout-details-content/workout-details-content-preview";
import WorkoutDetailsContentEdit from "@/components/app/workouts/list/workout-details/workout-details-content/template-details-content-edit/workout-details-content-edit";

interface Props {
  workout: ExtendedWorkout;
  viewVariant: "edit" | "preview";
  onViewVariantChange: (variant: "edit" | "preview") => void;
}

const WorkoutDetailsContent = ({
  workout,
  viewVariant,
  onViewVariantChange,
}: Props) => {
  return (
    <>
      {viewVariant === "preview" ? (
        <MotionContainerY key={"preview"} className="flex flex-col gap-4">
          <WorkoutDetailsContentPreview workout={workout} />
        </MotionContainerY>
      ) : (
        <MotionContainerY key={"edit"} className="flex flex-col gap-4">
          <WorkoutDetailsContentEdit
            workout={workout}
            onViewVariantChange={onViewVariantChange}
          />
        </MotionContainerY>
      )}
    </>
  );
};

export default WorkoutDetailsContent;
