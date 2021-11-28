import React, {FC} from 'react';
import {PusherProvider} from '@harelpls/use-pusher/react-native';
import {PUSHER_KEY} from '@env';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store/index';

const PusherContainer: FC = ({children}) => {
  const {token} = useAppSelector((state: RootState) => state.authReducer);

  const config = {
    // required config props
    clientKey: PUSHER_KEY,
    cluster: 'us2',
    authEndpoint: 'http://192.168.1.78:8000/broadcasting/auth',
    auth: {
      headers: {
        Accept: 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    },
  };

  return <PusherProvider {...config}>{children}</PusherProvider>;
};

export default PusherContainer;
