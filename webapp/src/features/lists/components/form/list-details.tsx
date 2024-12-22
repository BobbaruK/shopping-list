"use client";

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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { listDetailsSchema } from "../../schemas";
import { DrilledProps } from "../list-details";
import { editListDetails } from "../../actions/edit-list-details";
import { toast } from "sonner";
import { revalidate } from "@/actions/reavalidate";

type Props = {
  onSuccess: () => void;
} & DrilledProps;

export const ListDetailsForm = ({ list, onSuccess }: Props) => {
  const form = useForm<z.infer<typeof listDetailsSchema>>({
    resolver: zodResolver(listDetailsSchema),
    defaultValues: {
      name: list.name,
      active: list.active,
      notes: list.notes || undefined,
    },
  });

  function onSubmit(values: z.infer<typeof listDetailsSchema>) {
    editListDetails(list.id, values).then((data) => {
      if (data.success) {
        toast.success(data.success);

        revalidate();
        onSuccess();
      }

      if (data.error) {
        toast.error(data.error);
      }
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
                <Input placeholder="" type="text" {...field} />
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
                  rows={4}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
