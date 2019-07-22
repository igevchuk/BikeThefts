import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { IncidentDetails, actions } from './../../IncidentDetails';
import { findByDataAttr } from 'app/testUtils';
import { GEO_COORDINATES } from 'app/constants';

const setup = (props = {}): ShallowWrapper => {
  const wrapper = shallow(<IncidentDetails {...props} />);
  return wrapper;
};

describe('<IncidentDetails />', () => {
  let wrapper: ShallowWrapper;
  const defaultProps = {
    actions,
    details: {
      address: 'Dresden, 01307, DE',
      description: '',
      id: 103932,
      media: {
        image_url: 'https://files.bikeindex.org/uploads/Pu/170591/large_20190518_112509.jpg'
      },
      occurred_at: 1563742800,
      title: 'Stolen 2017 Orbea Oiz 29(black and green)'
    },
    map: {}
  };

  beforeEach(() => {
    wrapper = setup({ ...defaultProps });
  });

  test('renders without crashing', () => {
    const component = findByDataAttr(wrapper, 'incident-component');
    expect(component.length).toBe(1);
  });

  // test('renders title', () => {
  //   const titleNode = findByDataAttr(wrapper, 'incident-title');
  //   expect(titleNode.length).toBe(1);
  // });

  // test('renders image', () => {
  //   const imageHolder = findByDataAttr(wrapper, 'incident-image');
  //   expect(imageHolder.length).toBe(1);
  // });

  // test('renders date', () => {
  //   const dateNode = findByDataAttr(wrapper, 'incident-date');
  //   expect(dateNode.length).toBe(1);
  // });

  // test('renders address', () => {
  //   const addressNode = findByDataAttr(wrapper, 'incident-location');
  //   expect(addressNode.length).toBe(1);
  // });

  // test('renders description', () => {
  //   const descriptionNode = findByDataAttr(wrapper, 'incident-description');
  //   expect(descriptionNode.length).toBe(1);
  // });

  // test('renders map container', () => {
  //   const mapContainer = findByDataAttr(wrapper, 'incident-map-container');
  //   expect(mapContainer.length).toBe(1);
  // });
});
