import * as React from 'react';
import { shallow } from 'enzyme';

import { IncidentListItem } from './../../IncidentListItem';

var setUp = (props = {}) => {
  var component = shallow(<IncidentListItem {...props} />);
  return component;
};

describe('<IncidentListItem />', () => {
  it('renders without crashing', () => {
    setUp();
  });
});
