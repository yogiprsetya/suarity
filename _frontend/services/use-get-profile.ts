import useSWRImmutable from 'swr/immutable';
import { useDebounce } from 'use-debounce';
import { HttpRequest } from '~/model/types/http';
import { User } from '~/model/types/users';

export const useGetProfile = () => {
  const { data, isLoading } = useSWRImmutable<HttpRequest<User>, Error>('me');

  const [debounceLoading] = useDebounce(isLoading, 1000);

  return {
    data,
    isLoading: debounceLoading
  };
};
