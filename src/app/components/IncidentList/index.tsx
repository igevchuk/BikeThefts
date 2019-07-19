import * as React from 'react';
import { IncidentListItem } from 'app/components/IncidentListItem';
import { IncidentModel } from 'app/models';

export namespace IncidentList {
  export interface Props {
    incidents: IncidentModel[];
  }
}

export const IncidentList: React.SFC<IncidentList.Props> = (props) => {
  const { incidents } = props;

  return (
    <section className="incident-list" data-test="incident-list-component">
      <ul>
        {incidents.map((incident) => (
          <IncidentListItem incident={incident} key={incident.id} />
        ))}
      </ul>
    </section>
  );
};
