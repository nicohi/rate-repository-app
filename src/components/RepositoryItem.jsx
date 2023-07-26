import { Image, View, StyleSheet } from 'react-native';

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

const knum = n => {
  if (n >= 1000)
    return (n-n%100)/1000 + 'k';
  return n;
}

const RepositoryItem = ({ repo } : ItemProps) => (
  <View testID="repositoryItem" style={styles.item}>
    <View style={styles.vcontainer} >
      <View style={styles.hcontainer} >
        <Image style={styles.tinyLogo} source={{uri: repo.ownerAvatarUrl,}} />
        <View style={styles.vcontainer} >
            <Text fontWeight='bold' >{repo.fullName}</Text>
            <Text fontSize='small' color='secondary'> {repo.description}</Text>
            <Text style={styles.language}>{repo.language}</Text>
        </View>
      </View>
        <View style={styles.hscontainer} >
            <View style={styles.vccontainer} >
              <Text fontWeight='bold'> {knum(repo.stargazersCount)}</Text>
              <Text>Stars</Text>
            </View>
            <View style={styles.vccontainer} >
              <Text fontWeight='bold'> {knum(repo.forksCount)}</Text>
              <Text>Forks</Text>
            </View>
            <View style={styles.vccontainer} >
              <Text fontWeight='bold'> {knum(repo.reviewCount)}</Text>
              <Text>Reviews</Text>
            </View>
            <View style={styles.vccontainer} >
              <Text fontWeight='bold'> {knum(repo.ratingAverage)}</Text>
              <Text>Rating</Text>
            </View>
        </View>
    </View>
  </View>
);

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
    borderRadius: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-start',
  },
});

export default RepositoryItem;
