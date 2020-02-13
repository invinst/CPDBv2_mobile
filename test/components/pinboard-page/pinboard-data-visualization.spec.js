import React from 'react';
import { mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import PinboardDataVisualization from 'components/pinboard-page/pinboard-data-visualization';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import AllegationsMap from 'components/common/allegations-map';
import HorizontalScrolling from 'components/common/horizontal-scrolling';


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

  it('should render pinboard visualization correctly', function () {
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

    wrapper.find(AnimatedSocialGraph).exists().should.be.true();
    wrapper.find(AllegationsMap).exists().should.be.true();
    wrapper.find('.visualization-title').text().should.equal('GRAPHS & MAPS');

    const swiper = wrapper.find(HorizontalScrolling);
    swiper.prop('slideOptions').should.eql({
      slidesOffsetAfter: 0,
    });
  });

  it('should not render AllegationsMap if hasMapMarker is false', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <PinboardDataVisualization
          pinboard={ { id: '1234abcd' } }
          hasMapMarker={ false }
        />
      </Provider>
    );

    wrapper.find(AnimatedSocialGraph).exists().should.be.true();
    wrapper.find(AllegationsMap).exists().should.be.false();
  });
});
