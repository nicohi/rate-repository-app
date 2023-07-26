import { useState} from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepositories = (id) => {
  const [repository, setRepository] = useState({});

  const { error, loading, refetch } = useQuery(GET_REPOSITORY,
                                            {
                                              variables: { repositoryId: id },
                                              onCompleted: (data) => setRepository(data.repository),
                                              onError: (e) => console.log(e),
                                            }
                                           );


  return { repository, error, loading, refetch };
};

export default useRepositories;
