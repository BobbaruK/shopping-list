import { PageTitle } from "@/components/page-title";
import { currentUser } from "@/features/auth/lib/auth";
import { UserLists } from "@/features/lists/components";

const ListsPage = async () => {
  const user = await currentUser();

  return (
    <div className="container space-y-6">
      <PageTitle label={`${user?.name}'s lists`} addBtnHref="/lists/add" />
      <UserLists />
    </div>
  );
};

export default ListsPage;
