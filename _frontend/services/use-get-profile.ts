import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';
import { User } from '~/model/types/users';

export const useGetProfile = () => {
  const { data, isLoading } = useSWR<HttpRequest<User>, Error>('me', {
    revalidateOnFocus: false
  });

  return {
    data,
    isLoading
  };
};
