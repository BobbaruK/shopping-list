import db from "@/lib/db";

export const getList = async (id: string) => {
  try {
    const list = await db.shoppingList.findFirst({
      where: {
        id,
      },
      include: {
        listItems: true,
      },
    });

    return list;
  } catch {
    return null;
  }
};
