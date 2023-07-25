import { useState} from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES,
                                            {
                                              fetchPolicy: 'cache-and-network',
                                              onCompleted: () => setRepositories(data.repositories),
                                            }
                                           );


  return { repositories, error, loading, refetch };
};

export default useRepositories;
