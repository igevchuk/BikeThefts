import styled from 'styled-components';
import { Container, Button } from 'semantic-ui-react';

export const HomeContainer = styled(Container)`
  padding: 3rem 1rem 1rem;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 2rem;
`;

export const Counter = styled.div`
  margin: 0 1rem;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
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
