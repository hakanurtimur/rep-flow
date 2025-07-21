-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "templateId" TEXT;

-- CreateTable
CREATE TABLE "workout_template_on_workout" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "workout_template_on_workout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "workout_template_on_workout_templateId_idx" ON "workout_template_on_workout"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "workout_template_on_workout_workoutId_templateId_key" ON "workout_template_on_workout"("workoutId", "templateId");

-- CreateIndex
CREATE INDEX "workouts_templateId_idx" ON "workouts"("templateId");
