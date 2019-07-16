import * as React from 'react'

import { StyledMarker } from './styled'
const icon = require('./assets/icon-marker.png');

type Props = {
  lat: number
  lng: number
  text: string
}

export const MapMarker = (props: Props) => <StyledMarker icon={icon} />
