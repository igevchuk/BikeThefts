import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { IncidentActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { IncidentModel } from 'app/models';
import { omit } from 'app/utils';
import { Message } from 'semantic-ui-react';
import { HomeContainer, Filters, ClearButton } from './styled';
import { Calendar } from 'app/components/Calendar';
import { Search } from 'app/components/Search';
import { IncidentList } from 'app/components';
import * as moment from 'moment';
const { connect } = require('react-redux');

export namespace Home {
  export interface Props extends RouteComponentProps<void> {
    incidents: IncidentModel[];
    isLoading: boolean;
    error?: any;
    actions: IncidentActions;
  }
  export interface State {
    occured_after: number;
    occured_before: number;
    query: string;
    proximity: string;
  }
}

@connect(
  (state: any, ownProps) => {
    const { incidentState } = state;
    const { incidents, isLoading, error } = incidentState;
    return { incidents, isLoading, error };
  },
  (dispatch: Dispatch): Pick<Home.Props, 'actions'> => ({
    actions: bindActionCreators(omit(IncidentActions, 'Type'), dispatch)
  })
)
export class Home extends React.Component<Home.Props, Home.State> {
  readonly defaultFilters = {
    occured_after: moment()
      .subtract(1, 'years')
      .unix(),
    occured_before: moment().unix(),
    query: '',
    proximity: 'Kyiv, Ukraine'
  };

  constructor(props: Home.Props, context?: any) {
    super(props, context);
    this.state = {
      ...this.defaultFilters
    };
  }

  componentDidMount(): void {
    this.fetchData();
  }

  clearFilters = (): void => {
    this.setState({ ...this.defaultFilters }, () => {
      this.fetchData(this.defaultFilters);
    });
  };

  handleUpdateFilter = (name: keyof Home.State, value: string | number): void => {
    const newState = {
      ...this.state,
      [name]: value
    } as Home.State;

    this.setState(newState, () => {
      this.fetchData(this.state);
    });
  };

  fetchData = (queryOptions: {} = {} as Home.State): void => {
    const { actions } = this.props;

    actions.fetchIncidents({ ...queryOptions });
  };

  renderContent = (): React.ReactNode => {
    const { incidents } = this.props;

    if (incidents.length === 0) {
      return (
        <Message data-test="message-component">
          <Message.Header>No results found.</Message.Header>
          <p>Try to change your search criteria.</p>
        </Message>
      );
    }

    return <IncidentList incidents={incidents} />;
  };

  render() {
    const { occured_after, occured_before, query, proximity } = this.state;

    return (
      <HomeContainer className="home-container">
        <h1>List of stolen bikes</h1>
        <Filters>
          <Search
            name="query"
            placeholder="Search by description"
            value={query}
            handleSearch={this.handleUpdateFilter}
          />
          <Search
            placeholder="Search by location"
            name="proximity"
            value={proximity}
            handleSearch={this.handleUpdateFilter}
          />
          <div>
            Occured after:{' '}
            <Calendar
              name="occured_after"
              selected={occured_before}
              onSelect={this.handleUpdateFilter}
            />
          </div>
          <div>
            Occured before:{' '}
            <Calendar
              name="occured_before"
              selected={occured_after}
              onSelect={this.handleUpdateFilter}
            />
          </div>
          <div>
            <ClearButton
              floated="right"
              onClick={this.clearFilters}
              data-test="reset-filters-button"
            >
              CLEAR FILTERS
            </ClearButton>
          </div>
        </Filters>
        {this.renderContent()}
      </HomeContainer>
    );
  }
}
