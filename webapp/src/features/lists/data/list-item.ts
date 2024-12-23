import db from "@/lib/db";

export const getListItem = async (id: string) => {
  try {
    const list = await db.listItem.findFirst({
      where: {
        id,
      },
    });

    return list;
  } catch {
    return null;
  }
};
