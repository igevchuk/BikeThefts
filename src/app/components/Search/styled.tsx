import styled from 'styled-components';

export const Search = styled.div`
  margin-bottom: 1rem;
  && input {
    border-radius: 0;
  }
  && input:focus {
    border-color: ${props => props.theme.primaryColor};
  }
`;
