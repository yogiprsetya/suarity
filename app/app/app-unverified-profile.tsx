'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loading } from '~/frontend/components/ui/loading';
import { useProfile } from '~/frontend/services/use-profile';

export const UnverifiedProfile = () => {
  const { data, isLoading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data?.data?.username) {
      router.push('/app/profile');
    }
  }, [data?.data, isLoading, router]);

  if (isLoading) {
    return (
      <div className="fixed z-50 right-6 bottom-6">
        <Loading />
      </div>
    );
  }

  return null;
};
