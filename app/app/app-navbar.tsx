'use client';

import { Text } from '~/components/ui/text';
import { useProfile } from '~/frontend/services/use-profile';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { generateInitials } from '~/utils/initial-text';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';

export const AppNavbar = () => {
  const { data } = useProfile();

  return (
    <header className="flex h-16 items-center justify-between shadow px-6 mt-2 rounded bg-background">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={data?.data.image} alt={data?.data.name} />
          <AvatarFallback>{generateInitials(data?.data.name)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <Text variant="small">{data?.data.name}</Text>
          <Text variant="muted">{data?.data.email}</Text>
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
    </header>
  );
};
