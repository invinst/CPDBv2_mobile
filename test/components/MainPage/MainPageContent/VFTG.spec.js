import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import VFTG from 'components/MainPage/MainPageContent/VFTG';

describe('<VFTG />', function () {
  it('should render', function () {
    let wrapper = shallow(<VFTG />);
    wrapper.should.be.ok();
  });

  it('should be hidden when in top left', function () {
    let wrapper = shallow(<VFTG isSearchFocused={ true } />);
    wrapper.find('.top-left').should.have.length(1);
  });

  it('should subscribe email when we click on subscribe button with non empty email', function () {
    const subscribeEmailSpy = spy();

    const wrapper = mount(<VFTG subscribeEmail={ subscribeEmailSpy } />);
    const input = wrapper.find('input');
    input.get(0).value = 'text';
    input.first().simulate('change');
    wrapper.find('.btn-subscribe').simulate('click');

    subscribeEmailSpy.called.should.be.true();
  });

  it('does nothing when we click on subscribe button with empty email', function () {
    const subscribeEmailSpy = spy();

    const wrapper = mount(<VFTG subscribeEmail={ subscribeEmailSpy } />);
    const input = wrapper.find('input');
    input.get(0).value = '';
    input.first().simulate('change');
    wrapper.find('.btn-subscribe').simulate('click');

    subscribeEmailSpy.called.should.be.false();
  });
});
