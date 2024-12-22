"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
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
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addListSchema } from "../../schemas";
import { addList } from "../../actions/add-list";
import { revalidate } from "@/actions/reavalidate";
import { useRouter } from "next/navigation";

export const AddListForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
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
          setSuccess(data.success);
          revalidate();
          router.push(`/lists/${data.listId}`);
        }

        if (data?.error) {
          setError(data.error);
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

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button type="submit" disabled={isPending}>
          Add shopping list
        </Button>
      </form>
    </Form>
  );
};
