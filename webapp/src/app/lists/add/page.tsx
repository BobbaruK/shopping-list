import { PageTitle } from "@/components/page-title";
import { AddListForm } from "@/features/lists/components";

const AddListPage = () => {
  return (
    <div className="container space-y-6">
      <PageTitle label="Add shopping list" backBtnHref="/lists" />
      <AddListForm />
    </div>
  );
};

export default AddListPage;
