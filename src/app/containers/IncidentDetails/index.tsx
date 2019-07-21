import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';
import { DetailsActions, MapActions } from 'app/actions';
import { DetailsState, MapState } from 'app/reducers';
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

const { connect } = require('react-redux');
const BikePlaceholder = require('./assets/bike-placeholder.png');

export namespace IncidentDetails {
  export interface Props extends RouteComponentProps<any> {
    actions: DetailsActions;
    mapActions: MapActions;
    details: IncidentModel;
    isLoading?: boolean;
    error?: any;
    map: {
      coordinates?: [number, number];
      isLoading?: boolean;
      hasLoaded?: boolean;
      error?: any
    }
  }
  export type mapRequestParams = {
    occurred_at: number;
    title: string;
  };
}

const actions = { ...omit(DetailsActions, 'Type'), ...omit(MapActions, 'Type') };

@connect(
  (state: DetailsState, ownProps) => {
    const { details, isLoading, error } = state;
    return { details, isLoading, error };
  },
  (dispatch: Dispatch): Pick<IncidentDetails.Props, 'actions'> => ({
    actions: bindActionCreators(actions, dispatch)
  })
)

@connect(
  (state: MapState, ownProps) => {
    const { coordinates, isLoading, hasLoaded, error } = state;
    return { map: {
      coordinates,
      isLoading,
      hasLoaded,
      error
    } };
  }
)
export class IncidentDetails extends React.Component<IncidentDetails.Props> {
  componentDidMount() {
    this.fetchIncidentDetails();
  }

  // Load map once incident details fetched
  componentWillReceiveProps(props: IncidentDetails.Props) {
    const {
      map,
      details: { id, occurred_at, title }
    } = props;

    if (!map.hasLoaded && id && occurred_at && title) {
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

    actions.fetchIncidentDetails(params.id);
  };

  loadMap = ({ occurred_at, title }: IncidentDetails.mapRequestParams): void => {
    const { mapActions } = this.props;

    mapActions.getGeoJson({ occurred_at, title });
  };

  getImage = (media: IncidentModel.media): string => {
    if (!media) {
      return BikePlaceholder;
    }
    return media.image_url || BikePlaceholder;
  };

  renderMap = (): React.ReactNode => {
    const { map } = this.props;
    const { coordinates, isLoading, hasLoaded, error } = map;
    const [longitude, latitude] = coordinates;

    if(!longitude || !latitude) {
      return null;
    }

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={11}
        data-test="incident-map"
      >
        <MapMarker lat={latitude} lng={longitude} text="Place of incident" />
      </GoogleMapReact>
    )
  }

  render() {
    const {
      isLoading,
      error,
      details: { address, description, media, occurred_at, title }
    } = this.props;

    return (
      <DetailsContainer className="incident-details" data-test="incident-component">
        <IncidentTitle as="h2" className="incident-title" data-test="incident-title">
          {title}
        </IncidentTitle>

        <DetailsBox className="incident-box">
          <IncidentImage
            image={this.getImage(media)}
            className="incident-image"
            data-test="incident-image"
          />

          <IncidentContent className="incident-content">
            <IncidentInfo className="incident-date" data-test="incident-date">
              <Icon name="calendar alternate outline" /> {formatDate(occurred_at)}
            </IncidentInfo>

            <IncidentInfo className="incident-location" data-test="incident-address">
              <Icon name="map marker alternate" /> {address}
            </IncidentInfo>

            <IncidentInfo>
              <IncidentDescription className="incident-description" data-test="incident-location">
                {description || 'None'}
              </IncidentDescription>
            </IncidentInfo>
          </IncidentContent>
        </DetailsBox>

        <IncidentMapContainer className="incident-map-container" data-test="incident-map-container">
          { this.renderMap() }
        </IncidentMapContainer>
      </DetailsContainer>
    );
  }
}
