import { MIN_USERNAME } from "@/constants";
import { z } from "zod";

export const listDetailsSchema = z.object({
  name: z.string().min(MIN_USERNAME, {
    message: `Shopping list name must be at least ${MIN_USERNAME} characters long`,
  }),
  active: z.boolean(),
  notes: z.string().optional(),
});
