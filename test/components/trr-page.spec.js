import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import TRRPage from 'components/trr-page';


describe('<TRRPage />', function () {

  it('should be render enough contents', function () {
    const spyRequestTRR = spy();
    const trr = {
      category: 'Other',
      officer: { officerId: 123 },
      info: { victimDemographic: 'Black, Male, 27 years old' },
    };

    const wrapper = shallow(<TRRPage trrId={ 1 } requestTRR={ spyRequestTRR } trr={ trr }/>);

    wrapper.find('Officer').prop('officerId').should.equal(123);
    wrapper.find('Info').prop('victimDemographic').should.equal('Black, Male, 27 years old');
    wrapper.find('.trr-header').text().should.equal('Other');
  });

  it('render nothing if trr is not available yet', function () {
    const wrapper = shallow(<TRRPage/>);
    should(wrapper.type()).equal(null);
  });

  it('should fetch trr data if not available yet', function () {
    const spyRequestTRR = spy();
    const wrapper = shallow(
      <TRRPage
        trrId={ 1 }
        requestTRR={ spyRequestTRR }
      />
    );
    wrapper.instance().componentDidMount();
    spyRequestTRR.calledWith(1).should.be.true();
  });
});
