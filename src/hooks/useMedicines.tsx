import {useState, useEffect} from 'react';
import {Medicine} from '../api/medicines/model/Medicines';
import {getAllMedicines} from '../api/medicines/services';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';
import { updateIndicatorVisible } from '../store/loadingIndicator/actionCreators';
import { useModal } from './useModal';

export const useMedicines = () => {
  const {token} = useAppSelector((state: RootState) => state.authReducer);
  const {openModal} = useModal()
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getMedicines = async () => {
      dispatch(updateIndicatorVisible(true))
      try {
        const response = await getAllMedicines(token);

        if(response) {
          const {data} = response.data;
          setMedicines(data)
        }
      } catch (error: any) {
        console.log({...error});
        openModal(error?.response?.data?.message || '')
      } finally {
        dispatch(updateIndicatorVisible(false))
      }
    };

    getMedicines();
  }, [token]);

  return {medicines};
};
