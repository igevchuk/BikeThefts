import * as React from 'react';
import { shallow, mount, render } from 'enzyme';

import { IncidentDetails } from './../../IncidentDetails';

var setUp = (props = {}) => {
  var component = shallow(<IncidentDetails {...props} />);
  return component;
};

describe('IncidentDetails Component', () => {
  it('renders without crashing', () => {
    setUp();
  });
});
