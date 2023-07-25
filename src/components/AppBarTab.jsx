import { Pressable, View, StyleSheet } from 'react-native';

// import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  item: {
    flexGrow: 0,
  },
});

const AppBarTab = ( { text, onPress } ) => {
  return (<Pressable onPress={onPress}>
              <View style={styles.item}>
                <Text color='textSecondary' fontSize='heading' fontWeight='bold'>{text}</Text>
              </View>
           </Pressable>
         );
};

export default AppBarTab;
