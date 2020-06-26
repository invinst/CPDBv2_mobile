import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import PinboardDataVisualization from 'components/pinboard-page/pinboard-data-visualization';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import AllegationsMap from 'components/common/allegations-map';


describe('PinboardDataVisualization component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    pinboardPage: {
      graphData: { requesting: false, data: {} },
      geographicData: {
        crsRequesting: false,
        trrsRequesting: false,
        mapCrsData: [
          {
            'date': '2006-09-26',
            'crid': '1000018',
            'category': 'Operation/Personnel Violations',
            'coaccused_count': 1,
            'kind': 'CR',
          },
        ],
        mapTrrsData: [
          {
            'trr_id': '123456',
            kind: 'FORCE',
            taser: false,
            'firearm_used': true,
            point: {
              lat: 35.3,
              lon: 50.5,
            },
            date: 'MAY 12, 2015',
          },
        ],
      },
    },
  });

  it('should render social graph', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <PinboardDataVisualization
            pinboard={ { id: '1234abcd' } }
          />
        </MemoryRouter>
      </Provider>
    );

    const horizontalScrolling = wrapper.find('HorizontalScrolling');
    horizontalScrolling.exists().should.be.true();

    const socialGraphWidget = horizontalScrolling.find('Widget').at(0);
    socialGraphWidget.prop('widgetTitle').should.equal('SOCIAL GRAPH');

    socialGraphWidget.find(AnimatedSocialGraph).exists().should.be.true();
  });

  context('hasMapMarker is true', function () {
    it('should render geographic map', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <PinboardDataVisualization
              pinboard={ { id: '1234abcd' } }
              hasMapMarker={ true }
            />
          </MemoryRouter>
        </Provider>
      );

      const horizontalScrolling = wrapper.find('HorizontalScrolling');
      horizontalScrolling.exists().should.be.true();

      const geographicMapWidget = horizontalScrolling.find('Widget').at(1);
      geographicMapWidget.prop('widgetTitle').should.equal('GEOGRAPHIC MAP');

      horizontalScrolling.find(AllegationsMap).exists().should.be.true();
    });
  });

  context('hasMapMarker is false', function () {
    it('should not render geographic map', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <PinboardDataVisualization
              pinboard={ { id: '1234abcd' } }
              hasMapMarker={ false }
            />
          </MemoryRouter>
        </Provider>
      );

      const horizontalScrolling = wrapper.find('HorizontalScrolling');
      horizontalScrolling.exists().should.be.true();

      horizontalScrolling.find(AllegationsMap).exists().should.be.false();
    });
  });
});
