import should from 'should';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import OfficerSearchResult from 'components/SearchPage/OfficerSearchResult';

describe('<OfficerSearchResult />', () => {

  it('should render officer correctly', () => {
    const spySaveToRecent = spy();
    const officer = {
      name: 'John',
      url: '/officer/1',
      extraInfo: 'Badge #1'
    };

    const wrapper = mount(
      <OfficerSearchResult
        officer={ officer }
        saveToRecent={ spySaveToRecent }
      />
    );

    const officerElement = wrapper.find('Link');
    officerElement.exists().should.be.true();
    officerElement.prop('to').should.be.eql('/officer/1');
    officerElement.text().should.eql('JohnBadge #1');
  });

  it('should dispatch saveToRecent action on click', () => {
    const spySaveToRecent = spy();
    const officer = {
      name: 'John',
      url: 'http://localhost',
      extraInfo: 'Badge #1'
    };

    const wrapper = shallow(
      <OfficerSearchResult
        officer={ officer }
        saveToRecent={ spySaveToRecent }
      />
    );

    wrapper.simulate('click');
    spySaveToRecent.calledWith({
      type: 'Officer',
      title: 'John',
      url: 'http://localhost'
    }).should.be.true();
  });

});
