import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/features/auth/lib/auth";
import { UserLists } from "@/features/lists/components";
import Link from "next/link";
import { IoAddCircleOutline } from "react-icons/io5";

const ListsPage = async () => {
  const user = await currentUser();

  return (
    <div className="container space-y-6">
      <PageTitle
        label={`${user?.name}'s lists`}
        button={
          <Button
            variant={"outline"}
            size={"sm"}
            className="flex gap-2"
            asChild
          >
            <Link href={"#"}>
              <IoAddCircleOutline size={18} />
              Add List
            </Link>
          </Button>
        }
      />
      <UserLists />
    </div>
  );
};

export default ListsPage;
