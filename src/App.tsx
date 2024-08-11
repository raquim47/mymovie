import Layout from 'components/layout';
import Toast from 'components/toast';
import MainRoute from './router';

function App() {
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
