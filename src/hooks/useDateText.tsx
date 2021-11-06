import {useFocusEffect} from '@react-navigation/core';
import {useCallback, useState} from 'react';

export const useDateText = (date: string) => {
  const [state, setState] = useState('');
  useFocusEffect(
    useCallback(() => {
      const fDate = date.substr(0, 10).split('-');
      const hDate = date.substr(11, 5)
      const month = TimeFactory.months()[parseInt(fDate[1])-1]
      setState(`${month} ${fDate[2]} de ${fDate[0]}, ${hDate}`);
    }, [date]),
  );
  return state;
};

export const useFormatedDate = (date: string) => {
  const [state, setState] = useState('');
  useFocusEffect(
    useCallback(() => {
      const fDate = date.substr(0, 10).split('-');
      const hDate = date.substr(11, 5)
      setState(`${fDate[2]}-${fDate[1]}-${fDate[0]} ${hDate}`);
    }, [date]),
  );
  return state;
}

const TimeFactory = {
  months: () => [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
};
