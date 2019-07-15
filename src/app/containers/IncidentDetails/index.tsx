import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { IncidentActions } from 'app/actions';
import { IncidentModel } from 'app/models';
// import * as style from './style.css';
import { omit } from 'app/utils';


export namespace IncidentDetails {
  export interface Props extends RouteComponentProps<any> {
    actions: IncidentActions;
    details: IncidentModel;
    isLoading?: boolean;
    error?: any;
  }
  export interface State {

  }
}


@connect(
  (state: any, ownProps) => {
    const { incidentState } = state;
    const { details, isLoading, error } = incidentState;
    return { details, isLoading, error };
  },
  (dispatch: Dispatch): Pick<IncidentDetails.Props, 'actions'> => ({
    actions: bindActionCreators(omit(IncidentActions, 'Type'), dispatch)
  })
)

export class IncidentDetails extends React.Component<IncidentDetails.Props, IncidentDetails.State> {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { actions, match: { params }} = this.props;

    if(!params || !params.id) {
      return;
    }
    // // const { id } = match.params;
    actions.fetchIncidentDetails(params.id);
  }

  render() {
    const { details } = this.props;

    return (
      <div className='incident-details'>
        Incident Details
      </div>
    );
  }
}

