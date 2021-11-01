import {useAppDispatch, useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';

export const useUpdateAppoinment = (actionType: 'UPDATE' | 'ADD') => {
  const {patients} = useAppSelector((state: RootState) => state.patientReducer);
  const patientList = patients.map(a => a.patient);

  return {
    patients: patientList,
  };
};
