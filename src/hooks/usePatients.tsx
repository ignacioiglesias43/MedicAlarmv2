import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';
import {Patient} from '../api/patient/model/Patient';
import {getPatientsService} from '../api/patient/services';
import {useAppDispatch} from '../store/hooks';
import { updateIndicatorVisible } from '../store/loadingIndicator/actionCreators';
import { updatePatients } from '../store/patients/actionCreators';
import { resultedGetPattientDto } from '../api/patient/dto/resulted-patient.dto';

export const usePatient = () => {
  const {patients} = useSelector((state: RootState) => state.patientReducer);
  const {token} = useSelector((state: RootState) => state.authReducer);

  const dispatch = useAppDispatch();

  const getPatients = useCallback(async () => {
    try {
      const response = await getPatientsService(token);
      if (response) {
        const {data} = response as resultedGetPattientDto
        dispatch(updatePatients(data))
      }
    } catch (error: any) {
      console.log('error: ', {...error});
    }
  }, [dispatch, token]);
  
  useEffect(() => {
    getPatients();
  }, [getPatients])

  const deletePatientButton = async (id: string) => {
    //dispatch(updateIndicatorVisible(true))
    //dispatch(updatePatients([]))
  }


  return {patients, deletePatientButton};
};
