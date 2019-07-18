import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';

import Hello from '../Hello';

// it('renders the heading', () => {
//   const result = shallow(<Hello />).contains(<h1>Hello!</h1>);
//   expect(result).toBeTruthy();
// });

const Foo = () => <div>Foo</div>;
// const MyComponent = () => (<div>
//   My Component
// </div>);

// const MyComponent: any = () => {
//   return <div />;
// }

// function setup(content) {
//   return <MyComponent>{ content }</MyComponent>
// }

describe('<Hello />', () => {
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<Hello/>);
    expect(wrapper.find('h1').text()).toBe('Hello!');
  });

  it('renders an `.icon-star`', () => {
    const wrapper = shallow((<Hello><span className="icon-star" /></Hello>));
    expect(wrapper.find('.icon-star')).toHaveLength(1);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <Hello>
        <div className="unique" />
      </Hello>
    ));
    expect(wrapper.find(<div className="unique" />)).toHaveLength(1);
  });

  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick).toHaveProperty('callCount', 1);
  // });
});


