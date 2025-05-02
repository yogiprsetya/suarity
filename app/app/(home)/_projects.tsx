'use client';

import { useGetProjects } from '~/services/use-get-projects';
import { Text } from '~/components/ui/text';
import { If } from '~/components/ui/if';

export const Projects = () => {
  const { data } = useGetProjects();

  return (
    <div>
      <If condition={!data?.data?.length}>
        <div className="text-center py-10">
          <Text>No Projects Yet</Text>
          <Text variant="muted">Build your reputation now!</Text>
        </div>
      </If>
    </div>
  );
};
