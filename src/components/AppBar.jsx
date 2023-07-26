import { ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';


//import Text from './Text';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    display: 'flex',
    padding: 20,
  },
});

const AppBar = () => {
  const [signOut] = useSignOut();

  const { data, loading, refetch } = useQuery(ME);

  const logout = async () => {
    await signOut()
    await refetch()
  }

  !loading && console.log(data);

  return (<View style={styles.container}>
            <ScrollView horizontal={true}>
              <AppBarTab text='Repositories' to='/' />
              {!loading && data.me && <AppBarTab text='Create a review' to='/review' /> }
              {!loading && data.me ? <AppBarTab text='My reviews' to='/myreviews' /> : null}
              {!loading && (data.me ?
                            <AppBarTab onPress={logout} text='Sign out' to='/signout' /> :
                            <AppBarTab text='Sign in' to='/signin' />
                           )}
              {!loading && data.me ? null :
                <AppBarTab text='Sign up' to='/signup' />
              }
            </ScrollView>
          </View>);
};

export default AppBar;
