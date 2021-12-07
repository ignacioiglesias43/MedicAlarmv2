import { useNavigation } from '@react-navigation/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { Prescription } from '../api/prescriptions/model/Prescription';
import { updateIndicatorVisible } from '../store/loadingIndicator/actionCreators';
import { updateModalUserHasConfirmed } from '../store/modal/actionCreators';
import { useModal } from './useModal';
import { deletePrescriptionPatient } from '../api/prescriptions/services';
import { deletePrescritpionOnPatient } from '../store/patients/actionCreators';
import colors from '../styles/colors';

export const usePatientMedicines = (code: string) => {
  const { patients } = useSelector((state: RootState) => state.patientReducer);
  const { token } = useSelector((state: RootState) => state.authReducer);
  const { openModal, userHasConfirmed } = useModal()
  const patient = patients.find(e => e.user.code === code);
  const dispatch = useDispatch()
  const [selectedPres, setSelectedPres] = useState<Prescription>()

  //TODO: Descubrir porque regresa error aún si haber eliminado
  const handleDeletePrescription = useCallback(async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      dispatch(updateModalUserHasConfirmed(false));
      const response = await deletePrescriptionPatient("" + selectedPres?.id, token)
      if (response) {
        dispatch(deletePrescritpionOnPatient({ id: "" + selectedPres?.id, code }))
      }
    } catch (error: any) {
      const errMessage = error?.response?.data?.message || '';
      openModal(errMessage, false, 'Error', 'alert-decagram', colors.error);
    } finally {
      dispatch(updateIndicatorVisible(false));
      setSelectedPres(undefined)
    }
  }, [dispatch, openModal, token, selectedPres])

  const deletePrescriptionButton = async (prescription: Prescription) => {
    setSelectedPres(prescription)
    openModal('¿Seguro que desea eliminar esta prescripción?', true)
  }

  useEffect(() => {
    if (userHasConfirmed) handleDeletePrescription()
  }, [handleDeletePrescription, userHasConfirmed])

  return { prescriptions: patient?.prescriptions, deletePrescriptionButton };
};
