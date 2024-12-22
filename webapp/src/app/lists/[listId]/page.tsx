import { PageTitle } from "@/components/page-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/features/auth/lib/auth";
import { getList } from "@/features/lists/data";
import { notFound } from "next/navigation";

interface Props {
  params: {
    listId: string;
  };
}

const ListPage = async ({ params: { listId } }: Props) => {
  const user = await currentUser();
  const list = await getList(listId);

  if (!list || list.createdUserId !== user?.id) notFound();

  return (
    <div className="container space-y-6">
      <PageTitle label={list.name} backBtnHref="/lists" />
      <div>
        <pre>{JSON.stringify(list, null, 2)}</pre>
      </div>
      <Card>
        <CardHeader>Details</CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 border-b py-2">
            <h3>Status:</h3>
            <p>{list.active ? "Active" : "Inactive"}</p>
          </div>
          <div className="grid grid-cols-2 border-b py-2">
            <h3>Status:</h3>
            <p>{list.active ? "Active" : "Inactive"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListPage;
