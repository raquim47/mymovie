import Layout from 'components/layout';
import Toast from 'components/toast';
import { useInitUser } from 'hooks/user';
import { useDispatch } from 'react-redux';
import { addToast } from 'store/toast';
import MainRoute from './router';

function App() {
  useInitUser();
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(addToast('테스트용 토스트', 500000))}>Trigger Toast</button>
      <Layout>
        <MainRoute />
      </Layout>
      <Toast />
    </>
  );
}

export default App;
