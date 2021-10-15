import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './src/store/index';
/* React Native Paper */
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './src/styles/theme';

import NavContainer from './src/navigation/NavContainer';
import ModalIndicator from './src/components/atoms/ModalIndicator';

const persistedStore = persistStore(store);

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <NavContainer />
            <ModalIndicator />
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
