"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
