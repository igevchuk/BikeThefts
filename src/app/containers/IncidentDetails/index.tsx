import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { IncidentActions } from 'app/actions';
import { IncidentModel } from 'app/models';
import { omit } from 'app/utils';
import { Map } from 'app/components/Map';
import {
  IncidentLocation,
  IncidentContent,
  IncidentDate,
  IncidentDescription,
  IncidentImage,
  IncidentTitle,
  IncidentMapContainer
} from './styled';

const BikePlaceholder =  require('./assets/bike-placeholder.png');

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

  fetchData = (): void => {
    const { actions, match: { params }} = this.props;

    if(!params || !params.id) {
      return;
    }
    // // const { id } = match.params;
    actions.fetchIncidentDetails(params.id);
  }

  getImage = (media: any): string => {
   if(!!media && !!media.image_url) {
     return media.image_url;
   }

   return BikePlaceholder;
  }

  render() {
    const { details: { address, description, media, occurred_at, title }} = this.props;

    return (
      <div className='incident-details'>
        <IncidentImage image={this.getImage(media)} fallback={BikePlaceholder} className='incident-image'/>
        <IncidentContent className='incident-content'>
          <IncidentTitle className='incident-title'>{ title }</IncidentTitle>
          <IncidentDate className='incident-date'>Reported: { occurred_at }</IncidentDate>
          <IncidentLocation className='incident-location'>Location: { address }</IncidentLocation>
          <IncidentDescription className='incident-description'>{ description }</IncidentDescription>
        </IncidentContent>
        <IncidentMapContainer className='incident-map-container'>
          <Map className='incident-map'>Map</Map>
        </IncidentMapContainer>
      </div>
    );
  }
}

