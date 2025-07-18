/*
  Warnings:

  - You are about to drop the column `difficulty` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `muscleGroupId` on the `exercises` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "exercises_muscleGroupId_idx";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "difficulty",
DROP COLUMN "muscleGroupId",
ADD COLUMN     "totalDifficulty" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "ExerciseMuscleGroup" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "muscleGroupId" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ExerciseMuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExerciseMuscleGroup_muscleGroupId_idx" ON "ExerciseMuscleGroup"("muscleGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseMuscleGroup_exerciseId_muscleGroupId_key" ON "ExerciseMuscleGroup"("exerciseId", "muscleGroupId");
