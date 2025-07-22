/*
  Warnings:

  - You are about to drop the column `templateId` on the `workouts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "workouts_templateId_idx";

-- AlterTable
ALTER TABLE "workouts" DROP COLUMN "templateId";
