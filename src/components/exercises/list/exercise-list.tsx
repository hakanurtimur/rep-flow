"use client";

import MotionContainerY from "@/components/motioned-components/motion-container-y";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExerciseListItem from "@/components/exercises/list/exercise-list-item";
import { ExtendedExercises } from "@/zod-schemas/exercise-schemas";

interface Props {
  exercises: ExtendedExercises[];
  viewVariant: "card" | "list";
}

const ExerciseList = ({ exercises, viewVariant }: Props) => {
  return (
    <>
      {viewVariant === "card" ? (
        <MotionContainerY key={"card"} className="grid grid-cols-3 gap-4">
          {exercises.map((exercise) => (
            <ExerciseListItem
              key={exercise.id}
              exercise={exercise}
              viewVariant={viewVariant}
            />
          ))}
        </MotionContainerY>
      ) : (
        <MotionContainerY key={"list"} className="max-w-6xl">
          <Table className="max-w-full w-full!">
            <TableHeader>
              <TableRow>
                <TableHead>Exercise</TableHead>
                <TableHead>Description</TableHead>
                <TableHead></TableHead>
                <TableHead>Muscle Groups</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>
                  <div className="flex items-center justify-end">Actions</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.map((exercise) => (
                <ExerciseListItem
                  key={exercise.id}
                  exercise={exercise}
                  viewVariant={viewVariant}
                />
              ))}
            </TableBody>
          </Table>
        </MotionContainerY>
      )}
    </>
  );
};

export default ExerciseList;
