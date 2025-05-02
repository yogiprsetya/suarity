import useSWRImmutable from 'swr/immutable';
import { HttpRequest } from '~/model/types/http';
import { User } from '~/model/types/users';

export const useGetProfile = () => {
  const { data, isLoading } = useSWRImmutable<HttpRequest<User>, Error>('me');

  return {
    data,
    isLoading
  };
};
