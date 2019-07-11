import * as React from 'react';
import * as classNames from 'classnames';
import { IncidentModel } from 'app/models';
import {
  ItemContainer,
  ImageContainer,
  ContentContainer,
  StyledLink,
} from './styled'
// import { TodoActions } from 'app/actions';
// import { TodoTextInput } from '../TodoTextInput';

export namespace IncidentListItem {
  export interface Props {
    // incident: IncidentModel;
    title: string;
    description: string;
    media: { image_url_thumb: string },
    occurred_at: Date,
    updated_at: string,
    address: string,
    id: number
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
    const {
      title,
      description,
      media: { image_url_thumb },
      occurred_at,
      updated_at,
      address,
      id,
    } = this.props;

    return (
      <ItemContainer>
        <ImageContainer
          image={image_url_thumb || BikePlaceholder}
          fallback={BikePlaceholder}
        />
        <ContentContainer>
          <H3>
            <StyledLink to={`/incidents/${id}`}>{title}</StyledLink>
          </H3>
          <FixedDescription>{description || 'No description'}</FixedDescription>
          <P>
            {format(new Date(occurred_at * 1000), 'MMMM dd yyyy')}
            {' - '}
            {address}
          </P>
          <P>
            {'Reported: '}
            {format(new Date(updated_at * 1000), 'MMMM dd yyyy')}
          </P>
        </ContentContainer>
      </ItemContainer>
    );
  }
}
