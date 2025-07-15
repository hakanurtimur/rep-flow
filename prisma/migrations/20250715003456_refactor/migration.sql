-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('CHEST', 'BACK', 'LEGS', 'SHOULDERS', 'ARMS', 'CORE', 'CARDIO', 'FULL_BODY');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WORKOUT', 'NUTRITION');

-- CreateTable
CREATE TABLE "workouts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_exercises" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "sets" INTEGER NOT NULL DEFAULT 1,
    "reps" INTEGER NOT NULL DEFAULT 1,
    "weight" DOUBLE PRECISION,
    "duration" INTEGER,
    "restTime" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "workout_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template_exercises" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "sets" INTEGER NOT NULL DEFAULT 1,
    "reps" INTEGER NOT NULL DEFAULT 1,
    "weight" DOUBLE PRECISION,
    "duration" INTEGER,
    "restTime" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "template_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "firstName" TEXT,
    "lastName" TEXT,
    "age" TEXT,
    "weightUnit" TEXT,
    "heightUnit" TEXT,
    "fitnessGoal" TEXT,
    "activityLevel" TEXT,
    "notes" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_workouts" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scheduled_workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nutrition_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals" (
    "id" TEXT NOT NULL,
    "nutritionLogId" TEXT NOT NULL,
    "type" "MealType" NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION,
    "carbs" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_metrics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sleep" DOUBLE PRECISION,
    "water" INTEGER,
    "stress" INTEGER,
    "energy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "health_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "muscleGroup" "MuscleGroup" NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "workoutId" TEXT,
    "nutritionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calendar_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "workouts_userId_idx" ON "workouts"("userId");

-- CreateIndex
CREATE INDEX "workout_exercises_workoutId_idx" ON "workout_exercises"("workoutId");

-- CreateIndex
CREATE INDEX "workout_exercises_exerciseId_idx" ON "workout_exercises"("exerciseId");

-- CreateIndex
CREATE INDEX "workout_templates_userId_idx" ON "workout_templates"("userId");

-- CreateIndex
CREATE INDEX "template_exercises_templateId_idx" ON "template_exercises"("templateId");

-- CreateIndex
CREATE INDEX "template_exercises_exerciseId_idx" ON "template_exercises"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "scheduled_workouts_workoutId_idx" ON "scheduled_workouts"("workoutId");

-- CreateIndex
CREATE INDEX "scheduled_workouts_userId_idx" ON "scheduled_workouts"("userId");

-- CreateIndex
CREATE INDEX "nutrition_logs_userId_idx" ON "nutrition_logs"("userId");

-- CreateIndex
CREATE INDEX "meals_nutritionLogId_idx" ON "meals"("nutritionLogId");

-- CreateIndex
CREATE INDEX "health_metrics_userId_idx" ON "health_metrics"("userId");

-- CreateIndex
CREATE INDEX "exercises_userId_idx" ON "exercises"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "calendar_events_nutritionId_key" ON "calendar_events"("nutritionId");

-- CreateIndex
CREATE INDEX "calendar_events_userId_idx" ON "calendar_events"("userId");

-- CreateIndex
CREATE INDEX "calendar_events_workoutId_idx" ON "calendar_events"("workoutId");
