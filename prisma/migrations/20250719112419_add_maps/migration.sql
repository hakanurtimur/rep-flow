/*
  Warnings:

  - You are about to drop the `ExerciseMuscleGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplateExerciseSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutExerciseSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExerciseMuscleGroup";

-- DropTable
DROP TABLE "TemplateExerciseSet";

-- DropTable
DROP TABLE "WorkoutExerciseSet";

-- CreateTable
CREATE TABLE "workout_exercise_set" (
    "id" TEXT NOT NULL,
    "workoutExerciseId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "duration" INTEGER,
    "restTime" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "workout_exercise_set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template_exercise_set" (
    "id" TEXT NOT NULL,
    "templateExerciseId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "duration" INTEGER,
    "restTime" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "template_exercise_set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_muscle_group" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "muscleGroupId" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "exercise_muscle_group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "workout_exercise_set_workoutExerciseId_idx" ON "workout_exercise_set"("workoutExerciseId");

-- CreateIndex
CREATE INDEX "template_exercise_set_templateExerciseId_idx" ON "template_exercise_set"("templateExerciseId");

-- CreateIndex
CREATE INDEX "exercise_muscle_group_muscleGroupId_idx" ON "exercise_muscle_group"("muscleGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_muscle_group_exerciseId_muscleGroupId_key" ON "exercise_muscle_group"("exerciseId", "muscleGroupId");
