import { Card } from "@/components/ui/card";
import { currentUser } from "@/features/auth/lib/auth";
import { getUserLists } from "../data";
import { ListActions } from "./list-actions";
import Link from "next/link";

export const UserLists = async () => {
  const user = await currentUser();
  const userLists = await getUserLists(user?.id || "");

  return (
    <div>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(userLists, null, 2)}</pre> */}

      <div className="flex flex-col gap-4">
        {userLists?.map((list) => (
          <Card
            key={list.id}
            className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center"
          >
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                <Link href={`/lists/${list.id}`}>{list.name}</Link>
              </h3>
              <p className={"text-sm text-muted-foreground"}>
                List items: {list._count.listItems}
              </p>
              {/* <p>{list.active ? "tru" : "false"}</p> */}
            </div>
            <div className="flex gap-4 lg:ms-auto">
              <ListActions shoppingList={list} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
