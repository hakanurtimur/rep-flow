import z from "zod";

export const CreateUpdateMuscleGroupSchema = z.object({
  id: z.string().cuid({ message: "Invalid muscle group ID" }).optional(),
  name: z.string().min(1),
});

export type CreateUpdateMuscleGroup = z.infer<
  typeof CreateUpdateMuscleGroupSchema
>;

export const MuscleGroupOptionsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type MuscleGroupOption = z.infer<typeof MuscleGroupOptionsSchema>;

export const MuscleGroupWithDifficultySchema = z.object({
  difficulty: z.number().min(1).max(10),
  muscleGroup: z.object({
    name: z.string(),
  }),
});
