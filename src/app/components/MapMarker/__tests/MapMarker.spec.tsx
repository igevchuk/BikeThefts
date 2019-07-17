import * as React from 'react';
import { shallow, mount, render } from 'enzyme';

import { MapMarker } from './../../MapMarker';

var setUp = (props = {}) => {
  var component = shallow(<MapMarker {...props} />);
  return component;
};

describe('MapMarker Component', () => {
  it('renders without crashing', () => {
    setUp();
  });
});
