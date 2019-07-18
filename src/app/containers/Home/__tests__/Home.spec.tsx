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

describe('<Home />', function() {
  const component = (
    <Provider store={store}>
      <Home />
    </Provider>
  );
  // it('should render without throwing an error', function() {
  //   expect(shallow(<Home />).contains(<h1>List of stolen bikes</h1>)).toBe(true);
  // });

  // it('should be selectable by class "home-container"', function() {
  //   expect(shallow(<Home />).is('.home-container')).toBe(true);
  // });

  // it('should mount in a full DOM', function() {
  //   expect(mount(<Home />).find('.home-container').length).toBe(1);
  // });

  it('should render without throwing an error', () => {
    expect(shallow(component).exists(<h1>List of stolen bikes</h1>));
  });

  it('should mount in a full DOM', function() {
    expect(shallow(component).exists('.search-input'));
  });

  it('should mount in a full DOM', function() {
    expect(shallow(component).exists('.calendar'));
  });

  it('should mount in a full DOM', function() {
    expect(shallow(component).exists(<button>CLEAR FILTERS</button>));
  });

  it('should mount in a full DOM', function() {
    expect(shallow(component).exists('.search-input'));
  });

  it('should mount in a full DOM', function() {
    expect(shallow(component).exists('.incidents-list'));
  });

  // // it('should render to static HTML', function () {
  // //   expect(render(<Home />).text()).toEqual('Bar');
  // // });

  // it('should render to static HTML', function() {
  //   expect(
  //     mount(
  //       <Provider store={store}>
  //         <Home />
  //       </Provider>
  //     )
  //       .find('h1')
  //       .text()
  //   ).toEqual('List of stolen bikes');
  // });
});
