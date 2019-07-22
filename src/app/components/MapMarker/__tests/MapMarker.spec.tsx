import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByDataAttr } from 'app/testUtils';

import { MapMarker } from './../../MapMarker';

const setup = (props = {}): ShallowWrapper => {
  return shallow(<MapMarker {...props} />);
};

describe('<MapMarker />', () => {
  test('renders without crashing', () => {
    const component = setup();
    expect(component.length).toBe(1);
  });
});
