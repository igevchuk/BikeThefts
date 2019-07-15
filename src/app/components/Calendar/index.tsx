import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

import * as style from 'react-datepicker/dist/react-datepicker.min.css';

export namespace Calendar {
  export interface Props {
    name: string;
    selected: number;
    onSelect(name: string, value: number): void;
  }
  export interface State {
    selected: Date
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
  }

  render() {
    const { selected } = this.props;
    return (
      <DatePicker
        selected={new Date(selected)}
        onChange={this.handleChange}
      />
    );
  }
}
