import * as React from 'react';
import * as _ from 'lodash';
import { Search as SemanticSearch } from 'semantic-ui-react';

// import * as classNames from 'classnames';
// import * as style from './style.css';
// import { TodoModel } from 'app/models';
// import { TodoActions } from 'app/actions';
// import { TodoTextInput } from '../TodoTextInput';

export namespace Search {
  export interface State {
    isLoading: boolean;
    value: string;
  }
}

export class Search extends React.Component<{}, Search.State> {
  constructor(props: {}, context?: any) {
    super(props, context);

    this.state = {
      isLoading: false,
      value: ''
    };
  }

  handleSearchChange = (event: React.SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    this.setState({ value });
  }

  handleSearchClear = (): void => {
    this.setState({ value: ''});
  }

  render() {
    const { isLoading, value } = this.state;

    return (
      <SemanticSearch
        fluid={true}
        loading={isLoading}
        onSearchChange={this.handleSearchChange}
        showNoResults={false}
        value={value}
        {...this.props}
      />
    )
  }
}
