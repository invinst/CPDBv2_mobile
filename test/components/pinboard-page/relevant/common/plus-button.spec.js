import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


describe('<PlusButton />', function () {
  it('should render enough content', function () {
    const onClickStub = spy();
    const wrapper = shallow(
      <PlusButton
        className='custom-class-name'
        onClick={ onClickStub }
      />
    );
    wrapper.prop('className').should.containEql('custom-class-name');

    wrapper.simulate('click', { preventDefault: () => {} });
    onClickStub.should.be.calledOnce();
  });

  it('should have dark mode', function () {
    const onClickStub = spy();
    const wrapper = shallow(
      <PlusButton
        className='custom-class-name'
        onClick={ onClickStub }
        darkMode={ true }
      />
    );
    wrapper.prop('className').should.containEql('dark-mode');
  });
});
