import * as React from 'react';
import * as moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Calendar as StyledCalendar } from './styled';
import { DATE_FORMAT } from 'app/constants';
// import 'react-day-picker/lib/style.css';
import './style.css';
// const style = require('react-day-picker/lib/style.css');

export namespace Calendar {
  export interface Props {
    name: string;
    selected: number;
    onSelect(name: string, value: number): void;
  }
}

export const Calendar: React.SFC<Calendar.Props> = (props) => {
  const { name, selected, onSelect } = props;

  const handleChange = (date: Date): void => {
    this.setState({ selected: date });
    onSelect(name, moment(date).unix());
  };

  return (
    <StyledCalendar className="calendar" data-test="datepicker-component">
      <DayPickerInput
        // selected={new Date(selected)}
        format={DATE_FORMAT}
        onDayChange={handleChange}
      />
    </StyledCalendar>
  );
};
