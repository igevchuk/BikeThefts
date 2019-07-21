import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Loader } from './../../Loader';
import { findByDataAttr } from 'app/testUtils';

const setup = (props: Loader.Props = {}): ShallowWrapper => {
  return shallow(<Loader {...props} />)
}

describe('<Loader />', () => {
  let wrapper;

   beforeEach(() => {
     wrapper = setup();
   });

  test('renders without crushing', () => {

  });

  test('renders spinner', () => {
    const spinner = findByDataAttr(wrapper, 'loader-component');
    expect(spinner.length).toBe(1);
  });
})
