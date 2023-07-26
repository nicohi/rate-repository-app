import { Pressable, FlatList, View, StyleSheet } from 'react-native';
import { useNavigate } from "react-router-native";
import {Picker} from '@react-native-picker/picker';
import { useState, useEffect } from 'react';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Header = ({ order, setOrder }) => {
  //return <Text>AAA</Text>;
  return <Pick order={order} setOrder={setOrder}/>
}

const Pick = ({ order, setOrder }) => {
  if (order.length < 2) return null;
  return (
    <Picker
      selectedValue={order[0]+'-'+order[1]}
      onValueChange={(itemValue, itemIndex) =>
        setOrder(itemValue.split('-'))
      }>
      <Picker.Item label="Latest repositories" value="CREATED_AT-DESC" />
      <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE-DESC" />
      <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE-ASC" />
    </Picker>
  );
}


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={repo => repo.id}
      ListHeaderComponent={() => <Header order={order} setOrder={setOrder}/>}
      renderItem={({ item }) => <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
                                 <RepositoryItem repo={item} />
                               </Pressable>}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState(['CREATED_AT','DESC']);
  const { repositories, refetch } = useRepositories();

  useEffect(() => {
    console.log('refetching with: ', order);
    refetch({ orderby: order[0], orderDirection: order[1] });
  }, [order]);


  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder}/>;
};

export default RepositoryList;
