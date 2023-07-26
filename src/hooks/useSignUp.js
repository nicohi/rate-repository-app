import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../graphql/mutations';

const useSignIn = () => {

  const [ createUser, result ] = useMutation(CREATE_USER, {
    onError: (error) => {
      throw new Error('sign up error: ' + error);
    }
  })

  const signUp = async ({ username, password }) => {
    const { data } = await createUser({ variables: {user: { username, password } }});
    console.log('Added user: ', data);
    return data.createUser;
  };

  return [signUp, result];
};

export default useSignIn;
