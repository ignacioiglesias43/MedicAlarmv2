import {DefaultTheme} from 'react-native-paper';

interface Colors {
  primary: string;
  background: string;
  surface: string;
  accent: string;
  accentLight: string;
  error: string;
  text: string;
  onSurface: string;
  onBackground: string;
  disabled: string;
  placeholder: string;
  backdrop: string;
  notification: string;
  splashContainer: string;
  splashContainerBottom: string;
  textOnImage: string;
}

const colors: Colors = {
  ...DefaultTheme.colors,
  primary: '#275591',
  accent: '#BE3A3E',
};

export default colors;
