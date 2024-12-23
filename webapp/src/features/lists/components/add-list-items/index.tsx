"use client";

import { CustomButton } from "@/components/custom-button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { AddListItemForm } from "../form/add-list-item";
import { ListItemActions } from "../list-item-actions";

interface Props {
  list: Prisma.ShoppingListGetPayload<{
    include: {
      listItems: true;
    };
  }>;
}

export const AddListItems = ({ list }: Props) => {
  const [addNewItem, setAddNewItem] = useState(false);

  return (
    <>
      <h2>Items</h2>
      {list.listItems.length > 0 && (
        <>
          {list.listItems.map((listItem) => (
            <Card key={listItem.id}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <CardTitle>{listItem.name}</CardTitle>

                  <div className="flex flex-wrap items-center gap-2">
                    <ListItemActions listItem={listItem} />
                    {/* <CustomButton
                      buttonLabel="Delete"
                      icon={MdDelete}
                      iconPlacement="left"
                      variant={"destructive"}
                    />
                    <CustomButton
                      buttonLabel="Edit"
                      icon={MdModeEdit}
                      iconPlacement="left"
                      variant={"warning"}
                    /> */}
                  </div>
                </div>
                {listItem.notes && (
                  <pre className="text-wrap text-sm text-muted-foreground">
                    {listItem.notes}
                  </pre>
                )}
              </CardHeader>
              {/* <CardContent>
                <pre>{JSON.stringify(listItem, null, 2)}</pre>
              </CardContent> */}
              <CardFooter className="flex flex-col flex-wrap items-start justify-start gap-6">
                <div className="flex-wrap justify-between gap-6">
                  <p>
                    <span className="text-lg font-bold">{listItem.pieces}</span>{" "}
                    piece{listItem.pieces > 1 ? "s" : ""}
                  </p>{" "}
                  <p>
                    Price:{" "}
                    <span className="text-lg font-bold">{listItem.price}</span>{" "}
                    <small>RON</small>
                  </p>
                  <p>
                    Total:{" "}
                    <span className="text-lg font-bold">
                      {listItem.priceTotal}
                    </span>{" "}
                    <small>RON</small>
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </>
      )}

      {addNewItem ? (
        <AddListItemForm
          list={list}
          onAddListItem={() => setAddNewItem(false)}
        />
      ) : (
        <CustomButton
          buttonLabel="Add list item"
          className="w-full"
          variant={"outline"}
          icon={IoAddCircleOutline}
          iconPlacement="left"
          hideLabelOnMobile={false}
          onClick={() => setAddNewItem(true)}
        />
      )}
    </>
  );
};
