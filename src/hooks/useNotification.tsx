import notifee from '@notifee/react-native';

export const useNotification = () => {
  async function onDisplayNotification(id: string, message: string) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      vibration: true,
    });

    await notifee.displayNotification({
      title: 'MedicAlarm',
      body: message,
      id: id,
      android: {
        channelId,
        pressAction:{
            id: 'default'
        }
      },
    });
  }

  return {onDisplayNotification};
};
