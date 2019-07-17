import styled from 'styled-components';

export const StyledMarker = styled.div`
  width: 32px;
  height: 32px;
  background-image: ${({ icon }: { icon: string }) => `url(${icon})`};
  background-size: contain;
`;
