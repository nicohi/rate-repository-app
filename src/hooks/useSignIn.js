import { useMutation } from '@apollo/client';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

import { LOGIN } from '../graphql/mutations';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      throw new Error('login error: ' + error);
    }
  })

  const signIn = async ({ username, password }) => {
    const { data } = await login({ variables: { username, password } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    const accessToken = await authStorage.getAccessToken();
    console.log('Added access token to authStorage: ', accessToken);
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
