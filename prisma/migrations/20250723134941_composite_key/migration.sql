/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `workouts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "workouts_id_userId_key" ON "workouts"("id", "userId");
