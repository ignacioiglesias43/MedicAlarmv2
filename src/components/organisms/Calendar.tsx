import React from 'react';
import {Dimensions} from 'react-native';

import {
  Calendar as CalendarComponent,
  LocaleConfig,
} from 'react-native-calendars';

import {calendarES} from '../../utils/calendarConfig';

import colors from '../../styles/colors';

const {width} = Dimensions.get('window');

const Calendar = () => {
  LocaleConfig.locales.es = calendarES;
  LocaleConfig.defaultLocale = 'es';

  return (
    <CalendarComponent
      // Initially visible month. Default = Date()
      current={new Date(Date.now())}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={day => {
        console.log('selected day', day);
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={day => {
        console.log('selected day', day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'MMMM yyyy'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month: any) => {
        console.log('month changed', month);
      }}
      firstDay={1}
      onPressArrowLeft={subtractMonth => subtractMonth()}
      onPressArrowRight={addMonth => addMonth()}
      enableSwipeMonths={true}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays
      markedDates={{
        '2021-10-15': {
          selected: true,
          selectedColor: colors.markedDates,
          selectedTextColor: colors.textOnImage,
        },
      }}
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
