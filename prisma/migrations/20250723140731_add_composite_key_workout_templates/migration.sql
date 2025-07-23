/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `workout_templates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "workout_templates_id_userId_key" ON "workout_templates"("id", "userId");
