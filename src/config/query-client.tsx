import { QueryCache, QueryClient } from '@tanstack/react-query';
import { store } from 'store';
import { addToast } from 'store/toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        store.dispatch(addToast(error.message));
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      store.dispatch(addToast(error.message));
    },
  }),
});
