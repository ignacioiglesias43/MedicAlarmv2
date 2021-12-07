import {PUSHER_KEY} from '@env';
import Pusher from 'pusher-js/react-native';

const pusher = (token: string) =>
  new Pusher(PUSHER_KEY, {
    cluster: 'us2',
    authEndpoint: 'http://192.168.1.78:8000/broadcasting/auth',
    auth: {
      headers: {
        Accept: 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    },
  });

export default pusher;
