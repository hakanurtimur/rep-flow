import z from "zod";

export const CreateUpdateMuscleGroupSchema = z.object({
  id: z.string().cuid({ message: "Invalid muscle group ID" }).optional(),
  name: z.string().min(1),
});

export type CreateUpdateMuscleGroup = z.infer<
  typeof CreateUpdateMuscleGroupSchema
>;
