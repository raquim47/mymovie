import Layout from 'components/layout/main';
import Toast from 'components/toast';
import MainRoute from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <Layout>
        <MainRoute />
      </Layout>
      <Toast />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
