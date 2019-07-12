import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { IncidentActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { IncidentModel } from 'app/models';
import { omit } from 'app/utils';
// import { Header, TodoList, Footer } from 'app/components';
import { Search } from 'app/components/Search';
import { IncidentList } from 'app/components';

export namespace Home {
  export interface Props extends RouteComponentProps<void> {
    incidents: RootState.IncidentState;
    actions: IncidentActions;
  }
}

@connect(
  (state: RootState, ownProps): Pick<Home.Props, 'incidents'> => {
    return { incidents: state.incidents };
  },
  (dispatch: Dispatch): Pick<Home.Props, 'actions'> => ({
    actions: bindActionCreators(omit(IncidentActions, 'Type'), dispatch)
  })
)

export class Home extends React.Component<Home.Props> {
  constructor(props: Home.Props, context?: any) {
    super(props, context);
  }

  componentDidMount(): void {
    this.props.actions.fetchIncidents();
  }

  render() {
    const { incidents, actions } = this.props;

    const filteredIncidents = incidents;

    return (
      <div className='home'>
        <Search onSearch={actions.fetchIncidents} />
        <IncidentList incidents={filteredIncidents} />
      </div>
    );
  }
}
