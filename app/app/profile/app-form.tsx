'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { users } from '~/model/schema/users';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';
import { User } from '~/model/types/users';

const schema = createInsertSchema(users).pick({
  name: true,
  bio: true,
  username: true,
  type: true
});

export const AppForm = ({ data }: { data: User }) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      bio: data.bio,
      username: data.username,
      type: data.type
    }
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>

              <FormControl>
                <Input placeholder="solop-agency" {...field} />
              </FormControl>

              <FormDescription>This is your public URL page.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public Name</FormLabel>

              <FormControl>
                <Input placeholder="Suarity Digital 🤘" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>

              <FormControl>
                <Textarea
                  maxLength={250}
                  placeholder="I build web with zero-bug. It's crazy!"
                  {...field}
                />
              </FormControl>

              <FormDescription>Explain what you do best (0/250).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Profile style</FormLabel>

              <FormControl>
                <RadioGroup
                  orientation="horizontal"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="solo" id="solo" />

                    <Label htmlFor="solo">
                      Solo <small>(you are a lone-wolf)</small>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agency" id="agency" />

                    <Label htmlFor="agency">
                      Agency <small>(the gang of genius)</small>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mx-auto flex">
          Save & Publish
        </Button>
      </form>
    </Form>
  );
};
