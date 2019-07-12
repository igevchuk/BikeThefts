import * as React from 'react';
import * as classNames from 'classnames';
import { IncidentModel } from 'app/models';
import {
  ItemContainer,
  ImageContainer,
  ContentContainer,
  // StyledLink,
} from './styled'

const BikePlaceholder =  require('./assets/bike-placeholder.png');

// import { TodoActions } from 'app/actions';
// import { TodoTextInput } from '../TodoTextInput';

export namespace IncidentListItem {
  export interface Props {
    incident: IncidentModel;
  }

  export interface State {
    // editing: boolean;
  }
}

export class IncidentListItem extends React.Component<IncidentListItem.Props, IncidentListItem.State> {
  constructor(props: IncidentListItem.Props, context?: any) {
    super(props, context);
    // this.state = { editing: false };
  }

  // handleDoubleClick() {
  //   this.setState({ editing: true });
  // }

  // handleSave(id: number, text: string) {
  //   if (text.length === 0) {
  //     this.props.deleteTodo(id);
  //   } else {
  //     this.props.editTodo({ id, text });
  //   }
  //   this.setState({ editing: false });
  // }

  render() {
    const {incident: {
      title,
      description,
      media: { image_url_thumb },
      occurred_at,
      updated_at,
      address,
      id,
    }} = this.props;

    return (
      <ItemContainer>
        <ImageContainer
          image={image_url_thumb || BikePlaceholder}
          fallback={BikePlaceholder}
        />
        <ContentContainer>
          <h3>
            <a href={`/incidents/${id}`}>{title}</a>
          </h3>
          <div>{description || 'No description'}</div>
          <p>
            {/* {format(new Date(occurred_at * 1000), 'MMMM dd yyyy')} */}
            {' - '}
            {address}
          </p>
          <p>
            {'Reported: '}
            {/* {format(new Date(updated_at * 1000), 'MMMM dd yyyy')} */}
          </p>
        </ContentContainer>
      </ItemContainer>
    );
  }
}
