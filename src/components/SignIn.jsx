import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';


const onSubmit = (values) => {
  console.log('username:', values.username);
  console.log('password:', values.password);
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
    {({ handleSubmit }) => (
      <View style={styles.vccontainer}>
        <FormikTextInput style={styles.item} name="username" placeholder="Username" />
        <FormikTextInput style={styles.item} name="password" placeholder="Password" secureTextEntry={true} />
        <Pressable onPress={handleSubmit}>
          <Text style={styles.button}>Sign in</Text>
        </Pressable>
      </View>
    )}
    </Formik>
  )
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 10,
    backgroundColor: theme.colors.foreground,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 5,
    alignSelf: 'stretch',
  },
  button: {
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 10,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textSecondary,
    borderRadius: 5,
    alignSelf: 'stretch',
  },
  vccontainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 2,
    alignItems: 'stretch',
    backgroundColor: theme.colors.foreground,
  },
});

export default SignIn;
