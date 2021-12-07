import React, {FC} from 'react';
import {PusherProvider} from '@harelpls/use-pusher/react-native';
import {PUSHER_KEY, PUSHER_CLUSTER, PUSHER_ENDPOINT} from '@env';
import {useAppSelector} from '../../store/hooks';
import {RootState} from '../../store/index';

const PusherContainer: FC = ({children}) => {
  const {token} = useAppSelector((state: RootState) => state.authReducer);

  const config = {
    // required config props
    clientKey: PUSHER_KEY,
    cluster: PUSHER_CLUSTER,
    authEndpoint: PUSHER_ENDPOINT,
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
