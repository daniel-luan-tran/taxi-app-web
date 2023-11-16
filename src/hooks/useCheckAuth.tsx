import { useQuery } from 'react-query';
// import { useLocation } from 'react-router-dom';
import { checkUser } from '../api/account';
// import { checkUser } from '../api/axios';

const useCheckAuth = () => {
  const { isLoading: isCheckingAuth, data } = useQuery(
    ['checkUser'],
    async () => checkUser(),
    {
      cacheTime: 1000 * 60,
      staleTime: 1000 * 60,
      retry: 0,
      refetchOnMount: 'always',
    },
  );

  return {
    isCheckingAuth,
    isAuthed: data ?? false,
    user: data ?? null,
  };
};

export default useCheckAuth;
