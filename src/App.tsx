import Layout from 'components/layout';
import Toast from 'components/toast';
import { useInitUser } from 'hooks/user';
import MainRoute from './router';

function App() {
  useInitUser();

  return (
    <>
      <Layout>
        <MainRoute />
      </Layout>
      <Toast />
    </>
  );
}

export default App;
