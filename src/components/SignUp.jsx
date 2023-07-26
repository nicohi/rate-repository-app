import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-native";

import Text from './Text';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  password2: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const SignUpContainer = ( { onSubmit } ) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        password2: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
    {({ handleSubmit }) => (
      <View style={styles.vccontainer}>
        <FormikTextInput style={styles.item} name="username" placeholder="Username" />
        <FormikTextInput style={styles.item} secureTextEntry name="password" placeholder="Password" />
        <FormikTextInput style={styles.item} secureTextEntry name="password2" placeholder="Password confirmation" />
        <Pressable onPress={handleSubmit}>
          <Text style={styles.button}>Sign up</Text>
        </Pressable>
      </View>
    )}
    </Formik>
  )
};

const SignUp = () => {
  const [signUp, stuff] = useSignUp();
  const [signIn] = useSignIn();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const vs = { ...values }
      console.log('vals', vs)
      const data = await signUp(vs);
      console.log(data);
      await signIn(vs);

      navigate('/');
    } catch (e) {
      console.log(e);
      console.log(stuff.error);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

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
