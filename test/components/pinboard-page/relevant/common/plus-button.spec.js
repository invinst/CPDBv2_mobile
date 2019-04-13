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
    wrapper.prop('className').should.eql('custom-class-name');

    wrapper.find('.inner-circle').exists().should.be.true();
    wrapper.simulate('click', { preventDefault: () => {} });
    onClickStub.should.be.calledOnce();
  });
});
