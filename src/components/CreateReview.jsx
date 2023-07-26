import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-native";

import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';


const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup
    .string(),
});

export const CreateReviewContainer = ( { onSubmit } ) => {
  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: null,
        text: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
    {({ handleSubmit }) => (
      <View style={styles.vccontainer}>
        <FormikTextInput style={styles.item} name="ownerName" placeholder="Repository owner" />
        <FormikTextInput style={styles.item} name="repositoryName" placeholder="Repository name" />
        <FormikTextInput style={styles.item} name="rating" placeholder="Rating between 0 and 100" />
        <FormikTextInput style={styles.item} name="text" placeholder="Review" />
        <Pressable onPress={handleSubmit}>
          <Text style={styles.button}>Create a review</Text>
        </Pressable>
      </View>
    )}
    </Formik>
  )
};

const CreateReview = () => {
  const [createReview, stuff] = useCreateReview();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const vs = { ...values, rating: Number(values.rating) }
      //console.log('vals', vs)
      const data = await createReview(vs);
      //console.log(data);

      navigate(`/repo/${data.repositoryId}`);
    } catch (e) {
      console.log(e);
      console.log(stuff.error);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;

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
