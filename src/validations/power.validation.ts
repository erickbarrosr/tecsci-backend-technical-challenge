import { z } from "zod";

export const dateRangeSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export const idSchema = z.object({ id: z.coerce.number() });
