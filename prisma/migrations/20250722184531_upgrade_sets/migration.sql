/*
  Warnings:

  - Made the column `weight` on table `template_exercise_set` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `template_exercise_set` required. This step will fail if there are existing NULL values in that column.
  - Made the column `restTime` on table `template_exercise_set` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `workout_exercise_set` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `workout_exercise_set` required. This step will fail if there are existing NULL values in that column.
  - Made the column `restTime` on table `workout_exercise_set` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "template_exercise_set" ALTER COLUMN "weight" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "restTime" SET NOT NULL;

-- AlterTable
ALTER TABLE "workout_exercise_set" ALTER COLUMN "weight" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "restTime" SET NOT NULL;
