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
} from './styled'
import { formatDate } from 'app/utils';

const BikePlaceholder =  require('./assets/bike-placeholder.png');


namespace IncidentListItem {
  export interface Props {
    incident: IncidentModel;
  }
}

export const IncidentListItem:React.SFC<IncidentListItem.Props> = ({ incident }) => {
  const {
    title,
    media: { image_url_thumb },
    occurred_at,
    updated_at,
    address,
    id
  } = incident;

  return (
    <IncidentContainer className='incident'>
      <IncidentImage
        className='incident-image'
        image={image_url_thumb || BikePlaceholder}
        fallback={BikePlaceholder}
      />

      <IncidentContent className='incident-content'>
        <IncidentTitle as='h3' className='incident-title'>
          <IncidentLink className='incident-link' href={`/${id}`}>{title}</IncidentLink>
        </IncidentTitle>

        <IncidentInfo className='incident-info'>
          <Icon name='calendar alternate outline'/> {formatDate(occurred_at)}
        </IncidentInfo>

        <IncidentInfo className='incident-info'>
          <Icon name='map marker alternate'/> {address}
        </IncidentInfo>

        <IncidentLink href={`/${id}`}>Details</IncidentLink>
      </IncidentContent>
    </IncidentContainer>
  );
}
