import styled from 'styled-components';
import { Container, Button } from 'semantic-ui-react';

export const HomeContainer = styled(Container)`
  padding: 3rem 1rem 1rem;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

export const ClearButton = styled(Button)`
  &&, &&:hover {
    background-color: ${props => props.theme.primaryColor};
    border-radius: 0;
    color: #fff;
    font-weight: lighter;
  }
  &&:hover {
    opacity: 0.9;
  }
`;
