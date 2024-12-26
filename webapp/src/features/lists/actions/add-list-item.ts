"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
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

  const piecesNumber = parseFloat(`${pieces}`);
  const priceNumber = parseFloat(`${price}`);
  const totalValue = parseFloat(`${total}`);

  if (piecesNumber < 0.001 || priceNumber < 0.001)
    return { error: "Invalid fields!" };

  const totalNumber = piecesNumber * priceNumber;

  if (totalValue.toFixed(2) !== totalNumber.toFixed(2))
    return { error: "Data altered!" };

  try {
    await db.listItem.create({
      data: {
        name: itemName,
        pieces: piecesNumber,
        price: priceNumber,
        priceTotal: parseFloat(totalNumber.toFixed(2)),
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
    success: "List item successfully created!",
  };
};
