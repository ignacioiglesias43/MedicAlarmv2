import {useState, useEffect} from 'react';
import {Medicine} from '../api/medicines/model/Medicines';
import {getAllMedicines} from '../api/medicines/services';
import {useAppSelector} from '../store/hooks';
import {RootState} from '../store/index';

export const useMedicines = () => {
  const {token} = useAppSelector((state: RootState) => state.authReducer);
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: 'Keterolaco',
      via_admin: 'Oral',
    },
  ]);

  useEffect(() => {
    const getMedicines = async () => {
      try {
        const response = await getAllMedicines(token);

        console.log(response.data);
      } catch (error: any) {
        console.log({...error});
      }
    };

    getMedicines();
  }, [token]);

  return {medicines};
};
