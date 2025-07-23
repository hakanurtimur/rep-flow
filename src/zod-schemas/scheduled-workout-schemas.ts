import { z } from "zod";

export const eventColorKeyEnum = z.enum([
  "primary",
  "secondary",
  "tertiary",
  "accent",
  "muted",
  "chart1",
  "chart2",
  "chart3",
  "chart4",
  "chart5",
]);

export const CreateScheduledWorkoutSchema = z.object({
  workoutId: z.string().min(1, "Workout ID is required"),
  scheduledAt: z.union([z.string().datetime(), z.date()]),
  colorKey: eventColorKeyEnum.optional(),
});

export type CreateScheduledWorkoutInput = z.infer<
  typeof CreateScheduledWorkoutSchema
>;
