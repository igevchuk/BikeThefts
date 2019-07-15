import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { IncidentActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { IncidentModel } from 'app/models';
import { omit } from 'app/utils';
import { Search } from 'app/components/Search';
import { IncidentList } from 'app/components';

export namespace Home {
  export interface Props extends RouteComponentProps<void> {
    incidents: IncidentModel[];
    isLoading: boolean;
    error?: any,
    // incidentState: RootState,
    actions: IncidentActions;
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

export class Home extends React.Component<Home.Props> {
  constructor(props: Home.Props, context?: any) {
    super(props, context);
  }

  componentDidMount(): void {
    this.props.actions.fetchIncidents();
  }

  render() {
    const { incidents, actions } = this.props;

    return (
      <div className='home'>
        <Search onSearch={actions.fetchIncidents} />
        <IncidentList incidents={incidents} />
      </div>
    );
  }
}
