import { MIN_USERNAME } from "@/constants";
import { z } from "zod";

export const addListSchema = z.object({
  shoppingListName: z.string().min(MIN_USERNAME, {
    message: `Shopping list name must be at least ${MIN_USERNAME} characters long`,
  }),
  notes: z.string().optional(),
});
