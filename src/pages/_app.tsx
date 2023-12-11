import store from '@/store';
import '@/styles/bootstrap.custom.css';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/loader';
import AuthGuard from '@/components/auth-guard';
import { AuthProvider } from '@/contexts/AuthContext';
import Head from 'next/head';

const Guard = ({ children, authGuard }: any) => {
  if (authGuard) {
    return <AuthGuard fallback={<Loader />}>{children}</AuthGuard>;
  } else {
    return <>{children}</>;
  }
};

function MyApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  const authGuard = Component.authGuard ?? true;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <ToastContainer position="bottom-left" />
        <AuthProvider>
          <Guard authGuard={authGuard}>
            {getLayout(<Component {...pageProps} />)}
          </Guard>
        </AuthProvider>
      </Provider>
    </>
  );
}
export default MyApp;
