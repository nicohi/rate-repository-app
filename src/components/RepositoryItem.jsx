import { Text, View, StyleSheet } from 'react-native';

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
    <Text >Full name: {repo.fullname}</Text>
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
    backgroundColor: '#dddddd',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default RepositoryItem;
