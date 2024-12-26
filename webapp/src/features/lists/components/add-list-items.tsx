"use client";

import { CustomButton } from "@/components/custom-button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MEDIA_QUERY_BREAKPOINT } from "@/constants";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useMediaQuery } from "usehooks-ts";
import { AddListItemForm } from "./form/add-list-item";
import { ListItemActions } from "./list-item-actions";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props {
  list: Prisma.ShoppingListGetPayload<{
    include: {
      listItems: true;
    };
  }>;
}

export const AddListItems = ({ list }: Props) => {
  const [addNewItem, setAddNewItem] = useState(false);
  const isDesktop = useMediaQuery(MEDIA_QUERY_BREAKPOINT);

  return (
    <>
      {list.listItems.length > 0 && (
        <>
          <h2>Items</h2>
          {list.listItems.map((listItem) => (
            <Card key={listItem.id}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <CardTitle>{listItem.name}</CardTitle>

                  <div className="flex flex-wrap items-center gap-2">
                    <ListItemActions listItem={listItem} />
                  </div>
                </div>
                {listItem.notes && (
                  <pre className="text-wrap text-sm text-muted-foreground">
                    {listItem.notes}
                  </pre>
                )}
              </CardHeader>
              <CardFooter className="flex flex-col flex-wrap items-start justify-start gap-6">
                <div className="flex-wrap justify-between gap-6">
                  <p>
                    <span className="text-lg font-bold">{listItem.pieces}</span>{" "}
                    piece{listItem.pieces > 1 ? "s" : ""}
                  </p>{" "}
                  <p>Price: {formatCurrency(listItem.price)}</p>
                  <p>Total: {formatCurrency(listItem.priceTotal)}</p>
                </div>
              </CardFooter>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong>Total:</strong>
                <Badge
                  variant={"info"}
                  className="text-lg sm:text-xl lg:text-2xl"
                >
                  {formatCurrency(
                    list.listItems.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.priceTotal,
                      0,
                    ),
                  )}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </>
      )}

      {addNewItem ? (
        <>
          {isDesktop ? (
            <Dialog open={addNewItem} onOpenChange={setAddNewItem}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add new item</DialogTitle>
                </DialogHeader>
                <AddListItemForm
                  list={list}
                  onAddListItem={() => setAddNewItem(false)}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={addNewItem} onOpenChange={setAddNewItem}>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Add new item</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 pt-0">
                  <AddListItemForm
                    list={list}
                    onAddListItem={() => setAddNewItem(false)}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </>
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
