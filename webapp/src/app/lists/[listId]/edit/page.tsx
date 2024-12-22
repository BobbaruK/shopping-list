import { PageTitle } from "@/components/page-title";
import { currentUser } from "@/features/auth/lib/auth";
import { ListDetailsForm } from "@/features/lists/components";
import { getList } from "@/features/lists/data";
import { notFound } from "next/navigation";

interface Props {
  params: {
    listId: string;
  };
}

const EditShoppingList = async ({ params: { listId } }: Props) => {
  const user = await currentUser();
  const list = await getList(listId);

  if (!list || list.createdUserId !== user?.id) notFound();
  return (
    <div className="container space-y-6">
      <PageTitle
        label={`Edit "${list.name}"`}
        backBtnHref={`/lists/${list.id}`}
      />

      <ListDetailsForm list={list}  />
    </div>
  );
};

export default EditShoppingList;
