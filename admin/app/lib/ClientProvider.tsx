'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('ClientProvider is rendering');
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ClientProvider;
