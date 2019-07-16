import styled from 'styled-components';

export const IncidentContent = styled.div``;
export const IncidentMapContainer = styled.div``;
export const IncidentLocation = styled.div``;
export const IncidentDate = styled.div``;
export const IncidentDescription = styled.p``;

export const IncidentImage = styled.div`
  width: 220px;
  height: 214px;
  flex-grow: 0;
  flex-shrink: 0;
  background-image: ${({
    image,
    fallback,
  }: {
  image: string
  fallback: string
  }) => `url(${image}), url(${fallback})`};
  background-color: #f5f5f5;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const IncidentTitle = styled.h3``;
export const IncidentMap = styled.div``;
