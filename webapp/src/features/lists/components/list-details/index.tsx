"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingList } from "@prisma/client";
import { ListDetailsTab } from "./details-tab";
import { ListDetailsForm } from "../form/list-details";
import { useState } from "react";

type Tabs = "details" | "editDetails";

export type DrilledProps = {
  list: ShoppingList;
};

type Props = {} & DrilledProps;

export const ListDetails = ({ list }: Props) => {
  const [tab, setTab] = useState<Tabs>("details");

  return (
    <>
      <Tabs
        value={tab}
        onValueChange={(e) => {
          setTab(e as Tabs);
        }}
      >
        <TabsList className="h-auto w-full flex-wrap sm:flex-nowrap">
          <TabsTrigger value="details" className="w-full">
            Details
          </TabsTrigger>
          <TabsTrigger value="editDetails" className="w-full">
            Edit
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <ListDetailsTab list={list} />
        </TabsContent>
        <TabsContent value="editDetails">
          <ListDetailsForm list={list} onSuccess={() => setTab("details")} />
        </TabsContent>
      </Tabs>
    </>
  );
};
