import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#eeeeee',
    primary: '#0366d6',
    error: '#d73a4a',
    background: '#24292e',
    backgroundLight: '#cccccc',
    foreground: 'white',
  },
  fontSizes: {
    small: 10,
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
