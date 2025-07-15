/*
  Warnings:

  - You are about to drop the `exercises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `health_metrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nutrition_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scheduled_workouts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workout_exercises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workouts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_userId_fkey";

-- DropForeignKey
ALTER TABLE "health_metrics" DROP CONSTRAINT "health_metrics_userId_fkey";

-- DropForeignKey
ALTER TABLE "nutrition_logs" DROP CONSTRAINT "nutrition_logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "scheduled_workouts" DROP CONSTRAINT "scheduled_workouts_userId_fkey";

-- DropForeignKey
ALTER TABLE "scheduled_workouts" DROP CONSTRAINT "scheduled_workouts_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "workout_exercises" DROP CONSTRAINT "workout_exercises_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_userId_fkey";

-- DropTable
DROP TABLE "exercises";

-- DropTable
DROP TABLE "health_metrics";

-- DropTable
DROP TABLE "nutrition_logs";

-- DropTable
DROP TABLE "scheduled_workouts";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "workout_exercises";

-- DropTable
DROP TABLE "workouts";

-- DropEnum
DROP TYPE "MuscleGroup";
