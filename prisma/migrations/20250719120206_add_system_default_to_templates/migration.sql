-- AlterTable
ALTER TABLE "workout_templates" ADD COLUMN     "isSystem" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userId" DROP NOT NULL;
