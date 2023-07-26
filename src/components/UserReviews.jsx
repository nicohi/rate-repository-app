import { Pressable, FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import { ME } from '../graphql/queries';
import { ReviewItem } from './SingleRepository';


const UserReviews = () => {
  const { data, loading } = useQuery(ME, {variables: { includeReviews: true }});

  if (loading) return null;
  console.log(data);

  const reviews = data && data.me && data.me.reviews.edges
        ? data.me.reviews.edges.map((edge) => edge.node)
        : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default UserReviews;
