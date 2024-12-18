"use server";

import { getUserById } from "@/features/auth/data";
import { currentUser } from "@/features/auth/lib/auth";
import { getList } from "../data";
import { UserRole } from "@prisma/client";
import db from "@/lib/db";

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

  await db.shoppingList.delete({
    where: {
      id: list.id,
    },
  });

  return {
    success: `<strong>"${list.name}"</strong> has been deleted!`,
  };
};
