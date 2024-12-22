import { PageTitle } from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { currentUser } from "@/features/auth/lib/auth";
import { AddListItems } from "@/features/lists/components";
import { getList } from "@/features/lists/data";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <PageTitle
        label={list.name}
        backBtnHref="/lists"
        editBtnHref={`/lists/${list.id}/edit`}
      />

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>
            <Card className="flex flex-wrap items-start justify-between gap-6 p-4">
              <div>
                <div>Status:</div>
                {list.active ? (
                  <Badge variant={"success"}>Active</Badge>
                ) : (
                  <Badge variant={"danger"}>Inactive</Badge>
                )}
              </div>
              <div>
                <div>Created at:</div>
                <div>
                  <p>
                    {formatDate(list.createdAt, {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
              <div>
                <div>Updated at:</div>
                <div>
                  <p>
                    {formatDate(list.updatedAt, {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div>Notes:</div>
                <div>
                  <pre className="text-wrap">{list.notes}</pre>
                </div>
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <AddListItems />
    </div>
  );
};

export default ListPage;
