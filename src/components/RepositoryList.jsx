import { Pressable, FlatList, View, StyleSheet } from 'react-native';
import { useNavigate } from "react-router-native";
import {Picker} from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

import Text from './Text';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Header = ({ order, setOrder }) => {
  return (
    <View style={{margin:10, backgroundColor: 'white'}}>
      <TextInput
        style={{margin:10}}
        placeholder='search'
        onChangeText={value => setOrder(order.map((v,i)=> i === 2 ? value : v))}>
      </TextInput>
      <Pick order={order} setOrder={setOrder}/>
    </View>
  );
}

const Pick = ({ order, setOrder }) => {
  if (order.length < 2) return null;
  return (
    <Picker
      selectedValue={order[0]+'-'+order[1]}
      onValueChange={(itemValue, itemIndex) =>
        setOrder(itemValue.split('-').concat([order[2]]))
      }>
      <Picker.Item label="Latest repositories" value="CREATED_AT-DESC" />
      <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE-DESC" />
      <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE-ASC" />
    </Picker>
  );
}

const Item = ({item}) => {
  const navigate = useNavigate();
  return (
    <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
      <RepositoryItem repo={item} />
    </Pressable>
  );
};


const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
//export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
  renderHeader = () => {
    const props = this.props;

    return (
      <Header {...props} />
    );
  };

  render() {
    const { repositories } = this.props;


    const repositoryNodes = repositories
          ? repositories.edges.map((edge) => edge.node)
          : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={repo => repo.id}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => <Item item={item}/>}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderb, setOrder] = useState(['CREATED_AT','DESC','']);
  const { repositories, refetch } = useRepositories();
  const [order] = useDebounce(orderb, 500);

  useEffect(() => {
    console.log('refetching with: ', order);
    refetch({ orderby: order[0], orderDirection: order[1], searchKeyword: order[2] });
  }, [order]);


  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder}/>;
};

export default RepositoryList;
