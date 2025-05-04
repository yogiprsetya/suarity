import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';
import { ProjectsType } from '~/model/types/projects';
import { useDebounce } from 'use-debounce';

export const useGetProjects = () => {
  const { data, isLoading } = useSWR<HttpRequest<ProjectsType[]>, Error>('projects', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const [debounceLoading] = useDebounce(isLoading, 1000);

  return {
    data,
    isLoading: debounceLoading
  };
};
