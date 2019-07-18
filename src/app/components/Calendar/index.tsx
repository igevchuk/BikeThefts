import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import * as moment from 'moment';
import { Calendar as StyledCalendar } from './styled';
// import 'react-day-picker/lib/style.css';
import './style.css';
// const style = require('react-day-picker/lib/style.css');

export namespace Calendar {
  export interface Props {
    id?: string;
    name: string;
    selected: number;
    onSelect(name: string, value: number): void;
  }
  export interface State {
    selected: Date;
  }
}

export class Calendar extends React.Component<Calendar.Props, Calendar.State> {
  constructor(props: Calendar.Props, context?: any) {
    super(props);
    this.state = {
      selected: new Date()
    };
  }

  handleChange = (date: Date): void => {
    const { name, onSelect } = this.props;
    this.setState({ selected: date });
    onSelect(name, moment(date).unix());
  };

  render() {
    const { ...rest } = this.props;
    const FORMAT = 'M/D/YYYY';
    return (
      <StyledCalendar className="calendar" id={rest.id}>
        <DayPickerInput
          // selected={new Date(selected)}
          format={FORMAT}
          onDayChange={this.handleChange}
        />
      </StyledCalendar>
    );
  }
}
