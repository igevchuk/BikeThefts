import * as React from 'react';
import { IncidentModel } from 'app/models';
import { Icon } from 'semantic-ui-react';
import {
  IncidentContainer,
  IncidentImage,
  IncidentContent,
  IncidentTitle,
  IncidentLink,
  IncidentInfo
} from './styled';
import { formatDate } from 'app/utils';

const BikePlaceholder = require('./assets/bike-placeholder.png');

namespace IncidentListItem {
  export interface Props {
    incident: IncidentModel;
  }
}

export const IncidentListItem: React.SFC<IncidentListItem.Props> = (props) => {
  const { incident } = props;
  const {
    title,
    media: { image_url_thumb },
    occurred_at,
    address,
    id
  } = incident;

  return (
    <IncidentContainer className="incident" data-test="incident-component">
      <IncidentImage
        className="incident-image"
        image={image_url_thumb || BikePlaceholder}
        fallback={BikePlaceholder}
        data-test="incident-component-image"
      />

      <IncidentContent className="incident-content">
        <IncidentTitle as="h3" className="incident-title" data-test="incident-component-title">
          <IncidentLink className="incident-link" href={`/${id}`}>
            {title}
          </IncidentLink>
        </IncidentTitle>

        <IncidentInfo className="incident-info" data-test="incident-component-date">
          <Icon name="calendar alternate outline" /> {formatDate(occurred_at, 'MMMM Do, YYYY') }
        </IncidentInfo>

        <IncidentInfo className="incident-info" data-test="incident-component-address">
          <Icon name="map marker alternate" /> {address}
        </IncidentInfo>

        <IncidentLink href={`/${id}`} data-test="incident-component-link">
          Details
        </IncidentLink>
      </IncidentContent>
    </IncidentContainer>
  );
};
