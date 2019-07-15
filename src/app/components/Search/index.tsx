import * as React from 'react';
import cx from 'classnames';
import { Label, Input } from 'semantic-ui-react';

namespace Search {
  export interface Props {
    label?: string;
    name: string;
    placeholder?: string;
    onChange(name: string, value: string): void;
  }
  export interface State {
    value: string
  }
}

export class Search extends React.Component<Search.Props, Search.State> {
  constructor(props: Search.Props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, onChange } = this.props;
    const { target: { value }} = e;

    this.setState({ value });
    onChange(name, value);
  }

  render() {
    const { label, placeholder } = this.props;
    const { value } = this.state;

    return (
      <div className={cx('search-input', )}>
        {!!label && <Label>{ label }</Label>}
        <Input placeholder={placeholder || ''} value={value} onChange={this.handleChange} />
      </div>
    )
  }
}
