import MotionContainerY from "@/components/motioned-components/motion-container-y";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScheduledWorkoutListElement } from "@/zod-schemas/scheduled-workout-schemas";
import ScheduledWorkoutListItem from "@/components/app/workouts/scheduled/scheduled-workout-list-item";

interface Props {
  scheduledWorkouts: ScheduledWorkoutListElement[];
  viewVariant: "card" | "list";
}

const ScheduledWorkoutList = ({ scheduledWorkouts, viewVariant }: Props) => {
  return (
    <>
      {viewVariant === "card" ? (
        <MotionContainerY key={"card"} className="grid grid-cols-3 gap-4">
          {scheduledWorkouts.map((workout) => (
            <div key={workout.id}>
              <ScheduledWorkoutListItem
                viewVariant={viewVariant}
                scheduledWorkout={workout}
              />
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
              {scheduledWorkouts.map((workout) => (
                <ScheduledWorkoutListItem
                  key={workout.id}
                  viewVariant={viewVariant}
                  scheduledWorkout={workout}
                />
              ))}
            </TableBody>
          </Table>
        </MotionContainerY>
      )}
    </>
  );
};

export default ScheduledWorkoutList;
