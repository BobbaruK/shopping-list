"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomButton } from "@/components/custom-button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { addListItem } from "../../actions/add-list-item";
import { addListItemSchema } from "../../schemas";

interface Props {
  list: Prisma.ShoppingListGetPayload<{
    include: {
      listItems: true;
    };
  }>;
  onAddListItem: () => void;
}

export const AddListItemForm = ({ list, onAddListItem }: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof addListItemSchema>>({
    resolver: zodResolver(addListItemSchema),
    defaultValues: {
      itemName: "",
      pieces: "",
      price: "",
      total: "",
      active: true,
    },
  });

  function onSubmit(values: z.infer<typeof addListItemSchema>) {
    startTransition(() => {
      addListItem(values, list.id).then((data) => {
        if (data.success) {
          toast.success(data.success);
          revalidate();
          onAddListItem();
        }
        if (data.error) toast.error(data.error);
      });
    });
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="text"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pieces"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pieces</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="number"
                    disabled={isPending}
                    {...form.register(field.name, { valueAsNumber: true })}
                    onChange={(e) => {
                      const price = parseInt(`${form.getValues("price")}`);

                      if (price > 0) {
                        const pieces = parseInt(e.target.value);

                        const total = price * pieces;

                        form.setValue("total", total);
                      }
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="number"
                    disabled={isPending}
                    {...form.register(field.name, { valueAsNumber: true })}
                    onChange={(e) => {
                      const pieces = parseInt(`${form.getValues("pieces")}`);

                      if (pieces > 0) {
                        const price = parseInt(e.target.value);

                        const total = pieces * price;

                        form.setValue("total", total);
                      }
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="number"
                    {...form.register(field.name, { valueAsNumber: true })}
                    disabled
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Active</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Some notes here"
                    className="resize-y"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-start gap-4">
            <CustomButton
              buttonLabel="Add list item"
              type="submit"
              disabled={isPending}
            />
            <CustomButton
              buttonLabel="Cancel"
              variant={"outline"}
              type="reset"
              disabled={isPending}
              onClick={onAddListItem}
            />
          </div>
        </form>
      </Form>
    </Card>
  );
};
