import { QueryClientProvider as QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { queryClient } from '~/config/query-client';

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return <QueryClient client={queryClient}>{children}</QueryClient>;
};
