import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { findByDataAttr } from 'app/testUtils';
import { formatDate } from 'app/utils';
import { IncidentModel } from 'app/models/IncidentModel';
import { IncidentListItem } from './../../IncidentListItem';

const mockStore = configureMockStore();

const defaultProps: IncidentModel = {
  incident: {
    title: 'Incident List Item Title',
    media: { image_url_thumb: '' },
    occurred_at: 5166178,
    address: 'Incident List Item address',
    id: 1
  }
};

const setup = (props = {}): ShallowWrapper => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<IncidentListItem {...setupProps} />);
};

describe('<IncidentListItem />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  test('renders image holder', () => {
    const imageHolder = findByDataAttr(wrapper, 'incident-component-image');
    expect(imageHolder.length).toBe(1);
  });

  test('renders title', () => {
    const title = findByDataAttr(wrapper, 'incident-component-title');
    expect(title.length).toBe(1);
  });

  test('renders title text', () => {
    const title = findByDataAttr(wrapper, 'incident-component-title');
    expect(title.text()).toEqual(defaultProps.incident.title);
  });

  test('renders date', () => {
    const dateComponent = findByDataAttr(wrapper, 'incident-component-date');
    expect(dateComponent.length).toBe(1);
  });

  test('renders date value', () => {
    const dateComponent = findByDataAttr(wrapper, 'incident-component-date');
    const formattedDate = formatDate(defaultProps.incident.occurred_at);
    expect(dateComponent.text()).toContain(formattedDate);
  });

  test('renders address', () => {
    const addressComponent = findByDataAttr(wrapper, 'incident-component-address');
    expect(addressComponent.length).toBe(1);
  });

  test('renders address value', () => {
    const addressComponent = findByDataAttr(wrapper, 'incident-component-address');
    expect(addressComponent.text()).toContain(defaultProps.incident.address);
  });

  test('renders link', () => {
    const link = findByDataAttr(wrapper, 'incident-component-link');
    expect(link.length).toBe(1);
  });

  test('link contains incident id', () => {
    const link = findByDataAttr(wrapper, 'incident-component-link');
    expect(link.prop('href')).toContain(defaultProps.incident.id);
  });
});
