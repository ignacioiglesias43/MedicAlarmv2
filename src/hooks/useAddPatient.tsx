import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {ResultedUserSearch} from '../api/user/dto/result-user.dto';
import {getUserByCode} from '../api/user/services';
import {RootState} from '../store';
import {useModal} from './useModal';
import {updateIndicatorVisible} from '../store/loadingIndicator/actionCreators';
import {addPatient} from '../store/patients/actionCreators';
import {User} from '../api/user/model/User';
import { addPatientToDoctor } from '../api/patient/services';
import { resultedAddPatientDto } from '../api/patient/dto/resulted-patient.dto';

export const useAddPatient = () => {
  const [code, setCode] = useState('');
  const {openModal} = useModal();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {token} = useSelector((state: RootState) => state.authReducer);

  const handleUpdateCode = (text: string) => {
    //TODO: Hacer que el texto sea siempre mayusculas
    var letter = text.substr(text.length - 1);
    if (/\w|[-]/.test(letter) || !letter.trim()) setCode(text);
  };

  const submitCode = async () => {
    try {
      dispatch(updateIndicatorVisible(true));
      const result = await getUserByCode(code, token);
      if (result) {
        const user = result.data as ResultedUserSearch;
        const response = await addPatientToDoctor(code, token)
        if(response){
          const {data} = response.data as resultedAddPatientDto
          dispatch(addPatient({patient: user.data, id: data.id}));
          navigation.goBack();
        }
      }
    } catch (error: any) {
      openModal(error.response.data.message);
    } finally {
      dispatch(updateIndicatorVisible(false));
    }
  };

  return {
    code,
    setCode: handleUpdateCode,
    submitCode,
  };
};
