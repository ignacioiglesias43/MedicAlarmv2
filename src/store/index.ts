import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, ThunkAction} from '@reduxjs/toolkit';
import {Action, combineReducers} from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import persistReducer from 'redux-persist/es/persistReducer';

import authReducer from './auth/authReducer';
import reminderReducer from './reminders/reminderReducer';
import loadingIndicatorReducer from './loadingIndicator/loadingIndicatorReducer';

const persistedConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer', 'reminderReducer'],
  timeout: undefined,
};

const reducers = combineReducers({
  authReducer,
  reminderReducer,
  loadingIndicatorReducer,
});

const persistedReducer = persistReducer(persistedConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
