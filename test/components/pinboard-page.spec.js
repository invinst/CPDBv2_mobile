import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import PinboardPage from 'components/pinboard-page';


describe('<PinboardPage />', function () {
  it('should dispatch fetchPinboard when mounted', function () {
    const fetchPinboard = spy();
    mount(
      <PinboardPage
        fetchPinboard={ fetchPinboard }
        params={ { pinboardId: 1 } }
      />
    );

    fetchPinboard.calledWith(1).should.be.true();
  });
});
