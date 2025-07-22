import MotionContainerY from "@/components/motioned-components/motion-container-y";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WorkoutListElement } from "@/zod-schemas/workout-schemas";
import WorkoutListItem from "@/components/app/workouts/list/workout-list-item";

interface Props {
  workouts: WorkoutListElement[];
  viewVariant: "card" | "list";
}

const WorkoutList = ({ workouts, viewVariant }: Props) => {
  return (
    <>
      {viewVariant === "card" ? (
        <MotionContainerY key={"card"} className="grid grid-cols-3 gap-4">
          {workouts.map((workout) => (
            <div key={workout.id}>
              <WorkoutListItem viewVariant={viewVariant} workout={workout} />
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
              {workouts.map((workout) => (
                <WorkoutListItem
                  key={workout.id}
                  viewVariant={viewVariant}
                  workout={workout}
                />
              ))}
            </TableBody>
          </Table>
        </MotionContainerY>
      )}
    </>
  );
};

export default WorkoutList;
