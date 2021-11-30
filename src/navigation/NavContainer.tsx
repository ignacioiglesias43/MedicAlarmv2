import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/index';

import notifee, {EventType} from '@notifee/react-native';

import AuthStack from './stacks/AuthStack';
import MainNavigator from './tabs/MainNavigator';
import {useNotification} from '../hooks/useNotification';
import {useEvent, useChannel} from '@harelpls/use-pusher/react-native';
import {postponeReminderService} from '../api/reminder/services';
import {
  deleteReminder,
  updateSingleReminder,
} from '../store/reminders/actionCreators';
import {
  updateSnackBarMessage,
  updateSnackBarVisible,
} from '../store/snackbar/actionCreators';
import moment from 'moment';

const Stack = createNativeStackNavigator();

interface Notification {
  message: string;
}

const NavContainer = () => {
  const {token, userInfo} = useSelector(
    (state: RootState) => state.authReducer,
  );
  const isSignedIn = token.length > 0;
  const dispatch = useDispatch();
  const {onDisplayNotification, onCreateTriggerNotification} =
    useNotification();

  /** Notifications */
  useEffect(() => {
    return notifee.onForegroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;
      console.log(notification);
      if (pressAction) {
        if (pressAction?.id !== 'default') {
          try {
            const res = await postponeReminderService(pressAction?.id, token);
            const {data, message} = res.data;
            if (moment(data.end_date).diff(moment(new Date())) <= 0) {
              //Si fue la última
              dispatch(deleteReminder(data.id!));
            } else {
              //Si no es la última
              onCreateTriggerNotification(data);
              dispatch(updateSingleReminder(data));
              dispatch(updateSnackBarMessage(message));
              dispatch(updateSnackBarVisible(true));
            }
          } catch (error: any) {
            console.log({...error});
          } finally {
            await notifee.cancelNotification(notification?.id!);
          }
        }
      }
    });
  }, []);

  /** Pusher */

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
