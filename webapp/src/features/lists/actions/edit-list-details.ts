"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { listDetailsSchema } from "../schemas";

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

  try {
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
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    throw error;
  }

  revalidatePath("/");

  return {
    success: `Shopping list successfully edited!`,
  };
};
