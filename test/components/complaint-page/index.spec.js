import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import should from 'should';
import configureStore from 'redux-mock-store';

import ComplaintPage from 'components/complaint-page';
import Footer from 'components/footer';
import WithHeader from 'components/shared/with-header';

describe('ComplaintPage component', function () {
  it('should render if there is complaint', function () {
    const wrapper = shallow(
      <ComplaintPage complaint={ { category: 'Use of force' } }/>
    );
    wrapper.should.be.ok();

    const withHeader = wrapper.find(WithHeader);
    withHeader.find('.complaint-page-body').exists().should.be.true();
    withHeader.find(Footer).exists().should.be.true();
  });

  it('should not render if there is no complaint', function () {
    const wrapper = shallow(
      <ComplaintPage />
    );
    should(wrapper.type()).equal(null);
  });

  it('should call requestComplaint when component mounted', function () {
    const requestComplaintSpy = spy();
    const store = configureStore()({
      breadcrumb: {
        breadcrumbs: [],
      },
      complaintPage: {
        attachmentRequest: {
          message: '',
          subscribedCRIds: {},
        },
        complaints: {
          '123': {},
        },
      },
    });

    mount(
      <Provider store={ store }>
        <ComplaintPage requestComplaint={ requestComplaintSpy } complaint={ {} }/>
      </Provider>
    );
    requestComplaintSpy.called.should.be.false();

    requestComplaintSpy.resetHistory();

    mount(
      <Provider store={ store }>
        <ComplaintPage
          requestComplaint={ requestComplaintSpy }
          complaint={ null }
          complaintId='123'
        />
      </Provider>
    );
    requestComplaintSpy.calledWith('123').should.be.true();
  });

  it('should render complaint title', function () {
    const wrapper = shallow(
      <ComplaintPage complaint={ { category: 'Use of force' } } complaintId={ 'C123456' }/>
    );

    wrapper.find('title').text().should.equal('CR C123456');
  });
});
