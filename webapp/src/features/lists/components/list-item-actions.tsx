"use client";

import { CustomButton } from "@/components/custom-button";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MEDIA_QUERY_BREAKPOINT } from "@/constants";
import { cn } from "@/lib/utils";
import { ListItem } from "@prisma/client";
import { useState, useTransition } from "react";
import { MdDelete, MdModeEdit, MdOutlineCancel } from "react-icons/md";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { deleteListItem } from "../actions/delete-list-item";
import { EditListItemForm } from "./form/edit-list-item";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa6";
import { setListItemActive } from "../actions/set-list-item-active";

interface Props {
  listItem: ListItem;
}

export const ListItemActions = ({ listItem }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [deleteItemModalOpen, setDeleteItemModalOpen] = useState(false);
  const [editItemModalOpen, setEditItemModalOpen] = useState(false);
  const isDesktop = useMediaQuery(MEDIA_QUERY_BREAKPOINT);

  const deleteItem = () => {
    setDeleteItemModalOpen(false);

    startTransition(() => {
      deleteListItem(listItem.id).then((data) => {
        if (data.success) {
          const markup = { __html: data.success };
          toast.warning(<div dangerouslySetInnerHTML={markup} />);
          setDeleteItemModalOpen(false);
        }

        if (data.error) {
          const markup = { __html: data.error };
          toast.error(<div dangerouslySetInnerHTML={markup} />);
          setDeleteItemModalOpen(false);
        }
      });
    });
  };

  const labels = {
    title: "Are you absolutely sure?",
    description: {
      __html: `This action cannot be undone. This will permanently delete &quot;<strong>${listItem.name}</strong>&quot; your list and from our servers.`,
    },
  };

  const setListItemCheck = () => {
    startTransition(() => {
      setListItemActive(listItem.id).then((data) => {
        if (data.success) {
          toast.success(
            <div dangerouslySetInnerHTML={{ __html: data.success }} />,
          );
        }
        if (data.error) toast.error(data.error);
      });
    });
  };

  if (isDesktop)
    return (
      <>
        <Dialog
          open={deleteItemModalOpen}
          onOpenChange={setDeleteItemModalOpen}
        >
          <DialogTrigger asChild>
            <CustomButton
              buttonLabel="Delete"
              icon={MdDelete}
              iconPlacement="left"
              variant={"destructive"}
              disabled={isPending}
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{labels.title}</DialogTitle>
              <DialogDescription dangerouslySetInnerHTML={labels.description} />
            </DialogHeader>
            <DialogFooter className={cn("gap-2 sm:space-x-0")}>
              <CustomButton
                buttonLabel={"Delete"}
                variant={"destructive"}
                onClick={deleteItem}
                icon={MdDelete}
                iconPlacement="left"
                hideLabelOnMobile={false}
              />
              <DialogClose asChild>
                <CustomButton
                  buttonLabel={"Cancel"}
                  variant={"outline"}
                  icon={MdOutlineCancel}
                  iconPlacement="left"
                  hideLabelOnMobile={false}
                />
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={editItemModalOpen} onOpenChange={setEditItemModalOpen}>
          <DialogTrigger asChild>
            <CustomButton
              buttonLabel="Edit"
              icon={MdModeEdit}
              iconPlacement="left"
              variant={"warning"}
              disabled={isPending}
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Edit list item &quot;<strong>{listItem.name}</strong>&quot;
              </DialogTitle>
            </DialogHeader>
            <EditListItemForm
              listItem={listItem}
              onEditListItem={() => setEditItemModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <CustomButton
          buttonLabel="Check"
          icon={listItem.active ? FaRegSquare : FaRegCheckSquare}
          iconPlacement="left"
          variant={"info"}
          onClick={setListItemCheck}
          disabled={isPending}
        />
      </>
    );

  // TODO: drawer focus issue - check console when opening drawer
  return (
    <>
      <Drawer open={deleteItemModalOpen} onOpenChange={setDeleteItemModalOpen}>
        <DrawerTrigger asChild>
          <CustomButton
            buttonLabel="Delete"
            icon={MdDelete}
            iconPlacement="left"
            variant={"destructive"}
            disabled={isPending}
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{labels.title}</DrawerTitle>
            <DrawerDescription dangerouslySetInnerHTML={labels.description} />
          </DrawerHeader>
          <DrawerFooter>
            <CustomButton
              buttonLabel={"Delete"}
              variant={"destructive"}
              onClick={deleteItem}
              icon={MdDelete}
              iconPlacement="left"
              hideLabelOnMobile={false}
            />
            <DrawerClose asChild>
              <CustomButton
                buttonLabel={"Cancel"}
                variant={"outline"}
                icon={MdOutlineCancel}
                iconPlacement="left"
                hideLabelOnMobile={false}
              />
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer open={editItemModalOpen} onOpenChange={setEditItemModalOpen}>
        <DrawerTrigger asChild>
          <CustomButton
            buttonLabel="Edit"
            icon={MdModeEdit}
            iconPlacement="left"
            variant={"warning"}
            disabled={isPending}
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>
              Edit list item &quot;<strong>{listItem.name}</strong>&quot;
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pt-0">
            <EditListItemForm
              listItem={listItem}
              onEditListItem={() => setEditItemModalOpen(false)}
            />
          </div>
        </DrawerContent>
      </Drawer>
      <CustomButton
        buttonLabel="Check"
        icon={listItem.active ? FaRegSquare : FaRegCheckSquare}
        iconPlacement="left"
        variant={"info"}
        onClick={setListItemCheck}
        disabled={isPending}
      />
    </>
  );
};
