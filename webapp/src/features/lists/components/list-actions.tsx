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
import { ShoppingList } from "@prisma/client";
import { useState } from "react";
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { deleteList as delList } from "../actions/delete-list";

interface Props {
  shoppingList: ShoppingList;
}

export const ListActions = ({ shoppingList }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isDesktop = useMediaQuery(MEDIA_QUERY_BREAKPOINT);

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
    });
  };

  const labels = {
    title: "Are you absolutely sure?",
    description: {
      __html: `This action cannot be undone. This will permanently delete &quot;<strong>${shoppingList.name}</strong>&quot; and all it's items from our servers.`,
    },
  };

  // useEffect(() => {
  //   const mainContent = document.getElementById("site-wrapper");
  //   if (mainContent) mainContent.inert = modalOpen;

  //   return () => {
  //     if (mainContent) mainContent.inert = false;
  //   };
  // }, [modalOpen]);

  if (isDesktop)
    return (
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <CustomButton
            buttonLabel="Delete"
            icon={MdDelete}
            iconPlacement="left"
            variant={"destructive"}
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
              onClick={deleteList}
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
    );

  // TODO: drawer focus issue - check console when opening drawer
  return (
    <Drawer open={modalOpen} onOpenChange={setModalOpen}>
      <DrawerTrigger asChild>
        <CustomButton
          buttonLabel="Delete"
          icon={MdDelete}
          iconPlacement="left"
          variant={"destructive"}
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
            onClick={deleteList}
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
  );
};
