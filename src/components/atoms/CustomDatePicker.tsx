import React, {useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {Text} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import 'moment/locale/es-mx';
import colors from '../../styles/colors';

interface Props {
  title: string;
  mode?: 'datetime' | 'date' | 'time';
  date: Date;
  minimumDate: Date;
  handleDate: (date: Date) => void;
}

const CustomDatePicker = ({
  title,
  mode = 'datetime',
  minimumDate = new Date(Date.now()),
  date,
  handleDate,
}: Props) => {
  //const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const state = moment(date).format(mode === 'time' ? 'h:mm a' : 'LL');
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{state}</Text>
        </View>
      </TouchableWithoutFeedback>
      <DatePicker
        modal
        open={open}
        mode={mode}
        date={date}
        minimumDate={minimumDate}
        onConfirm={date => {
          setOpen(false);
          handleDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderColor: '#B5B5B5',
    borderWidth: 1,
    borderRadius: 10,
    height: 55,
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    paddingHorizontal: 5,
    fontSize: 12,
    top: -10,
    left: 5,
    backgroundColor: colors.background,
  },
  date: {
    fontSize: 16,
    marginLeft: 15,
  },
});
