import * as React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';

import { IncidentDetails } from './../../IncidentDetails';
import { findByDataAttr } from 'app/testUtils';
import { GEO_COORDINATES } from 'app/constants';

var setup = (props = {}): ShallowWrapper => {
  var component = shallow(<IncidentDetails {...props} />);
  return component;
};

describe('IncidentDetails Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without crashing', () => {
    expect(wrapper.length).toBeTruthy();
  });

  describe('Map Component', () => {
    const mapContainer = findByDataAttr(wrapper, 'incident-map-container');

    test('renders map container', () => {
      expect(mapContainer).toBeTruthy();
    });

    test("doesn't render Google maps when coordinates are not available", () => {
      let wrapper = setup({ coordinates: [] });
      let map = findByDataAttr(wrapper, 'incident-map');
      expect(map.length).toBe(0);
    });

    test('renders Google maps when coordinates are defined', () => {
      let wrapper = setup({ coordinates: [...GEO_COORDINATES] });
      let map = findByDataAttr(wrapper, 'incident-map');
      expect(map.length).toBe(1);
    });
  });
});
