import {useForm} from './useForm';
import {Medicine} from '../api/medicines/model/Medicines';

export const useUpdateMedicine = (actionType: 'UPDATE' | 'ADD') => {
  const pickerOptions = [
    {label: 'Oral', key: 'Oral', value: 'Oral'},
    {label: 'Inyectable', key: 'Inyectable', value: 'Inyectable'},
    {label: 'Sublingual', key: 'Sublingual', value: 'Sublingual'},
    {label: 'Nasal', key: 'Nasal', value: 'Nasal'},
    {label: 'Cutáneo', key: 'Cutáneo', value: 'Cutáneo'},
    {label: 'Ocular', key: 'Ocular', value: 'Ocular'},
    {label: 'Rectal', key: 'Rectal', value: 'Rectal'},
  ];

  const {createChangeHandler, formFields} = useForm<Medicine, Medicine>({
    id: actionType === 'UPDATE' ? 0 : 0,
    name: actionType === 'UPDATE' ? 'Keterolaco' : '',
    via: 'Oral',
  });

  return {
    formFields,
    setValues: createChangeHandler,
    pickerOptions,
  };
};
