import { useGetProfile } from '~/_frontend/services/use-get-profile';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { generateInitials } from '~/utils/initial-text';

export const Profile = () => {
  const { data } = useGetProfile();

  return (
    <div className="w-full bg-muted border-b-4 border-b-primary mb-6 pb-6">
      <Avatar>
        <AvatarImage src={data?.data.image} alt={data?.data.name} />
        <AvatarFallback>{generateInitials(data?.data.name)}</AvatarFallback>
      </Avatar>
    </div>
  );
};
