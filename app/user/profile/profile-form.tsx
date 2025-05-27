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
import { toast } from "sonner";
import { updateProfile } from "@/lib/actions/user.actions";
import { updateProfileSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProfileForm = () => {
  const { data: session, update } = useSession();
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    const res = await updateProfile(values);
    if (!res.success) {
      return toast.error(res.message);
    }
    // Update the session locally so the UI reflects the new name
    await update({ ...session, user: { ...session?.user, name: values.name } });
    toast.success("Profile updated successfully");
  };

  return (
    <Form {...form}>
      <form
        className="max-w-md mx-auto space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Email (read-only) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled
                  placeholder="Email"
                  className="
                    w-full
                    px-4 py-2
                    border border-gray-300 dark:border-gray-600
                    bg-gray-100 dark:bg-gray-700
                    text-gray-900 dark:text-gray-100
                    rounded-md
                    focus:outline-none focus:ring-2 focus:ring-brand
                  "
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        {/* Name (editable) */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your name"
                  className="
                    w-full
                    px-4 py-2
                    border border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-700
                    text-gray-900 dark:text-gray-100
                    rounded-md
                    focus:outline-none focus:ring-2 focus:ring-brand
                  "
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-brand text-white hover:bg-brand-dark disabled:opacity-50"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
