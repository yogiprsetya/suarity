import { apiHost } from '~/utils/api-host';
import { AppForm } from './app-form';
import { headers } from 'next/headers';

const fetchUser = async () => {
  const res = await fetch(apiHost('me'), { headers: headers() });
  return res.json();
};

const ProfileSettingPage = async () => {
  const { data } = await fetchUser();

  return <AppForm data={data} />;
};

export default ProfileSettingPage;
