import store from '@/store';
import '../assets/styles/bootstrap.custom.css';
import '../assets/styles/globals.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/loader';
import AuthGuard from '@/components/auth-guard';
import { AuthProvider } from '@/contexts/AuthContext';

const Guard = ({ children, authGuard }: any) => {
  if (authGuard) {
    return <AuthGuard fallback={<Loader />}>{children}</AuthGuard>;
  } else {
    return <>{children}</>;
  }
};

function MyApp({ Component, pageProps }: any) {
  const authGuard = Component.authGuard ?? true;

  return (
    <Provider store={store}>
      <ToastContainer position="bottom-left" />
      <AuthProvider>
        <Guard authGuard={authGuard}>
          <Component {...pageProps} />
        </Guard>
      </AuthProvider>
    </Provider>
  );
}
export default MyApp;
