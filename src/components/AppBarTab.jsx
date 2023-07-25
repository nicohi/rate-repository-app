import { View, StyleSheet } from 'react-native';
import { Link } from "react-router-native";

// import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  item: {
    flexGrow: 0,
    marginLeft: 5,
    marginRight: 5,
  },
});

const AppBarTab = ( { text, to } ) => {
  return (<Link to={to}>
              <View style={styles.item}>
                <Text color='textSecondary' fontSize='heading' fontWeight='bold'>{text}</Text>
              </View>
           </Link>
         );
};

export default AppBarTab;
