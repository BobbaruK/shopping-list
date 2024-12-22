import { PageTitle } from "@/components/page-title";
import { currentUser } from "@/features/auth/lib/auth";
import { ListDetails } from "@/features/lists/components";
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
      {/* <div>
        <pre>{JSON.stringify(list, null, 2)}</pre>
      </div> */}
      <ListDetails list={list} />
    </div>
  );
};

export default ListPage;
