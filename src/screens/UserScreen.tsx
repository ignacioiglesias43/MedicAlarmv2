import React, {FC} from 'react';
import {StyleSheet} from 'react-native';

import {Title} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  updateToken,
  updateTokenExpiresAt,
  updateUserInfo,
} from '../store/auth/actionCreators';
import {updateReminders} from '../store/reminders/actionCreators';
import {updateAppointmets} from '../store/appoinment/actionCreators';
import {updateContacts} from '../store/contacts/actionCreators';
import {updatePatients} from '../store/patients/actionCreators';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UserStackParams} from '../navigation/stacks/UserStack';
import {User} from '../api/user/model/User';
import {RootState} from '../store/index';

import CustomHeader from '../components/atoms/CustomHeader';
import CustomButton from '../components/atoms/CustomButton';
import DataCard from '../components/molecules/DataCard';
import ViewContainer from '../components/templates/ViewContainer';

import notifee from '@notifee/react-native';
import colors from '../styles/colors';

interface UserScrenProps
  extends NativeStackScreenProps<UserStackParams, 'Dashboard'> {}

const UserScreen: FC<UserScrenProps> = ({navigation}) => {
  const {userInfo} = useAppSelector((state: RootState) => state.authReducer);
  const dispatch = useAppDispatch();

  const updateInfo = () => navigation.navigate('UpdateInformation');
  const logout = async () => {
    dispatch(updatePatients([]));
    dispatch(updateAppointmets([]));
    dispatch(updateContacts([]));
    dispatch(updateReminders([]));
    dispatch(updateToken(''));
    dispatch(updateTokenExpiresAt(''));
    dispatch(updateUserInfo(null));
    await notifee.cancelAllNotifications();
  };

  const {
    name,
    lastname,
    email,
    phone,
    code,
    role,
    speciality,
    professional_id,
  } = userInfo as User;

  const isADoctor = role !== undefined && role?.length > 0 && role === 'Medic';

  return (
    <ViewContainer>
      <CustomHeader>
        <Title style={styles.title}>
          {name} {lastname}
        </Title>
      </CustomHeader>
      <>
        {!isADoctor && (
          <DataCard
            title="ID"
            fisrt={code!}
            type="personal"
            titleStyle={styles.titleCard}
            subtitleStyle={styles.subCard}
          />
        )}
      </>
      <DataCard
        title="Correo electrónico"
        fisrt={email}
        type="personal"
        titleStyle={styles.titleCard}
        subtitleStyle={styles.subCard}
      />
      <DataCard
        title="Teléfono"
        fisrt={phone}
        type="personal"
        titleStyle={styles.titleCard}
        subtitleStyle={styles.subCard}
      />
      <>
        {isADoctor && (
          <>
            <DataCard
              title="Especialidad"
              fisrt={speciality!}
              type="personal"
              titleStyle={styles.titleCard}
              subtitleStyle={styles.subCard}
            />
            <DataCard
              title="ID Profesional"
              fisrt={professional_id!}
              type="personal"
              titleStyle={styles.titleCard}
              subtitleStyle={styles.subCard}
            />
          </>
        )}
      </>
      <CustomButton
        dark
        mode="contained"
        text="Editar"
        color={colors.accent}
        style={styles.button}
        onPress={updateInfo}
      />
      <CustomButton
        dark
        mode="outlined"
        text="Cerrar sesión"
        color={colors.accent}
        style={styles.button}
        onPress={logout}
      />
    </ViewContainer>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  title: {
    marginLeft: 20,
    marginTop: 20,
  },
  titleCard: {
    fontSize: 14,
    color: colors.placeholder,
  },
  subCard: {
    fontSize: 16,
    color: colors.text,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
