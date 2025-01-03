import { MIN_USERNAME } from "@/constants";
import { z } from "zod";

export const addListItemSchema = z.object({
  itemName: z.string().min(MIN_USERNAME, {
    message: `Item name must be at least ${MIN_USERNAME} characters long`,
  }),
  pieces: z.union([z.number().gt(0, "Must be greater than 0"), z.string()]),
  price: z.union([z.number().gt(0, "Must be greater than 0"), z.string()]),
  total: z.union([z.number().gt(0, "Must be greater than 0"), z.string()]),
  active: z.boolean(),
  notes: z.string().optional(),
});
