"use server";

import db from "@/lib/db";

export const getUserLists = async (createdUserId: string) => {
  try {
    const userList = await db.shoppingList.findMany({
      where: {
        createdUserId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: true,
        listItems: true,
      },
    });

    return userList;
  } catch {
    return null;
  }
};
