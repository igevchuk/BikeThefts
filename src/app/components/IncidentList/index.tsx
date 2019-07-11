import * as React from 'react';
import * as style from './style.css';
import { IncidentActions } from 'app/actions/incidents';
// import { TodoItem } from '../TodoItem';
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
          {incidents.map((incident, index) => (
            <li key={index}>Incident</li>
          ))}
        </ul>
      </section>
    );
  }
}
