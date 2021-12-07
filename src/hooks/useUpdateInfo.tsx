import {User} from '../api/user/model/User';
import {useForm} from './useForm';
import {useAppSelector} from '../store/hooks';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UserStackParams} from '../navigation/stacks/UserStack';
import {useAppDispatch} from '../store/hooks';

import {RootState} from '../store/index';
import {updateUserInfoService} from '../api/user/services';
import {useSelector} from 'react-redux';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {useModal} from './useModal';
import { updateUserInfo } from '../store/auth/actionCreators';

export const useUpdateInfo = (
  navigation: NativeStackNavigationProp<UserStackParams, 'UpdateInformation'>,
) => {
  const auth = useAppSelector((state: RootState) => state.authReducer);
  const {openModal} = useModal();
  const user = auth.userInfo as User;
  const token = auth.token;

  const dispatch = useAppDispatch();
  const {createChangeHandler, formFields} = useForm<User>({
    ...user,
  });

  const update = async () => {
    dispatch(updateIndicatorVisible(true));
    try {
      const keys = Object.keys(user).filter(
        key => user[key] !== formFields[key],
      );
      const data = keys.reduce(
        (acc, curr) => ((acc[curr] = formFields[curr]), acc),
        {},
      );
      const response = await updateUserInfoService(data, token);
      if (response) {
        const {data} = response.data as User
        dispatch(updateUserInfo({...data, role: user.role}))
        navigation.goBack();
      }
    } catch (error: any) {
      openModal(error?.response?.data?.message || '');
    } finally {
      dispatch(updateIndicatorVisible(false));
    }
  };
  const cancel = () => navigation.goBack();

  return {
    formFields,
    update,
    medic: user.role === 'Medic',
    cancel,
    setValues: createChangeHandler,
  };
};
