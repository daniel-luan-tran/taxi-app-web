import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { checkUser } from '../api/axios';

const useCheckAuth = () => {
  const location = useLocation();
  const { pathname } = location;
  const isAdminRoute = pathname.startsWith(import.meta.env.VITE_ADMIN_PREFIX);
  const staleTimeOnAdminRoute = 1000 * 30;
  const staleTimeOnPublicRoute = 1000 * 60 * 60 * 24;

  const { isLoading: isCheckingAuth, data } = useQuery(
    ['checkUser'],
    async () => checkUser(),
    {
      cacheTime: 1,
      refetchOnMount: 'always',
      refetchOnWindowFocus: isAdminRoute || false,
      staleTime: isAdminRoute ? staleTimeOnAdminRoute : staleTimeOnPublicRoute,
    },
  );

  return {
    isCheckingAuth,
    isAuthed: data ?? false,
    user: data ?? null,
  };
};

export default useCheckAuth;
