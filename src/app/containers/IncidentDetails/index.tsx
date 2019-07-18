import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';
import { IncidentActions } from 'app/actions';
import { IncidentModel } from 'app/models';
import { omit } from 'app/utils';
import { MapMarker } from 'app/components/MapMarker';
import {
  DetailsContainer,
  DetailsBox,
  IncidentInfo,
  IncidentContent,
  IncidentDescription,
  IncidentImage,
  IncidentTitle,
  IncidentMapContainer
} from './styled';
import { GOOGLE_MAPS_API_KEY } from 'app/constants';
import { formatDate } from 'app/utils';

const BikePlaceholder = require('./assets/bike-placeholder.png');
const { connect } = require('react-redux');

export namespace IncidentDetails {
  export interface Props extends RouteComponentProps<any> {
    actions: IncidentActions;
    details: IncidentModel;
    coordinates?: [number, number];
    isLoading?: boolean;
    mapLoaded: boolean;
    error?: any;
  }
  export type mapRequestParams = {
    occurred_at: number;
    title: string;
  };
}

@connect(
  (state: any, ownProps) => {
    const { incidentState } = state;
    const { coordinates, details, isLoading, mapLoaded, error } = incidentState;
    return { coordinates, details, isLoading, mapLoaded, error };
  },
  (dispatch: Dispatch): Pick<IncidentDetails.Props, 'actions'> => ({
    actions: bindActionCreators(omit(IncidentActions, 'Type'), dispatch)
  })
)
export class IncidentDetails extends React.Component<IncidentDetails.Props> {
  componentDidMount() {
    this.fetchIncidentDetails();
  }

  // Load map once incident details fetched
  componentWillReceiveProps(props: IncidentDetails.Props) {
    const {
      mapLoaded,
      details: { id, occurred_at, title }
    } = props;

    if (!mapLoaded && id && occurred_at && title) {
      this.loadMap({ occurred_at, title });
    }
  }

  fetchIncidentDetails = (): void => {
    const {
      actions,
      match: { params }
    } = this.props;

    if (!params || !params.id) {
      return;
    }
    // // const { id } = match.params;
    actions.fetchIncidentDetails(params.id);
  };

  loadMap = ({ occurred_at, title }: IncidentDetails.mapRequestParams): void => {
    const { actions } = this.props;

    actions.getGeoJson({ occurred_at, title });
  };

  getImage = (media: IncidentModel.media): string => {
    if (!media) {
      return BikePlaceholder;
    }
    return media.image_url || BikePlaceholder;
  };

  render() {
    const {
      coordinates,
      details: { address, description, media, occurred_at, title }
    } = this.props;
    let longitude, latitude;

    if (coordinates) {
      [longitude, latitude] = coordinates;
    }

    return (
      <DetailsContainer className="incident-details">
        <IncidentTitle as="h2" className="incident-title">
          {title}
        </IncidentTitle>

        <DetailsBox className="incident-box">
          <IncidentImage image={this.getImage(media)} className="incident-image" />

          <IncidentContent className="incident-content">
            <IncidentInfo className="incident-date">
              <Icon name="calendar alternate outline" /> {formatDate(occurred_at)}
            </IncidentInfo>

            <IncidentInfo className="incident-location">
              <Icon name="map marker alternate" /> {address}
            </IncidentInfo>

            <IncidentInfo>
              <IncidentDescription className="incident-description">
                {description || 'None'}
              </IncidentDescription>
            </IncidentInfo>
          </IncidentContent>
        </DetailsBox>

        <IncidentMapContainer className="incident-map-container">
          {longitude && latitude && (
            <GoogleMapReact
              bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
              defaultCenter={{ lat: latitude, lng: longitude }}
              defaultZoom={11}
            >
              <MapMarker lat={latitude} lng={longitude} text="Place of incident" />
            </GoogleMapReact>
          )}
        </IncidentMapContainer>
      </DetailsContainer>
    );
  }
}
