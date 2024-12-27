import db from "@/lib/db";

export const getList = async (id: string) => {
  try {
    const list = await db.shoppingList.findFirst({
      where: {
        id,
      },
      include: {
        listItems: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return list;
  } catch {
    return null;
  }
};
