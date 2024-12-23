"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addListSchema } from "../schemas";

export const addList = async (values: z.infer<typeof addListSchema>) => {
  const validatedFields = addListSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { shoppingListName, notes } = validatedFields.data;

  const user = await currentUser();

  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized!" };

  let newListId;

  try {
    const newList = await db.shoppingList.create({
      data: {
        name: shoppingListName,
        notes: notes || null,
        createdUserId: dbUser.id,
      },
    });

    newListId = newList.id;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    throw error;
  }

  revalidatePath("/");

  return {
    success: "Shopping list successfully created!",
    listId: newListId,
  };
};
