import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { IncidentList } from './../../IncidentList';
import { IncidentModel } from 'app/models';
import { findByDataAttr } from 'app/testUtils';

const setup = (props = {}): ShallowWrapper => {
  return shallow(<IncidentList {...props} />);
};

describe('<IncidentList />', () => {
  const props = [] as IncidentModel[];
  const wrapper = setup(props);

  test('renders without crashing', () => {
    const list = findByDataAttr(wrapper, 'incident-list-component');
    expect(list.length).toBe(1);
  });
});
