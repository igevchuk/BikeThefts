import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { IncidentModel } from 'app/models';
import { findByDataAttr } from 'app/testUtils';
import { Home } from './../../Home';

const mockStore = configureMockStore();
const store = mockStore({});

const setup = (props: {} = {}, state: any = {}): ShallowWrapper => {
  const setupProps = {
    incidents: [] as IncidentModel[],
    ...props
  };
  const wrapper = shallow(<Home {...setupProps} />);

  if (state) {
    wrapper.setState(state);
  }

  return wrapper;
};

// describe('<Home />', () => {
//   const wrapper = shallow(<Home />);

//   it('renders without crashing', () => {
//     setUp();
//   });

//   it('h1 matches text', () => {
//     expect(wrapper.find('h1')).toHaveLength(1);
//   });
// });

// const component = (
//   <Provider store={store}>
//     <Home />
//   </Provider>
// );

describe('<Home />', () => {
  it('should be selectable by class "home-container"', () => {
    expect(setup().hasClass('home-container'));
  });

  it('should render heading', () => {
    expect(setup().exists(<h1>List of stolen bikes</h1>));
  });

  it('should render search text field', () => {
    expect(setup().exists('.search-input'));
  });

  it('should render date picker', () => {
    expect(setup().exists('.calendar'));
  });

  it('should render Clear filters button', () => {
    expect(setup().exists(<button>CLEAR FILTERS</button>));
  });

  it('should render incidents list', () => {
    expect(setup().exists('.incidents-list'));
  });

  describe('Message component', () => {
    const wrapper = setup({ incidents: [] });
    const message = findByDataAttr(wrapper, 'message-component');
    test('renders message when result is empty', () => {
      expect(message.length).toBe(1);
    });

    test('message displays text', () => {
      expect(message.text()).toContain('No result found');
    });
  });

  test('initial query state is an empty string', () => {
    const wrapper = setup();
    const initialQueryState = wrapper.state('query');
    expect(initialQueryState).toBe('');
  });

  test('initial proximity state contains `Kyiv, Ukraine`', () => {
    const wrapper = setup();
    const inititalProximityState = wrapper.state('proximity');
    expect(inititalProximityState).toContain('Kyiv, Ukraine');
  });
});
