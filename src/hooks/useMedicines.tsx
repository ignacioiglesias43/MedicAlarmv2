import {useState} from 'react';
import {Contact} from '../api/contact/model/Contact';
import { Medicine } from '../api/medicines/model/Medicines';

export const useMedicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: 'Keterolaco',
      via_admin: 'Oral'
    },
  ]);

  return {medicines};
};
