import React, {useState} from 'react';
import {Dimensions} from 'react-native';

import {
  Calendar as CalendarComponent,
  LocaleConfig,
} from 'react-native-calendars';

import {calendarES} from '../../utils/calendarConfig';

import colors from '../../styles/colors';

const {width} = Dimensions.get('window');

interface Props {
  selectedDate: string;
  handleSelectedDate: (x: string) => void;
  markedDates: Array<String>;
}

const Calendar = ({selectedDate, handleSelectedDate, markedDates}: Props) => {
  LocaleConfig.locales.es = calendarES;
  LocaleConfig.defaultLocale = 'es';

  let marks = {
    [selectedDate]: {
      selected: true,
      selectedColor: colors.markedDates,
      selectedTextColor: colors.background,
    },
  };

  markedDates.map(item => {
    marks[item] = {
      ...marks[item],
      marked: true,
    };
  });

  return (
    <CalendarComponent
      onDayPress={({dateString}) => handleSelectedDate(dateString)}
      monthFormat={'MMMM yyyy'}
      firstDay={1}
      onPressArrowLeft={subtractMonth => subtractMonth()}
      onPressArrowRight={addMonth => addMonth()}
      enableSwipeMonths={true}
      disableAllTouchEventsForDisabledDays
      markedDates={marks}
      style={{width}}
      theme={{
        backgroundColor: colors.background,
        calendarBackground: colors.background,
        textSectionTitleColor: colors.accent,
        textSectionTitleDisabledColor: colors.disabled,
        selectedDayTextColor: colors.textOnImage,
        selectedDotColor: colors.accent,
        todayTextColor: colors.accent,
        dayTextColor: colors.text,
        arrowColor: colors.accent,
        textDisabledColor: colors.disabled,
        monthTextColor: colors.text,
        dotColor: colors.accent,
        textDayFontSize: 18,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 18,
      }}
    />
  );
};

export default Calendar;
