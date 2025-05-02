'use client';

import { Text } from '~/components/ui/text';
import { useGetProfile } from '~/services/use-get-profile';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { generateInitials } from '~/utils/initial-text';

export const Profile = () => {
  const { data } = useGetProfile();

  return (
    <div className="w-full bg-muted border-b-4 border-b-primary mb-6 p-6 flex justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="size-14">
          <AvatarImage src={data?.data.image} alt={data?.data.name} />
          <AvatarFallback>{generateInitials(data?.data.name)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <Text variant="heading-4">{data?.data.name}</Text>

          <Text variant="small">{data?.data.email}</Text>
        </div>
      </div>
    </div>
  );
};
