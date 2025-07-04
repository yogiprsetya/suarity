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
import { useProfile } from '~/frontend/services/use-profile';

const schema = createInsertSchema(users)
  .pick({
    name: true,
    type: true
  })
  .extend({
    username: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9-_]+$/),
    bio: z.string().min(1).max(250)
  });

export const AppForm = ({ props }: { props: User }) => {
  const { isLoading, isCreating, updateProfile } = useProfile();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: props.name,
      bio: props.bio,
      username: props.username,
      type: props.type
    }
  });

  const {
    formState: { isDirty }
  } = form;

  const onSubmit = (values: z.infer<typeof schema>) => updateProfile(values);

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

        <Button
          type="submit"
          className="mx-auto flex"
          disabled={isLoading || isCreating || !isDirty}
        >
          {isLoading || isCreating ? 'Please Wait ...' : 'Save & Publish'}
        </Button>
      </form>
    </Form>
  );
};
