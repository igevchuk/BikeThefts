import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, render, ShallowWrapper, ReactWrapper } from 'enzyme';
// import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { IncidentModel } from 'app/models';
import { findByDataAttr, storeFactory } from 'app/testUtils';
import { UnconnectedHome } from './../../Home';

const mockStore = configureMockStore();

// const setup = (state: any = {}): ShallowWrapper => {
//   // const store = storeFactory(state);
//   const store = mockStore({});
//   const wrapper = shallow(
//     <Provider store={store}>
//       <Home />
//     </Provider>
//   );

//   // if (state) {
//   //   wrapper.setState(state);
//   // }

//   return wrapper;
// };

const setup = (props = {}) => {
  const wrapper = shallow(<UnconnectedHome {...props} />);
  // const store = storeFactory(state);
  // const context = React.createContext({ ...state });
  // const { Provider } = context;
  // const wrapper = shallow(
  //   <Provider store={store}>
  //     <Home />
  //   </Provider>
  // );
  return wrapper;
};

describe('<Home />', () => {
  let wrapper: ShallowWrapper;
  const defaultProps = {
    incidents: [],
    isLoading: false,
    error: null,
    actions: {
      fetchIncidents: jest.fn()
    }
  };
  const incidents = [
    {
      address: '1737 Bay St Se Washington 20003, United States',
      description: 'Red and white bike abandoned next to light post',
      id: 103917,
      media: { image_url: null, image_url_thumb: null },
      occurred_at: 1563718769,
      title: 'Abandoned Bicycle'
    },
    {
      address: '1737 Bay St Se Washington 20003, United States',
      description: 'Red and white bike abandoned next to light post',
      id: 103918,
      media: { image_url: null, image_url_thumb: null },
      occurred_at: 1563718769,
      title: 'Abandoned Bicycle'
    }
  ];

  beforeEach(() => {
    wrapper = setup({ ...defaultProps });
  });

  test('renders without crashing', () => {
    const component = findByDataAttr(wrapper, 'home-component');
    expect(component.length).toBe(1);
  });

  test('renders heading', () => {
    const heading = findByDataAttr(wrapper, 'heading-component');
    expect(heading.length).toBe(1);
  });

  test('renders filters', () => {
    const filters = findByDataAttr(wrapper, 'filters-component');
    expect(filters.length).toBe(1);
  });

  test('renders query text input', () => {
    const query = findByDataAttr(wrapper, 'search-query-component');
    expect(query.length).toBe(1);
  });

  test('renders location text input', () => {
    const location = findByDataAttr(wrapper, 'search-location-component');
    expect(location.length).toBe(1);
  });

  test('renders datepicker to pick occured_after date', () => {
    const datepicker = findByDataAttr(wrapper, 'calendar-occured-after-component');
    expect(datepicker.length).toBe(1);
  });

  test('renders datepicker to pick occured_before date', () => {
    const datepicker = findByDataAttr(wrapper, 'calendar-occured-before-component');
    expect(datepicker.length).toBe(1);
  });

  test('renders clear button', () => {
    const button = findByDataAttr(wrapper, 'reset-filters-button');
    expect(button.length).toBe(1);
  });

  describe('if there are no incidents', () => {
    test(`doesn't render incidents list`, () => {
      const wrapper = mount(<UnconnectedHome {...defaultProps} />);
      const list = findByDataAttr(wrapper, 'incident-list-component');
      expect(list.length).toBe(0);
    });

    test(`renders 'No results found' message`, () => {
      const wrapper = mount(<UnconnectedHome {...defaultProps} />);
      const message = findByDataAttr(wrapper, 'no-results-message');
      expect(message.first().text()).toContain('No results found');
    });
  });

  describe('if there are incidents', () => {
    const setupProps = { ...defaultProps, incidents };
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = mount(<UnconnectedHome {...setupProps} />);
    });

    test(`renders incidents list`, () => {
      const list = findByDataAttr(wrapper, 'incident-list-component');
      expect(list.length).toBe(1);
    });

    test(`renders incidents counter`, () => {
      const counterNode = findByDataAttr(wrapper, 'counter-message');
      expect(counterNode.first().text()).toContain(`Found: ${setupProps.incidents.length}`);
    });
  });

  describe('there is an error', () => {
    const setupProps = { ...defaultProps, error: true };
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = mount(<UnconnectedHome {...setupProps} />);
    });

    test('renders error message', () => {
      const message = findByDataAttr(wrapper, 'error-message');
      expect(message).toBeTruthy();
    });
  });

  describe('it is loading data', () => {
    const setupProps = { ...defaultProps, isLoading: true };
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = mount(<UnconnectedHome {...setupProps} />);
    });

    test('renders loader', () => {
      const loader = findByDataAttr(wrapper, 'loader-component');
      expect(loader).toBeTruthy();
    });
  });

  describe(`'clearFilters' function`, () => {
    test(`calls 'clearFilters' on click event`, () => {
      const spy = sinon.spy();
      const props = {
        ...defaultProps,
        actions: {
          ...defaultProps.actions,
          fetchIncidents: spy
        }
      };
      const wrapper = mount(<UnconnectedHome {...props} />);
      const submitButton = wrapper.find('[data-test="reset-filters-button"]');
      submitButton.first().simulate('click');
      expect(spy.calledOnce).toBe(true);
      // console.log(123, submitButton.props());
    });
  });
});
