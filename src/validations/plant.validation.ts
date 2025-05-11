import { z } from "zod";

export const createPlantSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome não pode exceder 100 caracteres"),
});

export const updatePlantSchema = createPlantSchema.partial();

export const plantIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
