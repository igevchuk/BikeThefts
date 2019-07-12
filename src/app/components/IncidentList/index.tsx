import * as React from 'react';
import * as style from './style.css';
import { IncidentActions } from 'app/actions/incidents';
import { IncidentListItem } from 'app/components/IncidentListItem';
import { IncidentModel } from 'app/models/IncidentModel';

export namespace IncidentList {
  export interface Props {
    // incidents: IncidentModel[];
    // actions: IncidentActions;
    incidents: { incidents: IncidentModel[] }
  }
}

export class IncidentList extends React.Component<IncidentList.Props> {
  render() {
    const { incidents: { incidents } } = this.props;
    console.log(this.props)

    return (
      <section className='incident-list'>
        <ul>
          {incidents.map(incident => (
            <IncidentListItem incident={incident} key={incident.id} />
          ))}
        </ul>
      </section>
    );
  }
}
