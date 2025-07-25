/*
  Warnings:

  - A unique constraint covering the columns `[calendarEventId]` on the table `nutrition_logs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[calendarEventId]` on the table `scheduled_workouts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "nutrition_logs" ADD COLUMN     "calendarEventId" TEXT;

-- AlterTable
ALTER TABLE "scheduled_workouts" ADD COLUMN     "calendarEventId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_logs_calendarEventId_key" ON "nutrition_logs"("calendarEventId");

-- CreateIndex
CREATE UNIQUE INDEX "scheduled_workouts_calendarEventId_key" ON "scheduled_workouts"("calendarEventId");
