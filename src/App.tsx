import Toast from 'components/toast';
import MainRoute from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from 'components/error/error-boundary';

function App() {
  return (
    <ErrorBoundary>
      <MainRoute />
      <Toast />
      <ReactQueryDevtools initialIsOpen={false} />
    </ErrorBoundary>
  );
}

export default App;
