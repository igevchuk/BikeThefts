import * as React from 'react';
import * as _ from 'lodash';
import { Search as SemanticSearch } from 'semantic-ui-react';
import { IncidentActions } from 'app/actions';

export namespace Search {
  export interface Props  {
    onSearch: typeof IncidentActions.fetchIncidents;
  }
  export interface State {
    isLoading: boolean;
    value: string;
  }
}

export class Search extends React.Component<Search.Props, Search.State> {
  constructor(props: Search.Props, context?: any) {
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
    this.props.onSearch({ query: value });
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
