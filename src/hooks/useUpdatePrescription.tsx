import { useNavigation } from '@react-navigation/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Medicine } from '../api/medicines/model/Medicines';
import { getFilterMedicines } from '../api/medicines/services';
import moment from 'moment'
import { CreatePrescriptionDTO } from '../api/prescriptions/dto/create-prescription.dto';
import { Prescription } from '../api/prescriptions/model/Prescription';
import { addPrescriptionToPatient, updatePrescriptionToPatient } from '../api/prescriptions/services';
import { initialPrescriptionForm } from '../constants/prescriptionForm';
import { RootState } from '../store';
import { updateIndicatorVisible } from '../store/loadingIndicator/actionCreators';
import { addNewPrescriptionToPatient, updatePrescriptionPatient } from '../store/patients/actionCreators';
import { useForm } from './useForm';
import { useModal } from './useModal';
import { UpdatePrescriptionDTO } from '../api/prescriptions/dto/update-prescription.dto';

const useUpdatePrescription = (actionType: 'ADD' | 'UPDATE', code: string, prescription: Prescription) => {
  const acDate = new Date()
  const { formFields, createChangeHandler } = useForm<Prescription, Prescription>(
    actionType === 'ADD' ? initialPrescriptionForm : {
      ...prescription,
      frecuency: moment(acDate).subtract(prescription.duration!).day()
    },
  );
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [medicineList, setMedicineList] = useState<Medicine[]>([]);
  const [query, setQuery] = useState('');
  const { openModal } = useModal();

  const getMedicines = useCallback(async () => {
    try {
      const response = await getFilterMedicines(query, token);
      if (response) {
        const { data } = response.data;
        if (query.trim()) setMedicineList(data);
      }
    } catch (error) { }
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
      const response = await addPrescriptionToPatient(prescriptionData, token);
      if (response) {
        const { data } = response.data;
        console.log(data)
        dispatch(addNewPrescriptionToPatient({ prescription: data[0], id: code }));
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

  const updatePrescription = async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      /*
      const keys = Object.keys(prescription).filter(
        key => prescription[key] !== formFields[key],
      );
      const data: any = keys.reduce(
        (acc, curr) => ((acc[curr] = formFields[curr]), acc),
        {},
      );*/
      const data: UpdatePrescriptionDTO = {
        id: `${prescription.id}`,
        duration: `${formFields.frecuency}`,
        interval: `${formFields.interval}`,
        medicament_id: formFields.medicament?.id.id
      }
      /*
      if (Object.keys(data).length !== 0) {
        data["id"] = `${prescription.id}`
        if (data.medicament) data.medicament_id = data.medicament.id.id*/
      const response = await updatePrescriptionToPatient(data as UpdatePrescriptionDTO, token)
      if (response) {
        const { data } = response.data as any
        dispatch(updatePrescriptionPatient({ prescription: data[0], id: code }))
        navigation.goBack()
      } /*
      } else {
        navigation.goBack()
      }*/
    } catch (error: any) {
      console.log(error);
      const message = error?.response?.data?.message || '';
      openModal(message, false, 'Error');
    } finally {
      dispatch(updateIndicatorVisible(false));
    }

  };

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
