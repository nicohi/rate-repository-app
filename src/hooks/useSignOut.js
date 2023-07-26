import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    console.log('logged out')
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return [ signOut ];
};

export default useSignOut;
