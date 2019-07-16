import styled from 'styled-components';
import { Container, Header, Icon } from 'semantic-ui-react';

export const DetailsContainer = styled(Container)`
  padding: 3rem 1rem 1rem;
  background: #fff;
  box-shadow: 0 1px 2px #ccc;
`;

export const IncidentContent = styled.div``;

export const IncidentMapContainer = styled.div`
  height: 600px;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const IncidentInfo = styled.div`
  margin-bottom: 0.5rem;
  & > i {
    color: ${props => props.theme.primaryColor};
  }
`;

export const IncidentLocation = styled.div``;
export const IncidentDate = styled.div``;
export const IncidentDescription = styled.blockquote`
  margin-inline-start: 24px;
  font-style: italic;
  color: rgba(0, 0, 0, 0.8);
`;

export const IncidentImage = styled.div`
  margin-right: 1rem;
  width: 220px;
  height: 214px;
  flex-grow: 0;
  flex-shrink: 0;
  background-image: ${({
    image
  }: {
  image: string
  }) => `url(${image})`};
  background-color: #fff;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ccc;
`;

export const IncidentTitle = styled(Header)`
  color: ${props => props.theme.primaryColor};
`;

export const IncidentMap = styled.div``;

export const DetailsBox = styled.div`
  display: flex;
`;
