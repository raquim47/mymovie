import Toast from 'components/toast';
import MainRoute from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <MainRoute />
      <Toast />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
