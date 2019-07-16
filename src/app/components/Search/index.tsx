import * as React from 'react';
import cx from 'classnames';
import { Search as StyledSearch } from './styled';
import { Input } from 'semantic-ui-react';

namespace Search {
  export interface Props {
    name: string;
    placeholder?: string;
    onSearch(name: string, value: string): void;
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
    const { name, onSearch } = this.props;
    const { target: { value }} = e;

    this.setState({ value });
    onSearch(name, value);
  }

  render() {
    const { placeholder, ...rest } = this.props;
    const { value } = this.state;

    return (
      <StyledSearch className={cx('search-input', )}>
        <Input fluid={true} placeholder={placeholder || ''} value={value} onChange={this.handleChange} {...rest} />
      </StyledSearch>
    )
  }
}
