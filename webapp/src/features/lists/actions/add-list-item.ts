"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import { addListItemSchema } from "../schemas";

export const addListItem = async (
  values: z.infer<typeof addListItemSchema>,
  shoppingListId: string,
) => {
  const validatedFields = addListItemSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { itemName, pieces, price, total, active, notes } =
    validatedFields.data;

  const user = await currentUser();

  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized!" };

  const piecesNumber = parseInt(`${pieces}`);
  const priceNumber = parseInt(`${price}`);
  const totalValue = parseInt(`${total}`);

  if (piecesNumber < 1 || priceNumber < 1) return { error: "Invalid fields!" };

  const totalNumber = piecesNumber * priceNumber;

  if (totalValue !== totalNumber) return { error: "Data altered!" };

  try {
    await db.listItem.create({
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

  return {
    success: "List item successfully created!",
  };
};
