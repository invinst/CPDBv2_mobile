import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';
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

    const wrapper = shallow(
      <OfficerSearchResult
        officer={ officer }
        saveToRecent={ spySaveToRecent }
      />
    );

    const officerElement = wrapper.find('a[href="/officer/1"]');
    officerElement.exists().should.be.true();
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
