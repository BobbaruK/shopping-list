"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { UserRole } from "@prisma/client";
import { getListItem } from "../data";
import { revalidatePath } from "next/cache";

export const deleteListItem = async (id: string) => {
  const user = await currentUser();

  if (!user) return { error: "Unauthorized!" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized!" };

  const list = await getListItem(id);

  if (!list) {
    return {
      error: "List not found",
    };
  }

  if (dbUser.id !== list?.createdUserId && dbUser.role !== UserRole.ADMIN)
    return { error: "Unauthorized!" };

  try {
    await db.listItem.delete({
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
