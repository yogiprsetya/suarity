import { getServerSession } from 'next-auth';
import { ChangeAvatar } from './app-form';

const AvatarSettingPage = async () => {
  const session = await getServerSession();

  return <ChangeAvatar image={session?.user.image ?? ''} name={session?.user.name ?? 'User'} />;
};

export default AvatarSettingPage;
