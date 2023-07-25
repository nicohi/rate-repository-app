import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles,
    style
  ] ;
  error;

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
