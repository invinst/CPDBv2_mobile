import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import TRRPage from 'components/trr-page';
import Footer from 'components/footer';
import WithHeader from 'components/shared/with-header';


describe('<TRRPage />', function () {

  it('should be render enough contents', function () {
    const spyRequestTRR = spy();
    const trr = {
      category: 'Other',
      officer: { officerId: 123 },
      info: { victimDemographic: 'Black, Male, 27 years old' },
    };

    const wrapper = shallow(<TRRPage trrId={ 1 } requestTRR={ spyRequestTRR } trr={ trr }/>);
    const withHeader = wrapper.find(WithHeader);

    withHeader.find('Officer').prop('officerId').should.equal(123);
    withHeader.find('Info').prop('victimDemographic').should.equal('Black, Male, 27 years old');
    withHeader.find('Info').prop('trrId').should.equal(1);
    withHeader.find('.trr-header').text().should.equal('Other');
    withHeader.find(Footer).exists().should.be.true();
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
