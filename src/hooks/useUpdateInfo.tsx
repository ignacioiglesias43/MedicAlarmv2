import {User} from '../api/user/model/User';

import {useForm} from './useForm';
import {useAppSelector} from '../store/hooks';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UserStackParams} from '../navigation/stacks/UserStack';

import {RootState} from '../store/index';

export const useUpdateInfo = (
  navigation: NativeStackNavigationProp<UserStackParams, 'UpdateInformation'>,
) => {
  const auth = useAppSelector((state: RootState) => state.authReducer);
  const user = auth.userInfo as User;

  const {createChangeHandler, formFields} = useForm<User>({
    ...user,
  });

  const update = () => {};
  const cancel = () => navigation.goBack();

  return {
    formFields,
    update,
    cancel,
    setValues: createChangeHandler,
  };
};
