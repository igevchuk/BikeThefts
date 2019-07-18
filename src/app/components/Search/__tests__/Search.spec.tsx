import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Search } from './../../Search';

const mockStore = configureMockStore();
const store = mockStore({});

function setUp(props = {}) {
  return shallow(<Search />);
}

const component = (
  <Provider store={store}>
    <Search />
  </Provider>
);

describe('<Search />', () => {
  it('should be selectable by class "search-input"', () => {
    expect(shallow(component).hasClass('search-input'));
  });

  it('should render input', () => {
    expect(shallow(component).exists('input'));
  });

  it('should set value', () => {
    const wrapper = mount(<Search />);
    wrapper.setState({ value: 'foo' });
    expect(wrapper.find('.foo'));
  });

  describe('change event', () => {
    it('should set the text field value', () => {
      let updatedValue = {};
      const component = mount(
        <Search
          onChange={(newValue) => {
            updatedValue = newValue;
          }}
        />
      );

      component.find('input').simulate('change', {
        value: 'bar'
      });
      expect(updatedValue.value).toEqual('bar');
    });
  });
});
