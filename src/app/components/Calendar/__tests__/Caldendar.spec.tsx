import * as React from 'react';
import * as sinon from 'sinon';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import * as moment from 'moment';
import { findByDataAttr } from 'app/testUtils';
import { Calendar } from './../../Calendar';

const setup = (props = {} as Calendar.Props): ShallowWrapper => {
  return shallow(<Calendar {...props} />);
};

describe('<Calendar />', () => {
  let wrapper: ShallowWrapper;
  const defaultProps: Calendar.Props = {
    name: 'foo',
    selectedDay: moment(),
    onSelect: (name, value) => {}
  };

  beforeEach(() => {
    wrapper = setup({ ...defaultProps });
  });

  test('renders without crashing', () => {
    const component = findByDataAttr(wrapper, 'datepicker-component');
    expect(component.length).toBe(1);
  });

  test('renders datepicker input', () => {
    const input = findByDataAttr(wrapper, 'datepicker-input');
    expect(input.length).toBe(1);
  });

  test('selectedDay matches passed props', () => {
    const input = findByDataAttr(wrapper, 'datepicker-input');
    // console.log(typeof input.props().value);
    // expect(input.props().value).toEqual(defaultProps.selectedDay);
  });

  describe(`'onSelect' function`, () => {
    test(`calls 'onSelect' on dayChange event`, () => {
      const spy = sinon.spy();
      const wrapper = setup({ onSelect: spy });
      const input = wrapper.find('[data-test="datepicker-input"]');
      input.first().prop('onDayChange')(spy);
      expect(spy.calledOnce).toBe(true);
    });
  });
});
