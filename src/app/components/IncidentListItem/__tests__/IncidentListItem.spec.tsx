import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { findByDataAttr } from 'app/testUtils';
import { IncidentModel } from 'app/models/IncidentModel';
import { IncidentListItem } from './../../IncidentListItem';

const mockStore = configureMockStore();
const store = mockStore({});

const setup = (props = {}): ShallowWrapper => {
  return shallow(<IncidentListItem {...props} />);
};

describe('<IncidentListItem />', () => {
  const props: IncidentModel = {
    incident: {
      title: 'Incident List Item Title',
      media: { image_url_thumb: '' },
      occurred_at: 5166178,
      address: 'Incident List Item address',
      id: 1
    }
  };
  const wrapper = findByDataAttr(setup(props), 'incident-component');

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

  test('renders date', () => {
    const dateComponent = findByDataAttr(wrapper, 'incident-component-date');
    expect(dateComponent.length).toBe(1);
  });

  test('renders address', () => {
    const addressComponent = findByDataAttr(wrapper, 'incident-component-address');
    expect(addressComponent.length).toBe(1);
  });

  test('renders link', () => {
    const link = findByDataAttr(wrapper, 'incident-component-link');
    expect(link.length).toBe(1);
  });
});
