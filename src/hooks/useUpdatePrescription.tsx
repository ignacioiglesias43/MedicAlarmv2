import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Medicine} from '../api/medicines/model/Medicines';
import {getFilterMedicines} from '../api/medicines/services';
import {CreatePrescriptionDTO} from '../api/prescriptions/dto/create-prescription.dto';
import {Prescription} from '../api/prescriptions/model/Prescription';
import {addPrescriptionToPatient} from '../api/prescriptions/services';
import {initialPrescriptionForm} from '../constants/prescriptionForm';
import {RootState} from '../store';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {addNewPrescriptionToPatient} from '../store/patients/actionCreators';
import {useForm} from './useForm';
import {useModal} from './useModal';

const useUpdatePrescription = (actionType: 'ADD' | 'UPDATE', code: string) => {
  const {formFields, createChangeHandler} = useForm<Prescription, Prescription>(
    actionType === 'ADD' ? initialPrescriptionForm : initialPrescriptionForm,
  );
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.authReducer);
  const [medicineList, setMedicineList] = useState<Medicine[]>([]);
  const [query, setQuery] = useState('');
  const {openModal} = useModal();

  const getMedicines = useCallback(async () => {
    try {
      const response = await getFilterMedicines(query, token);
      if (response) {
        const {data} = response.data;
        if (query.trim()) setMedicineList(data);
      }
    } catch (error) {}
  }, [query]);

  useEffect(() => {
    getMedicines();
  }, [getMedicines]);

  const handleQuery = (text: string) => setQuery(text);

  const savePrescription = async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      const prescriptionData: CreatePrescriptionDTO = {
        medicament: formFields.medicament?.id.id,
        interval: formFields.interval,
        duration: formFields.frecuency,
        patient: code,
      };
      console.log(prescriptionData);
      const response = await addPrescriptionToPatient(prescriptionData, token);
      if (response) {
        const {data} = response.data;
        console.log(data)
        dispatch(addNewPrescriptionToPatient({prescription: data[0], id: code}));
        navigation.goBack();
      }
    } catch (error: any) {
      console.log(error);
      const message = error?.response?.data?.message || '';
      openModal(message, false, 'Error');
    } finally {
      dispatch(updateIndicatorVisible(false));
    }
  };

  const updatePrescription = () => {};

  const handleSubmit = () => {
    if (!formFields.medicament)
      return openModal('Todos los campos son obligatorios');
    if (!formFields.interval || formFields.interval <= 0)
      return openModal('Todos los campos son obligatorios');
    if (!formFields.frecuency || formFields.frecuency <= 0)
      return openModal('Todos los campos son obligatorios');
    return actionType === 'ADD' ? savePrescription() : updatePrescription();
  };

  return {
    formFields,
    medicines:
      medicineList.length > 0
        ? medicineList.map(e => ({
            name: e.name,
            id: e,
          }))
        : [],
    handleQuery,
    handleSubmit,
    setValues: createChangeHandler,
  };
};

export default useUpdatePrescription;
