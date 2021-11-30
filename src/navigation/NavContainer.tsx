import React, {useCallback, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useSelector} from 'react-redux';
import {RootState} from '../store/index';

import notifee, {EventType} from '@notifee/react-native';

import AuthStack from './stacks/AuthStack';
import MainNavigator from './tabs/MainNavigator';
import {useNotification} from '../hooks/useNotification';
import {useEvent, useChannel} from '@harelpls/use-pusher/react-native';
import {postponeReminderService} from '../api/reminder/services';

const Stack = createNativeStackNavigator();

interface Notification {
  message: string;
}

const NavContainer = () => {
  const {token, userInfo} = useSelector(
    (state: RootState) => state.authReducer,
  );
  const isSignedIn = token.length > 0;

  /** Notifications */
  const updateReminder = useCallback(
    async (id: string) => {
      try {
        const res = await postponeReminderService(id, token);
      } catch (error: any) {
        console.log({...error});
      }
    },
    [notifee],
  );

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      const {notification, pressAction} = detail;
      if (pressAction?.id !== 'default') {
        updateReminder(pressAction!.id);
      }
      console.log(notification);
    });
  }, []);

  /** Pusher */

  const {onDisplayNotification} = useNotification();
  const patientChannel = useChannel(`private-Patient.${userInfo?.id}`);
  const prescriptionChannel = useChannel(
    `private-Prescription.${userInfo?.id}`,
  );
  const appointmentChannel = useChannel(`private-Appointment.${userInfo?.id}`);

  useEvent<Notification>(patientChannel, 'patient', data => {
    const {message} = data as Notification;
    onDisplayNotification('patient', message);
  });

  useEvent<Notification>(prescriptionChannel, 'prescription', data => {
    const {message} = data as Notification;
    onDisplayNotification('precription', message);
  });

  useEvent<Notification>(appointmentChannel, 'appointment', data => {
    const {message} = data as Notification;
    onDisplayNotification('appointment', message);
  });

  /** Splash Screen */

  const onNavigationReady = () => RNBootSplash.hide({fade: true});

  return (
    <NavigationContainer onReady={onNavigationReady}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isSignedIn ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavContainer;
