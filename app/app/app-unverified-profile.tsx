'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loading } from '~/_frontend/components/ui/loading';
import { useGetProfile } from '~/frontend/services/use-get-profile';

export const UnverifiedProfile = () => {
  const { data, isLoading } = useGetProfile();
  const router = useRouter();

  useEffect(() => {
    if (!data?.data.username) {
      router.push('/app/profile');
    }
  }, [data?.data.username, router]);

  if (isLoading) {
    return (
      <div className="fixed z-50 right-6 bottom-6">
        <Loading />
      </div>
    );
  }

  return null;
};
