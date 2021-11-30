import notifee, {
  AndroidImportance,
  AndroidVisibility,
  TriggerType,
  TimestampTrigger,
} from '@notifee/react-native';
import moment from 'moment';
import {Reminder} from '../api/reminder/model/Reminder';

export const useNotification = () => {
  async function onDisplayNotification(id: string, message: string) {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      vibration: true,
      badge: true,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });

    await notifee.displayNotification({
      title: 'MedicAlarm',
      body: message,
      id: id,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
      },
    });
  }

  async function onCreateTriggerNotification(data: Reminder) {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: moment(data.next_alarm).valueOf(),
      alarmManager: true,
    };

    await notifee.createTriggerNotification(
      {
        id: `reminder-${data.id}`,
        title: '¡Hora de tomar su medicamento!',
        body: `Es momento de tomar ${data.description}`,
        android: {
          channelId: 'default',
          sound: 'hollow',
          actions: [
            {
              title: 'Aceptar',
              pressAction: {
                id: `${data.id}`,
              },
            },
          ],
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
        },
      },
      trigger,
    );
  }

  return {onDisplayNotification, onCreateTriggerNotification};
};
