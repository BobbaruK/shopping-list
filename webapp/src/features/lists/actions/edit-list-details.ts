"use server";

import { z } from "zod";
import { listDetailsSchema } from "../schemas";
import { currentUser } from "@/features/auth/lib/auth";
import { getUserById } from "@/features/auth/data";
import db from "@/lib/db";

export const editListDetails = async (
  id: string,
  values: z.infer<typeof listDetailsSchema>,
) => {
  const validatedFields = listDetailsSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, notes, active } = validatedFields.data;

  const user = await currentUser();

  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized!" };

  await db.shoppingList.update({
    where: {
      id,
    },
    data: {
      name,
      notes: notes || null,
      active,
      updatedAt: new Date(),
    },
  });

  return {
    success: `Shopping list successfully edited!`,
  };
};
