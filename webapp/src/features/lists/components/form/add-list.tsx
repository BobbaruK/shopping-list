"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomButton } from "@/components/custom-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { addList } from "../../actions/add-list";
import { addListSchema } from "../../schemas";

export const AddListForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof addListSchema>>({
    resolver: zodResolver(addListSchema),
    defaultValues: {
      shoppingListName: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof addListSchema>) {
    startTransition(() => {
      addList(values).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          revalidate();
          router.push(`/lists/${data.listId}`);
        }

        if (data?.error) {
          toast.error(data.error);
          revalidate();
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto space-y-8"
      >
        <FormField
          control={form.control}
          name="shoppingListName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shopping list name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Auchan - chestii marunte"
                  type="text"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>

              <FormMessage />
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
                  className="resize-none"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <CustomButton
          buttonLabel="Add shopping list"
          type="submit"
          disabled={isPending}
        />
      </form>
    </Form>
  );
};
