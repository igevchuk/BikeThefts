import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Home } from './../../Home';

const mockStore = configureMockStore();
const store = mockStore({});

function setUp(props = {}) {
  return shallow(<Home />);
}

// describe('<Home />', () => {
//   const wrapper = shallow(<Home />);

//   it('renders without crashing', () => {
//     setUp();
//   });

//   it('h1 matches text', () => {
//     expect(wrapper.find('h1')).toHaveLength(1);
//   });
// });

const component = (
  <Provider store={store}>
    <Home />
  </Provider>
);

describe('<Home />', () => {
  it('should be selectable by class "home-container"', () => {
    expect(shallow(component).hasClass('home-container'));
  });

  it('should render heading', () => {
    expect(shallow(component).exists(<h1>List of stolen bikes</h1>));
  });

  it('should render search text field', () => {
    expect(shallow(component).exists('.search-input'));
  });

  it('should render date picker', () => {
    expect(shallow(component).exists('.calendar'));
  });

  it('should render Clear filters button', () => {
    expect(shallow(component).exists(<button>CLEAR FILTERS</button>));
  });

  it('should render incidents list', () => {
    expect(shallow(component).exists('.incidents-list'));
  });
});
