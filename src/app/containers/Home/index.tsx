import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { IncidentsActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { IncidentModel } from 'app/models';
import { omit } from 'app/utils';
import { Message } from 'semantic-ui-react';
import { HomeContainer, Filters, ClearButton, Counter } from './styled';
import { Calendar } from 'app/components/Calendar';
import { Loader } from 'app/components/Loader';
import { Search } from 'app/components/Search';
import { IncidentList } from 'app/components';
import * as moment from 'moment';
import * as _ from 'lodash';
const { connect } = require('react-redux');

export namespace Home {
  export interface Props extends RouteComponentProps<void> {
    incidents: IncidentModel[];
    isLoading: boolean;
    error?: any;
    actions: IncidentsActions;
  }
  export interface State {
    occurred_after: moment.Moment;
    occurred_before: moment.Moment;
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
    occurred_after: moment().subtract(10, 'years'),
    occurred_before: moment(),
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
    this.fetchData(this.normalizeFilters());
  }

  fetchData = (queryOptions: {} = {} as Home.State): void => {
    const { actions } = this.props;

    actions.fetchIncidents({ ...queryOptions });
  };

  clearFilters = (): void => {
    this.setState({ ...this.defaultFilters }, () => {
      this.fetchData(this.normalizeFilters());
    });
  };

  normalizeFilters = (): {} => {
    const copy = { ...this.state };
    const keys = Object.keys(copy);

    keys.forEach((key) => {
      if (moment.isMoment(copy[key])) {
        copy[key] = copy[key].unix();
      }
    });

    return copy;
  };

  handleUpdateFilter = (name: keyof Home.State, value: string | moment.Moment): void => {
    const newState = {
      ...this.state,
      [name]: value
    } as Home.State;
    const debounced: ({}) => void = _.debounce(this.fetchData, 300);

    this.setState(newState, () => {
      debounced(this.normalizeFilters());
    });
  };

  renderContent = (): React.ReactNode => {
    const { incidents, error, isLoading } = this.props;

    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return (
        <Message negative={true} data-test="error-message" style={{ margin: '0 1rem' }}>
          <Message.Header>{error.toString()}</Message.Header>
          <p>Try later.</p>
        </Message>
      );
    } else if (incidents.length === 0) {
      return (
        <Message data-test="success-message" style={{ margin: '0 1rem' }}>
          <Message.Header>No results found.</Message.Header>
          <p>Try to change your search criteria.</p>
        </Message>
      );
    }

    return (
      <div>
        <Counter data-test="counter-message">Found: {incidents.length} results.</Counter>
        <IncidentList incidents={incidents} />
      </div>
    );
  };

  render() {
    const { occurred_after, occurred_before, query, proximity } = this.state;

    return (
      <HomeContainer className="home-container" data-test="home-component">
        <h1 style={{ padding: '0 1rem' }} data-test="heading-component">
          List of stolen bikes
        </h1>
        <Filters data-test="filters-component">
          <Search
            name="query"
            placeholder="Search by description"
            value={query}
            handleSearch={this.handleUpdateFilter}
            data-test="search-query-component"
          />
          <Search
            placeholder="Search by location"
            name="proximity"
            value={proximity}
            handleSearch={this.handleUpdateFilter}
            data-test="search-location-component"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Calendar
                name="occurred_after"
                selectedDay={occurred_after}
                onSelect={this.handleUpdateFilter}
                data-test="calendar-occured-after-component"
              />

              <Calendar
                name="occurred_before"
                selectedDay={occurred_before}
                onSelect={this.handleUpdateFilter}
                data-test="calendar-occured-before-component"
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
          </div>
        </Filters>
        {this.renderContent()}
      </HomeContainer>
    );
  }
}
