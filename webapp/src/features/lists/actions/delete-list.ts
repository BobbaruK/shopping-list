"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getList } from "../data";

export const deleteList = async (id: string) => {
  const user = await currentUser();

  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized!" };

  const list = await getList(id);

  if (!list) {
    return {
      error: "List not found",
    };
  }

  if (dbUser.id !== list?.createdUserId && dbUser.role !== UserRole.ADMIN)
    return { error: "Unauthorized!" };

  try {
    await db.shoppingList.delete({
      where: {
        id: list.id,
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
    success: `<strong>"${list.name}"</strong> has been deleted!`,
  };
};
