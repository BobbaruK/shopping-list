"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const setListItemActive = async (itemId: string) => {
  const user = await currentUser();

  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized!" };

  const existingListItem = await db.listItem.findFirst({
    where: {
      id: itemId,
    },
  });

  if (!existingListItem) return { error: "List item not found!" };

  try {
    await db.listItem.update({
      where: {
        id: itemId,
      },
      data: {
        active: !existingListItem.active,
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
