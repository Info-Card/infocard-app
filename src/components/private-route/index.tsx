import { RootState } from '@/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const PrivateRoute: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // This code will only run on the client side
    if (!userInfo) {
      router.push('/login');
    }
  }, [userInfo, router]);

  return <>{children}</>;
};

export default PrivateRoute;
