import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [ review, { data, loading, error }] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      throw new Error('create review error: ' + error);
    }
  })

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    //const { data } = await review({ variables: { review: { repositoryName, ownerName, rating, text } }});
    const vars = {review: { repositoryName, ownerName, rating, text }};
    //console.log('Sending review:', vars);
    const data = await review({ variables: vars });
    //console.log('Got review:', data);
    return data.data.createReview;
  };

  return [createReview, { data, loading, error} ];
};

export default useCreateReview;
