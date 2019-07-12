import styled from 'styled-components'

export const IncidentContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px #ccc;
`;

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

export const IncidentContent = styled.div`
  padding: 12px;
`;

export const IncidentTitle = styled.h3``;

export const IncidentLink = styled.a`
  color: ${props => props.theme.primaryColor};
  text-decoration: none;
`;

export const IncidentInfo = styled.div`
  margin-bottom: 0.5rem;
  line-height: 16px;
`;

