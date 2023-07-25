import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

//import Text from './Text';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    display: 'flex',
    padding: 20,
  },
});

const AppBar = () => {
  return (<View style={styles.container}>
            <AppBarTab text='Repositories' onPress={() => alert('pressed')} />
          </View>);
};

export default AppBar;
