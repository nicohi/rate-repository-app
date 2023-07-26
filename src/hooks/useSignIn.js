import { useMutation } from '@apollo/client';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

import { LOGIN } from '../graphql/mutations';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    }
  })

  const signIn = async ({ username, password }) => {
    await login({ variables: { username, password } });
    await authStorage.setAccessToken(result.data.authenticate.accessToken);
    apolloClient.resetStore();
    const accessToken = await authStorage.getAccessToken();
    console.log('Added access token to authStorage: ', accessToken);
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
