import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import configureStore from 'redux-mock-store';

import ComplaintPage from 'components/complaint-page';
import Footer from 'components/footer';
import WithHeader from 'components/shared/with-header';

describe('ComplaintPage component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(
      <ComplaintPage />
    );
    wrapper.should.be.ok();

    const withHeader = wrapper.find(WithHeader);
    withHeader.find('.complaint-page-body').should.have.length(0);
    withHeader.find(Footer).exists.should.be.ok();
  });

  it('should render complaint page if there is complaint data', function () {
    const wrapper = shallow(
      <ComplaintPage complaint={ {} } />
    );

    wrapper.find('.complaint-page-body').should.have.length(1);
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
});
