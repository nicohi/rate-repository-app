import { View, StyleSheet } from 'react-native';

import Text from './Text';

import theme from '../theme';

type ItemProps = {
    id: string,
    fullName: string,
    description: string,
    language: string,
    forksCount: number,
    stargazersCount: number,
    ratingAverage: number,
    reviewCount: number,
    ownerAvatarUrl: string,
};

const RepositoryItem = ({ repo } : ItemProps) => (
  <View style={styles.item}>
    <Text fontWeight='bold' >Full name: {repo.fullName}</Text>
    <Text >Description: {repo.description}</Text>
    <Text >Language: {repo.language}</Text>
    <Text >Forks: {repo.forksCount}</Text>
    <Text >Stars: {repo.stargazersCount}</Text>
    <Text >Reviews: {repo.reviewCount}</Text>
    <Text >Rating: {repo.ratingAverage}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: theme.colors.background,
  },
});

export default RepositoryItem;
