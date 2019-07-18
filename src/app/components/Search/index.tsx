import * as React from 'react';
import cx from 'classnames';
import { Search as StyledSearch } from './styled';
import { Input } from 'semantic-ui-react';

namespace Search {
  export interface Props {
    id?: string;
    name: string;
    placeholder?: string;
    value: string;
    handleSearch(name: string, value: string): void;
  }
  export interface State {
    value: string;
  }
}

export class Search extends React.Component<Search.Props> {
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, handleSearch } = this.props;
    const {
      target: { value }
    } = e;

    handleSearch(name, value);
  };

  render() {
    const { placeholder, value, ...rest } = this.props;

    return (
      <StyledSearch className={cx('search-input')}>
        <Input
          fluid={true}
          placeholder={placeholder || ''}
          value={value}
          onChange={this.handleChange}
          {...rest}
        />
      </StyledSearch>
    );
  }
}
