import { Pressable, FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import theme from '../theme';

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem repo={repository} />;
};

export const ReviewItem = ({ review }) => {
  return (
  <View testID="repositoryItem" style={styles.item}>
      <View style={styles.hcontainer} >
        <Text style={styles.tinyLogo} >{review.rating}</Text>
        <View style={styles.vcontainer} >
          <Text fontWeight='bold' >{review.user.username}</Text>
          <Text fontSize='small' color='secondary'>{review.createdAt.split('T')[0]}</Text>
          <Text fontSize='small' style={{flex: 1, flexWrap: 'wrap'}}>{review.text}</Text>
        </View>
      </View>
  </View>
  );
};

const SingleRepository = () => {
  let { repoId } = useParams();
  //console.log('FETCHING: ',repoId);
  const { repository, loading } = useRepository(repoId);

  if (loading || !repository) return null;

  const reviews = repository && repository.reviews && repository.reviews.edges
        ? repository.reviews.edges.map((edge) => edge.node)
        : [];


  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      // ...
    />
  );
};

export default SingleRepository;

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 1,
    marginHorizontal: 10,
    backgroundColor: theme.colors.foreground,
  },
  hcontainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 2,
  },
  hscontainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 2,
    justifyContent: 'space-around',
  },
  vcontainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 2,
    flexShrink: 1,
  },
  vccontainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 2,
    alignItems: 'center',
  },
  tinyLogo: {
    width: 60,
    height: 60,
    borderWidth: 3,
    padding: 20,
    alignItems: 'center',
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderRadius: 30,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-start',
  },
});
