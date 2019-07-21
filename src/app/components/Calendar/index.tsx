import * as React from 'react';
import * as moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Calendar as StyledCalendar } from './styled';
import { DATE_FORMAT } from 'app/constants';
import { formatDate } from 'app/utils';
import 'react-day-picker/lib/style.css';
import './style.css';
// const style = require('react-day-picker/lib/style.css');

export namespace Calendar {
  export interface Props {
    name: string;
    selectedDay: {};
    onSelect(name: string, value: number): void;
  }
}

export const Calendar: React.SFC<Calendar.Props> = (props) => {
  const { name, selectedDay, onSelect } = props;

  const handleChange = (day: Date): void => {
    console.log(day)
    onSelect(name, moment(day).unix());
  };

  console.log(typeof selectedDay)

  return (
    <StyledCalendar className="calendar" data-test="datepicker-component">
      {selectedDay && <p>{ formatDate(selectedDay, 'MMMM Do, YYYY') }</p>}
      {!selectedDay && <p>Choose a day</p>}
      <DayPickerInput
        format={DATE_FORMAT}
        onDayChange={handleChange}
      />
    </StyledCalendar>
  );
};
