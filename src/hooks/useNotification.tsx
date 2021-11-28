import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

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

  return {onDisplayNotification};
};
