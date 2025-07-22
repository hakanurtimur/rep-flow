import { z } from "zod";

export const SetSchema = z.object({
  reps: z.number().nonnegative(),
  weight: z.number().nonnegative(),
  duration: z.number().nonnegative(),
  restTime: z.number().nonnegative(),
  order: z.number().nonnegative(),
});

export type SetInput = z.infer<typeof SetSchema>;
