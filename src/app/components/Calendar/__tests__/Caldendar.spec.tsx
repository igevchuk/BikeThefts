import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByDataAttr } from 'app/testUtils';
import { Calendar } from './../../Calendar';

const setup = (props = {}): ShallowWrapper => {
  return shallow(<Calendar {...props} />);
};

describe('<Calendar />', () => {
  const wrapper = setup();

  test('renders without crashing', () => {
    const component = findByDataAttr(wrapper, 'datepicker-component');
    expect(component.length).toBe(1);
  });
});
