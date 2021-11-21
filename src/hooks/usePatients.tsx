import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {Patient} from '../api/patient/model/Patient';
import {
  deletePatientService,
  getPatientsService,
} from '../api/patient/services';
import {useAppDispatch} from '../store/hooks';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {deletePatient, updatePatients} from '../store/patients/actionCreators';
import {resultedGetPattientDto} from '../api/patient/dto/resulted-patient.dto';
import {useModal} from './useModal';
import {updateModalUserHasConfirmed} from '../store/modal/actionCreators';
import colors from '../styles/colors';

export const usePatient = () => {
  const {patients} = useSelector((state: RootState) => state.patientReducer);
  const {token} = useSelector((state: RootState) => state.authReducer);
  const {openModal, userHasConfirmed} = useModal();

  const [patientSelected, setpatientSelected] = useState<Patient>();
  const dispatch = useAppDispatch();

  const getPatients = useCallback(async () => {
    try {
      const response = await getPatientsService(token);
      if (response) {
        const {data} = response as resultedGetPattientDto;
        dispatch(updatePatients(data));
      }
    } catch (error: any) {
      console.log('error: ', {...error});
    }
  }, [dispatch, token]);

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  const deletePatientButton = async (patient: Patient) => {
    setpatientSelected(patient);
    openModal(`¿Seguro que desea eliminar a ${patient.user.name}?`, true);
  };

  const handleDeletePatient = useCallback(async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      dispatch(updateModalUserHasConfirmed(false));
      const response = await deletePatientService(patientSelected?.id!, token);
      if (response) {
        dispatch(deletePatient(patientSelected?.id!));
      }
    } catch (error: any) {
      const errMessage = error?.response?.data?.message || '';
      openModal(errMessage, false, 'Error', 'alert-decagram', colors.error);
    } finally {
      dispatch(updateIndicatorVisible(false));
      setpatientSelected(undefined);
    }
  }, [dispatch, openModal, token, patientSelected]);

  useEffect(() => {
    if (userHasConfirmed) {
      handleDeletePatient();
    }
  }, [handleDeletePatient, userHasConfirmed])


  return {patients, deletePatientButton};
};
