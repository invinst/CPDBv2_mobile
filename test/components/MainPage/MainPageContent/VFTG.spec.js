import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon, { spy } from 'sinon';
var sinonStubPromise = require('sinon-stub-promise');
import configureStore from 'redux-mock-store';

import VFTG from 'components/MainPage/MainPageContent/VFTG';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';

const mockStore = configureStore([configuredAxiosMiddleware]);
const store = mockStore({
  landingPage: {
    date: '',
    contentText: '',
    contentLink: ''
  },
  suggestionApp: {
    query: 'query'
  }
});

describe('<VFTG />', function () {

  var subscribeEmailSpy;
  var requestLandingPageSpy;

  before(function() {
    sinonStubPromise(sinon);
  });

  beforeEach(function() {
    subscribeEmailSpy = spy();
    requestLandingPageSpy = spy();
  });

  it('should render', function () {
    let wrapper = shallow(<VFTG subscribeEmail={ subscribeEmailSpy } requestLandingPage={ requestLandingPageSpy } />);
    wrapper.should.be.ok();
  });

  it('should be hidden when in top left', function () {
    let wrapper = shallow(<VFTG isSearchFocused={ true } subscribeEmail={ subscribeEmailSpy } requestLandingPage={ requestLandingPageSpy } />);
    wrapper.find('.top-left').should.have.length(1);
  });

  it('should subscribe email when we click on subscribe button with non empty email', function () {
    subscribeEmailSpy = sinon.stub().returnsPromise();
    subscribeEmailSpy.resolves(null);

    const wrapper = mount(<VFTG store={ store } subscribeEmail={ subscribeEmailSpy } requestLandingPage={ requestLandingPageSpy } />);
    const input = wrapper.find('input');
    const subscribeButton = wrapper.find('.btn-subscribe');

    // enter text to input field and click Subscribe, the button changes its text to Subscribed
    input.get(0).value = 'text';
    input.first().simulate('change');
    subscribeButton.simulate('click');

    subscribeButton.text().should.eql('Subscribed');
    subscribeEmailSpy.called.should.be.true();

    // when we edit the the input field again, the text changes its text back to Subscribe
    input.get(0).value = '';
    input.first().simulate('change');

    subscribeButton.text().should.eql('Subscribe');
  });

  it('should enable subscribe button if subscribe email failed', function () {
    subscribeEmailSpy = sinon.stub().returnsPromise();
    subscribeEmailSpy.rejects(null);

    const wrapper = mount(<VFTG store={ store } subscribeEmail={ subscribeEmailSpy } requestLandingPage={ requestLandingPageSpy } />);
    const input = wrapper.find('input');
    const subscribeButton = wrapper.find('.btn-subscribe');

    input.get(0).value = 'text';
    input.first().simulate('change');
    subscribeButton.simulate('click');

    subscribeEmailSpy.called.should.be.true();
    subscribeButton.text().should.eql('Subscribe');
  });

  it('does nothing when we click on subscribe button with empty email', function () {
    const wrapper = mount(<VFTG store={ store } subscribeEmail={ subscribeEmailSpy } requestLandingPage={ requestLandingPageSpy } />);
    const input = wrapper.find('input');
    input.get(0).value = '';
    input.first().simulate('change');
    wrapper.find('.btn-subscribe').simulate('click');

    subscribeEmailSpy.called.should.be.false();
  });
});
