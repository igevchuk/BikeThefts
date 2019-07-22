import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { IncidentModel } from 'app/models';
import { findByDataAttr, storeFactory } from 'app/testUtils';
import { Home } from './../../Home';

const mockStore = configureMockStore();

const setup = (state: any = {}): ShallowWrapper => {
  // const store = storeFactory(state);
  const store = mockStore({});
  const wrapper = shallow(
    <Provider store={store}>
      <Home />
    </Provider>
  ).dive();

  // if (state) {
  //   wrapper.setState(state);
  // }

  return wrapper;
};

describe('<Home />', () => {
  test('renders without crashing', () => {
    const wrapper = setup();
    wrapper.debug();
    const component = findByDataAttr(wrapper, 'home-component');
    expect(component.length).toBe(1);
  });

  test('renders heading', () => {
    const wrapper = setup();
    const heading = findByDataAttr(wrapper, 'heading-component');
    expect(heading.length).toBe(1);
  });

  test('renders filters', () => {
    const wrapper = setup();
    const filters = findByDataAttr(wrapper, 'filters-component');
    expect(filters.length).toBe(1);
  });

  test('renders query text input', () => {
    const wrapper = setup();
    const query = findByDataAttr(wrapper, 'search-query-component');
    expect(query.length).toBe(1);
  });

  test('renders location text input', () => {
    const wrapper = setup();
    const location = findByDataAttr(wrapper, 'search-location-component');
    expect(location.length).toBe(1);
  });

  test('renders datepicker to pick occured_after date', () => {
    const wrapper = setup();
    const datepicker = findByDataAttr(wrapper, 'calendar-occured-after-component');
    expect(datepicker.length).toBe(1);
  });

  test('renders datepicker to pick occured_before date', () => {
    const wrapper = setup();
    const datepicker = findByDataAttr(wrapper, 'calendar-occured-before-component');
    expect(datepicker.length).toBe(1);
  });

  test('renders clear button', () => {
    const wrapper = setup();
    const button = findByDataAttr(wrapper, 'reset-filters-button');
    expect(button.length).toBe(1);
  });

  // it('should render search text field', () => {
  //   expect(setup().exists('.search-input'));
  // });

  // it('should render date picker', () => {
  //   expect(setup().exists('.calendar'));
  // });

  // it('should render Clear filters button', () => {
  //   expect(setup().exists(<button>CLEAR FILTERS</button>));
  // });

  // it('should render incidents list', () => {
  //   expect(setup().exists('.incidents-list'));
  // });

  // describe('Message component', () => {
  //   const wrapper = setup({ incidents: [] });
  //   const message = findByDataAttr(wrapper, 'message-component');
  //   test('renders message when result is empty', () => {
  //     expect(message.length).toBe(1);
  //   });

  //   test('message displays text', () => {
  //     expect(message.text()).toContain('No result found');
  //   });
  // });

  // test('initial query state is an empty string', () => {
  //   const wrapper = setup();
  //   const initialQueryState = wrapper.state('query');
  //   expect(initialQueryState).toBe('');
  // });

  // test('initial proximity state contains `Kyiv, Ukraine`', () => {
  //   const wrapper = setup();
  //   const inititalProximityState = wrapper.state('proximity');
  //   expect(inititalProximityState).toContain('Kyiv, Ukraine');
  // });
});
