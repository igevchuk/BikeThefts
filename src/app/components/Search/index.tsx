import * as React from 'react';
import { Search as StyledSearch } from './styled';
import { Input } from 'semantic-ui-react';

namespace Search {
  export interface Props {
    name: string;
    placeholder?: string;
    value: string;
    handleSearch(name: string, value: string): void;
  }
}

export const Search: React.SFC<Search.Props> = (props) => {
  const { name, placeholder, value, handleSearch, ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = e;

    handleSearch(name, value);
  };

  return (
    <StyledSearch className="search" data-test="search-component">
      <Input
        className="search-input"
        fluid={true}
        placeholder={placeholder || ''}
        value={value}
        onChange={handleChange}
        {...rest}
        data-test="search-input-component"
      />
    </StyledSearch>
  );
};
