"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingList } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { deleteList as delList } from "../actions/delete";
import { revalidate } from "@/actions/reavalidate";

interface Props {
  shoppingList: ShoppingList;
}

export const ListItemActions = ({ shoppingList }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const deleteList = () => {
    setModalOpen(false);

    delList(shoppingList.id).then((data) => {
      if (data.success) {
        const markup = { __html: data.success };
        toast.warning(<div dangerouslySetInnerHTML={markup} />);
        setModalOpen(false);
      }

      if (data.error) {
        const markup = { __html: data.error };
        toast.error(<div dangerouslySetInnerHTML={markup} />);
        setModalOpen(false);
      }

      revalidate();
    });
  };
  return (
    <>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button variant={"destructive"}>Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete &quot;
              <strong>{shoppingList.name}</strong>&quot; from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={"destructive"} onClick={deleteList}>
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button variant={"default"}>Edit</Button>
    </>
  );
};
