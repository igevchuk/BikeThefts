import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Search } from './../../Search';
import { findBySelector, findByDataAttr } from 'app/testUtils';

const mockStore = configureMockStore();
const store = mockStore({});

const setup = (props = {}): Enzyme.ShallowWrapper => {
  return shallow(<Search {...props} />);
};

const component = (
  <Provider store={store}>
    <Search />
  </Provider>
);

describe('<Search />', () => {
  test('renders without crashing', () => {
    const component = findBySelector(setup(), `[data-test="search-component"]`);
    expect(component.length).toBe(1);
  });

  test('renders text input', () => {
    const component = setup();
    const input = findByDataAttr(component, 'search-input-component');
    expect(input).toBeTruthy();
  });

  // test('should set value', () => {
  //   const wrapper = mount(<Search />);
  //   wrapper.setState({ value: 'foo' });
  //   expect(wrapper.find('.foo'));
  // });

  // describe('change event', () => {
  //   test('should set the text field value', () => {
  //     let updatedValue = {};
  //     const component = mount(
  //       <Search
  //         onChange={(newValue) => {
  //           updatedValue = newValue;
  //         }}
  //       />
  //     );

  //     component.find('input').simulate('change', {
  //       value: 'bar'
  //     });
  //     expect(updatedValue.value).toEqual('bar');
  //   });
  // });
});
