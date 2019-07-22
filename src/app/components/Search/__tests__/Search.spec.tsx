import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Search } from './../../Search';
import { findByDataAttr } from 'app/testUtils';

const setup = (props = {}): ShallowWrapper => {
  return shallow(<Search {...props} />);
};

describe('<Search />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without crashing', () => {
    const component = findByDataAttr(wrapper, 'search-component');
    expect(component.length).toBe(1);
  });

  test('renders text input', () => {
    const input = findByDataAttr(wrapper, 'search-input-component');
    expect(input.length).toBe(1);
  });

  describe('renders props', () => {
    test('value props matches input value', () => {
      wrapper = setup({ value: 'foo' });
      const input = findByDataAttr(wrapper, 'search-input-component');
      expect(input.props().value).toEqual('foo');
    });
  });
});
