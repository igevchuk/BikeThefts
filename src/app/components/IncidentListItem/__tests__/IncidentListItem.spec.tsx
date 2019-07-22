import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByDataAttr } from 'app/testUtils';
import { formatDate } from 'app/utils';
import { IncidentModel } from 'app/models/IncidentModel';
import { IncidentListItem } from './../../IncidentListItem';

const setup = (props = {} as IncidentModel): ShallowWrapper => {
  return shallow(<IncidentListItem {...props} />);
};

describe('<IncidentListItem />', () => {
  let wrapper: ShallowWrapper;

  const props = {
    incident: {
      title: 'Foo',
      media: { image_url_thumb: './assets/fake.png' },
      occurred_at: 1563786757686,
      address: 'Springfield, NY',
      id: 1
    }
  };

  beforeEach(() => {
    wrapper = setup({ ...props });
  });

  test('renders without crashing', () => {
    const component = findByDataAttr(wrapper, 'incident-component');
    expect(component.length).toBe(1);
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

  describe('displays values passed as props', () => {
    const { incident } = props;

    test('displays title props', () => {
      const title = findByDataAttr(wrapper, 'incident-component-title');
      expect(title.text()).toContain(incident.title);
    });

    test('displays background image', () => {
      const imageHolder = findByDataAttr(wrapper, 'incident-component-image');
      expect(imageHolder.props().image).toEqual(incident.media.image_url_thumb);
    });

    test('displays date props', () => {
      const dateComponent = findByDataAttr(wrapper, 'incident-component-date');
      const formattedDate = formatDate(incident.occurred_at, 'MMMM Do, YYYY');
      expect(dateComponent.text()).toContain(formattedDate);
    });

    test('renders address props', () => {
      const addressComponent = findByDataAttr(wrapper, 'incident-component-address');
      expect(addressComponent.text()).toContain(incident.address);
    });

    test('link contains incident id', () => {
      const link = findByDataAttr(wrapper, 'incident-component-link');
      expect(link.prop('href')).toContain(incident.id);
    });
  });
});
