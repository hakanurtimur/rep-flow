/*
  Warnings:

  - You are about to drop the column `calories` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `carbs` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `nutritionLogId` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the `nutrition_logs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mealId]` on the table `calendar_events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[calendarEventId]` on the table `meals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nutritionPlanId` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "meals_nutritionLogId_idx";

-- AlterTable
ALTER TABLE "calendar_events" ADD COLUMN     "mealId" TEXT;

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "calories",
DROP COLUMN "carbs",
DROP COLUMN "fat",
DROP COLUMN "nutritionLogId",
DROP COLUMN "protein",
ADD COLUMN     "calendarEventId" TEXT,
ADD COLUMN     "nutritionPlanId" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "nutrition_logs";

-- CreateTable
CREATE TABLE "nutrition_plans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nutrition_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "nutrition_plans_userId_date_idx" ON "nutrition_plans"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "calendar_events_mealId_key" ON "calendar_events"("mealId");

-- CreateIndex
CREATE UNIQUE INDEX "meals_calendarEventId_key" ON "meals"("calendarEventId");

-- CreateIndex
CREATE INDEX "meals_nutritionPlanId_idx" ON "meals"("nutritionPlanId");
