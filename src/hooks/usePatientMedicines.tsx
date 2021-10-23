import { useNavigation } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {useState} from 'react';
import {Prescription} from '../api/prescriptions/model/Prescription';
import {FABGroupProps} from '../components/atoms/CustomFABGroup';
import { PatientStackParams } from '../navigation/stacks/PatientStack';

export const usePatientMedicines = () => {
  const {navigate} = useNavigation<NativeStackScreenProps<PatientStackParams, 'Patient'>>()

  const actions: FABGroupProps[] = [
    {
      icon: 'plus',
      label: 'Añadir receta',
      onPress: () => {navigate('Update', {actionType: 'ADD'})}
    },
    {
      icon: 'delete',
      label: 'Eliminar paciente',
      onPress: () => console.log('eliminar lógica'),
    },
  ];

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: 1,
      medicine: {
        id: 1,
        name: 'Keterolaco',
        via_admin: 'Oral',
      },
      frecuency: 8,
      count: 8,
    },
  ]);

  return {prescriptions, actions};
};
