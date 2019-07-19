import * as Enzyme from 'enzyme';

export const findBySelector = (
  wrapper: Enzyme.ShallowWrapper,
  selector: string
): Enzyme.ShallowWrapper => {
  return wrapper.find(selector);
};

export const findByDataAttr = (
  wrapper: Enzyme.ShallowWrapper,
  selector: string
): Enzyme.ShallowWrapper => {
  return wrapper.find(`[data-test="${selector}"]`);
};
