import { ChangeAvatar } from './app-form';
import { fetchUser } from '../service';

const AvatarSettingPage = async () => {
  const { data } = await fetchUser();

  return <ChangeAvatar image={data?.image ?? ''} name={data?.name ?? 'User'} />;
};

export default AvatarSettingPage;
