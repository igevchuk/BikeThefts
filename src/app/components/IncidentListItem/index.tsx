import * as React from 'react';
import * as moment from 'moment';
import { IncidentModel } from 'app/models';
import {
  IncidentContainer,
  IncidentImage,
  IncidentContent,
  IncidentTitle,
  IncidentLink,
  IncidentInfo
} from './styled'

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

  const formatDate = (value: Date, format: string = 'LLL') => {
    return moment(value).format(format);
  }

  return (
    <IncidentContainer className='incident'>
      <IncidentImage
        className='incident-image'
        image={image_url_thumb || BikePlaceholder}
        fallback={BikePlaceholder}
      />

      <IncidentContent className='incident-content'>
        <IncidentTitle className='incident-title'>
          <IncidentLink className='incident-link' href={`/incidents/${id}`}>{title}</IncidentLink>
        </IncidentTitle>

        <IncidentInfo className='incident-info'>
          <b>Stolen:</b> {formatDate(occurred_at)}
        </IncidentInfo>

        <IncidentInfo className='incident-info'>
          <b>Reported:</b> {formatDate(updated_at)}
        </IncidentInfo>

        <IncidentInfo className='incident-info'>
          <b>Location:</b> {address}
        </IncidentInfo>
      </IncidentContent>
    </IncidentContainer>
  );
}
