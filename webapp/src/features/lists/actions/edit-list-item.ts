"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addListItemSchema } from "../schemas";
import db from "@/lib/db";

export const editListItem = async (
  values: z.infer<typeof addListItemSchema>,
  shoppingListId: string,
  listItemId: string,
) => {
  const validatedFields = addListItemSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { itemName, pieces, price, total, active, notes } =
    validatedFields.data;

  const user = await currentUser();

  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized!" };

  const existingListItem = await db.listItem.findFirst({
    where: {
      id: listItemId,
    },
  });

  if (!existingListItem) return { error: "List item not found!" };

  if (existingListItem.shoppingListId !== shoppingListId)
    return { error: "List item not found in this shopping list" };

  const piecesNumber = parseInt(`${pieces}`);
  const priceNumber = parseInt(`${price}`);
  const totalValue = parseInt(`${total}`);

  if (piecesNumber < 1 || priceNumber < 1) return { error: "Invalid fields!" };

  const totalNumber = piecesNumber * priceNumber;

  if (totalValue !== totalNumber) return { error: "Data altered!" };

  try {
    await db.listItem.update({
      where: {
        id: listItemId,
      },
      data: {
        name: itemName,
        pieces: piecesNumber,
        price: priceNumber,
        priceTotal: totalNumber,
        active,
        notes,
        createdUserId: dbUser.id,
        shoppingListId,
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
    success: `List item "<strong>${existingListItem.name}</strong>" successfully edited!`,
  };
};
