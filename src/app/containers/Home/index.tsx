import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { IncidentsActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { IncidentModel } from 'app/models';
import { omit } from 'app/utils';
import { Message } from 'semantic-ui-react';
import { HomeContainer, Filters, ClearButton } from './styled';
import { Calendar } from 'app/components/Calendar';
import { Loader } from 'app/components/Loader';
import { Search } from 'app/components/Search';
import { IncidentList } from 'app/components';
import * as moment from 'moment';
const { connect } = require('react-redux');

export namespace Home {
  export interface Props extends RouteComponentProps<void> {
    incidents: IncidentModel[];
    isLoading: boolean;
    error?: any;
    actions: IncidentsActions;
  }
  export interface State {
    occurred_after: number;
    occurred_before: number;
    query: string;
    proximity: string;
  }
}

@connect(
  (state: RootState, ownProps) => {
    const { incidentsState } = state;
    const { incidents, isLoading, error } = incidentsState;
    return { incidents, isLoading, error };
  },
  (dispatch: Dispatch): Pick<Home.Props, 'actions'> => ({
    actions: bindActionCreators(omit(IncidentsActions, 'Type'), dispatch)
  })
)
export class Home extends React.Component<Home.Props, Home.State> {
  readonly defaultFilters = {
    occurred_after: moment()
      .subtract(1, 'years').unix(),
    occurred_before: moment().unix(),
    query: '',
    proximity: ''
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

  fetchData = (queryOptions: {} = {} as Home.State): void => {
    const { actions } = this.props;

    actions.fetchIncidents({ ...queryOptions });
  };

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

  renderContent = (): React.ReactNode => {
    const { incidents, error, isLoading } = this.props;

    if(isLoading) {
      return <Loader />
    } else if(error) {
        return (
        <Message negative={true} data-test="error-message">
          <Message.Header>{ error.toString() }</Message.Header>
          <p>Try later.</p>
        </Message>
      )
    } else if (incidents.length === 0) {
      return (
        <Message data-test="success-message">
          <Message.Header>No results found.</Message.Header>
          <p>Try to change your search criteria.</p>
        </Message>
      );
    }

    return <IncidentList incidents={incidents} />;
  };

  render() {
    const { occurred_after, occurred_before, query, proximity } = this.state;
    console.log(this.state)

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
            Occurred after:{' '}
            <Calendar
              name="occurred_after"
              selectedDay={occurred_after}
              onSelect={this.handleUpdateFilter}
            />
          </div>
          <div>
            Occurred before:{' '}
            <Calendar
              name="occurred_before"
              selectedDay={occurred_before}
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
