/*
  Warnings:

  - You are about to drop the column `mealId` on the `calendar_events` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "calendar_events_mealId_key";

-- AlterTable
ALTER TABLE "calendar_events" DROP COLUMN "mealId";
