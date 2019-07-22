import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByDataAttr } from 'app/testUtils';
import { Loader } from './../../Loader';

const setup = (props: any = {}): ShallowWrapper => {
  return shallow(<Loader {...props} />);
};

describe('<Loader />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without crashing', () => {
    const component = findByDataAttr(wrapper, 'loader-component');
    expect(component.length).toBe(1);
  });

  test('sets passed props', () => {
    wrapper.setProps({ active: false });
    expect(wrapper.props().active).toBe(false);
  });
});
