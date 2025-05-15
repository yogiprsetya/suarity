'use client';

import { Text } from '~/components/ui/text';
import { useProfile } from '~/frontend/services/use-profile';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { generateInitials } from '~/utils/initial-text';
import { Plus } from 'lucide-react';
import { Button } from '~/components/ui/button';

export const Profile = () => {
  const { data } = useProfile();

  return (
    <div className="w-full bg-muted border-b-2 border-b-primary mb-6 p-6 flex justify-between items-start">
      <div className="flex gap-4">
        <Avatar className="size-20">
          <AvatarImage src={data?.data.image} alt={data?.data.name} />
          <AvatarFallback>{generateInitials(data?.data.name)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <Text variant="heading-4">{data?.data.name}</Text>
          <Text variant="small">{data?.data.email}</Text>
        </div>
      </div>

      <div className="flex items-center">
        <Button asChild variant="link">
          <a href="/app/setting">Setting</a>
        </Button>

        <Button size="sm">
          <Plus />
          Project
        </Button>
      </div>
    </div>
  );
};
