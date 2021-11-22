/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.PRESS) {
    await notifee.cancelNotification(notification.id);
  }
  if (type === EventType.DISMISSED) {
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
