import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useAuth() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  return userInfo;
}
