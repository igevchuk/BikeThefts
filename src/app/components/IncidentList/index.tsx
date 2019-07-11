import * as React from 'react';
import * as style from './style.css';
import { IncidentActions } from 'app/actions/incidents';
import { IncidentListItem } from '../IncidentListItem';
import { IncidentModel } from 'app/models/IncidentModel';

export namespace IncidentList {
  export interface Props {
    incidents: IncidentModel[];
    // actions: IncidentActions;
  }
}

export class IncidentList extends React.Component<IncidentList.Props> {
  render() {
    const { incidents } = this.props;

    return (
      <section className='incident-list'>
        <ul className={style.normal}>
          {incidents.map(incident => (
            <IncidentListItem {...incident} key={incident.id} />
          ))}
        </ul>
      </section>
    );
  }
}
