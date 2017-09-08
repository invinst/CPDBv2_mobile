import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import constants from 'constants';
import NavbarContainer from 'containers/NavbarContainer';
import ComplaintPage from 'components/ComplaintPage';

describe('<ComplaintPage />', function () {

  it('should be renderable', function () {
    const wrapper = shallow(<ComplaintPage />);
    wrapper.should.be.ok();
  });

  it('should set initial coaccused dropdown state & header height', function () {
    const wrapper = shallow(<ComplaintPage />);
    wrapper.instance().state.coaccusedIsExpanded.should.be.false();
    wrapper.instance().state.headerHeight.should.eql(0);
  });

  it('render nothing if complaint is not available yet', function () {
    const wrapper = shallow(<ComplaintPage />);
    should(wrapper.type()).equal(null);
  });

  it('should fetch complaint data if not available yet', function () {
    const spyRequestComplaint = spy();
    const wrapper = shallow(
      <ComplaintPage
        complaintId={ 1 }
        requestComplaint={ spyRequestComplaint }
      />
    );
    wrapper.instance().componentDidMount();
    spyRequestComplaint.calledWith(1).should.be.true();
  });

  it('should render navbar via NavbarContainer', function () {
    const dummyComplaint = {
      coaccused: [{ id: 1 }]
    };
    const wrapper = shallow(
      <ComplaintPage
        complaint={ dummyComplaint }
        coaccusedId={ 1 }
      />
    );

    const navbarContainer = wrapper.find(NavbarContainer);
    navbarContainer.prop('backLink').should.eql(constants.SEARCH_PATH);
  });

});
