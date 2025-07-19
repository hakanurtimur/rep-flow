/*
  Warnings:

  - You are about to drop the column `duration` on the `template_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `template_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `restTime` on the `template_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `template_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `template_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `workout_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `workout_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `restTime` on the `workout_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `workout_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `workout_exercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "template_exercises" DROP COLUMN "duration",
DROP COLUMN "reps",
DROP COLUMN "restTime",
DROP COLUMN "sets",
DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "workout_exercises" DROP COLUMN "duration",
DROP COLUMN "reps",
DROP COLUMN "restTime",
DROP COLUMN "sets",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "WorkoutExerciseSet" (
    "id" TEXT NOT NULL,
    "workoutExerciseId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "duration" INTEGER,
    "restTime" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WorkoutExerciseSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateExerciseSet" (
    "id" TEXT NOT NULL,
    "templateExerciseId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "duration" INTEGER,
    "restTime" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TemplateExerciseSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkoutExerciseSet_workoutExerciseId_idx" ON "WorkoutExerciseSet"("workoutExerciseId");

-- CreateIndex
CREATE INDEX "TemplateExerciseSet_templateExerciseId_idx" ON "TemplateExerciseSet"("templateExerciseId");
