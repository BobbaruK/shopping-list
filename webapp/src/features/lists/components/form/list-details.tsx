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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingList } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { editListDetails } from "../../actions/edit-list-details";
import { listDetailsSchema } from "../../schemas";

interface Props {
  list: ShoppingList;
}

export const ListDetailsForm = ({ list }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof listDetailsSchema>>({
    resolver: zodResolver(listDetailsSchema),
    defaultValues: {
      name: list.name,
      active: list.active,
      notes: list.notes || undefined,
    },
  });

  function onSubmit(values: z.infer<typeof listDetailsSchema>) {
    startTransition(() => {
      editListDetails(list.id, values).then((data) => {
        if (data.success) {
          toast.success(data.success);

          revalidate();
          router.push(`/lists/${list.id}`);
        }

        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
                  placeholder=""
                  className="resize-y"
                  {...field}
                  disabled={isPending}
                  rows={4}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton
          buttonLabel="Edit shopping list"
          type="submit"
          disabled={isPending}
        />
      </form>
    </Form>
  );
};
