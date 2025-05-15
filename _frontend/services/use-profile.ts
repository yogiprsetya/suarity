import { useCallback, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { useDebounce } from 'use-debounce';
import { httpClient } from '~/config/http-client';
import { HttpRequest } from '~/model/types/http';
import { User } from '~/model/types/users';
import { errorHandler } from '~/utils/error-handler';
import { useToast } from '../hooks/useToast';

type FileRes = {
  id: string;
  path: string;
  fullPath: string;
};

export const useProfile = () => {
  const [isCreating, setIsCreating] = useState(false);

  const { data, isLoading, mutate } = useSWRImmutable<HttpRequest<User>, Error>('me');

  const [debounceLoading] = useDebounce(isLoading, 1000);

  const { toast } = useToast();

  const updateProfile = useCallback(
    (form: Partial<User>) => {
      setIsCreating(true);

      httpClient
        .put('me', {
          name: form.name,
          username: form.username,
          type: form.type,
          bio: form.bio
        })
        .then(() => {
          mutate();

          toast({
            title: 'Profile updated',
            description: 'Your profile has been updated successfully.',
            variant: 'default'
          });
        })
        .catch(errorHandler)
        .finally(() => setIsCreating(false));
    },
    [mutate, toast]
  );

  const changeAvatar = useCallback(
    (file: File) => {
      setIsCreating(true);

      const formData = new FormData();
      formData.append('file', file);

      httpClient
        .post<HttpRequest<FileRes>>('change-avatar', formData)
        .then(() => {
          mutate();

          toast({
            title: 'Avatar updated',
            description: 'Your avatar has been updated successfully.',
            variant: 'default'
          });
        })
        .catch(errorHandler)
        .finally(() => setIsCreating(false));
    },
    [mutate, toast]
  );

  return {
    data,
    isLoading: debounceLoading,
    isCreating,
    updateProfile,
    changeAvatar
  };
};
