import * as React from 'react';
import * as moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Calendar as StyledCalendar } from './styled';
import { DATE_FORMAT } from 'app/constants';
import { formatDate } from 'app/utils';


export namespace Calendar {
  export interface Props {
    label?: string;
    name: string;
    selectedDay: {};
    onSelect(name: string, value: number): void;
  }
}

export const Calendar: React.SFC<Calendar.Props> = (props) => {
  const { name, label, selectedDay, onSelect } = props;

  const handleChange = (day: Date): void => {
    console.log(day)
    onSelect(name, moment(day).unix());
  };


  return (
    <StyledCalendar className="calendar" data-test="datepicker-component">
      {label && <label data-test='datepicker-label'>{ label }</label>}
      <DayPickerInput
        format={DATE_FORMAT}
        onDayChange={handleChange}
      />
    </StyledCalendar>
  );
};
