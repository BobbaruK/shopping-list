import db from "@/lib/db";

export const getList = async (id: string) => {
  try {
    const list = await db.shoppingList.findFirst({
      where: {
        id,
      },
    });

    return list;
  } catch {
    return null;
  }
};
