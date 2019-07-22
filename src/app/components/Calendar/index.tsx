import * as React from 'react';
import * as moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Calendar as StyledCalendar } from './styled';
import { formatDate } from 'app/utils';

export namespace Calendar {
  export interface Props {
    label?: string;
    name: string;
    selectedDay: moment.Moment;
    onSelect(name: string, value: moment.Moment): void;
  }
}

export const Calendar: React.SFC<Calendar.Props> = (props) => {
  const { name, label, selectedDay, onSelect } = props;

  const handleChange = (day: Date): void => {
    onSelect(name, moment(day));
  };

  return (
    <StyledCalendar className="calendar" data-test="datepicker-component">
      {label && <label data-test="datepicker-label">{label}</label>}
      <DayPickerInput
        format="YYYY-MM-DD"
        value={selectedDay.toDate()}
        onDayChange={handleChange}
        data-test="datepicker-input"
      />
    </StyledCalendar>
  );
};
