import * as React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { IncidentList } from './../../IncidentList';
import { IncidentModel } from 'app/models';
import { findByDataAttr, findBySelector } from 'app/testUtils';

const setup = (props: IncidentList.Props = {}): ShallowWrapper => {
  return shallow(<IncidentList {...props} />);
};

describe('<IncidentList />', () => {
  const props = {
    incidents: [] as IncidentModel[]
  };

  test('renders without crashing', () => {
    const wrapper = setup({ ...props });
    const component = findByDataAttr(wrapper, 'incident-list-component');
    expect(component.length).toBe(1);
  });

  describe('if there are no incidents', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = mount(<IncidentList {...props} />);
    });

    test('renders 0 list items when incidents length is 0', () => {
      const list = findByDataAttr(wrapper, 'incident-list-component');
      const listItems = findBySelector(list, 'li');
      expect(listItems.length).toBe(0);
    });
  });

  describe('if there are incidents', () => {
    let wrapper: ReactWrapper;
    const incidents = [
      {
        address: '1737 Bay St Se Washington 20003, United States',
        description: 'Red and white bike abandoned next to light post',
        id: 103917,
        media: { image_url: null, image_url_thumb: null },
        occurred_at: 1563718769,
        title: 'Abandoned Bicycle'
      },
      {
        address: '1737 Bay St Se Washington 20003, United States',
        description: 'Red and white bike abandoned next to light post',
        id: 103918,
        media: { image_url: null, image_url_thumb: null },
        occurred_at: 1563718769,
        title: 'Abandoned Bicycle'
      }
    ];

    beforeEach(() => {
      wrapper = mount(<IncidentList incidents={incidents} />);
    });

    test('renders N list items when incidents length is N', () => {
      const list = findByDataAttr(wrapper, 'incident-list-component');
      const listItems = findBySelector(list, 'li');
      expect(listItems.length).toBe(incidents.length);
    });
  });
});
