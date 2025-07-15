/*
  Warnings:

  - You are about to drop the column `muscleGroup` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `muscleGroupId` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "muscleGroup",
ADD COLUMN     "muscleGroupId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "MuscleGroup";

-- CreateTable
CREATE TABLE "muscle_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "muscle_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "muscle_groups_userId_idx" ON "muscle_groups"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "muscle_groups_name_userId_key" ON "muscle_groups"("name", "userId");

-- CreateIndex
CREATE INDEX "exercises_muscleGroupId_idx" ON "exercises"("muscleGroupId");
