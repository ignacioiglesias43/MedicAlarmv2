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
  titleWhite: string;
  tabBackground: string;
  markedDates: string;
}

const colors: Colors = {
  ...DefaultTheme.colors,
  //primary: '#275591',
  //accent: '#BE3A3E',
  primary: '#AFC8FF',
  accent: '#FE7058',
  background: '#FFFFFF',
  text: '#3C3C3C',
  titleWhite: '#FFFFFF',
  tabBackground: '#FAFAFA',
  markedDates: '#FFB7AB',
};

export default colors;
