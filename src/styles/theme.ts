import {DefaultTheme} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/types';
import colors from './colors';

const theme: Theme = {
  ...DefaultTheme,
  colors,
  roundness: 10,
};

export default theme;
