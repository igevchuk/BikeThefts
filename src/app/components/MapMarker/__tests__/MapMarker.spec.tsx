import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByDataAttr } from 'app/testUtils';
import { GEO_COORDINATES } from 'app/constants';

import { MapMarker, Props } from './../../MapMarker';

const setup = (props = {} as Props & { icon: string }): ShallowWrapper => {
  return shallow(<MapMarker {...props} />);
};

describe('<MapMarker />', () => {
  const [longitude, latitude] = GEO_COORDINATES;
  const icon = './assets/fake.png';
  const props = {
    lat: latitude,
    lng: longitude,
    text: 'Incident Location'
  };
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup({ ...props, icon });
  });

  test('renders without crashing', () => {
    const component = findByDataAttr(wrapper, 'map-marker-component');
    expect(component.length).toBe(1);
  });

  test('gets latitude coordinate passed as props', () => {
    const component = findByDataAttr(wrapper, 'map-marker-component');
    expect(component.props().lat).toEqual(props.lat);
  });

  test('gets longitude coordinate passed as props', () => {
    const component = findByDataAttr(wrapper, 'map-marker-component');
    expect(component.props().lng).toEqual(props.lng);
  });

  test('gets text passed as props', () => {
    const component = findByDataAttr(wrapper, 'map-marker-component');
    expect(component.props().text).toEqual(props.text);
  });
});
