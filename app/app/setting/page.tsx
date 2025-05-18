import { AppForm } from './app-form';
import { fetchUser } from './service';

const ProfileSettingPage = async () => {
  const { data } = await fetchUser();

  return <AppForm props={data} />;
};

export default ProfileSettingPage;
