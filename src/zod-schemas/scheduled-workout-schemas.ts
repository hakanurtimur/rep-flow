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

export type EventColorKey = z.infer<typeof eventColorKeyEnum>;

export const CreateScheduledWorkoutSchema = z.object({
  workoutId: z.string().min(1, "Workout ID is required"),
  scheduledAt: z.union([z.string().datetime(), z.date()]),
  colorKey: eventColorKeyEnum.optional(),
});

export type CreateScheduledWorkoutInput = z.infer<
  typeof CreateScheduledWorkoutSchema
>;

export const ScheduledWorkoutListElementSchema = z.object({
  id: z.string(),
  scheduledAt: z.coerce.date(),
  completed: z.boolean(),
  workout: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    duration: z.number(),
    difficulty: z.number(),
  }),
  calendarEvent: z.object({
    id: z.string(),
    date: z.coerce.date(),
    colorKey: z.string().nullable(),
  }),
});

export type ScheduledWorkoutListElement = z.infer<
  typeof ScheduledWorkoutListElementSchema
>;

export const UpdateScheduledWorkoutSchema = CreateScheduledWorkoutSchema.extend(
  {
    id: z.string(),
  },
);

export type UpdateScheduledWorkoutInput = z.infer<
  typeof UpdateScheduledWorkoutSchema
>;

export const UpdateScheduledWorkoutStatusSchema = z.object({
  completed: z.boolean(),
});
export type UpdateScheduledWorkoutStatusInput = z.infer<
  typeof UpdateScheduledWorkoutStatusSchema
>;
