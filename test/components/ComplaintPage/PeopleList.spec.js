import React from 'react';
import { shallow } from 'enzyme';

import PeopleList from 'components/ComplaintPage/PeopleList';

describe('PeopleList component', function () {

  it('should render correctly', function () {
    const people = [
      { content: 'Someone', subcontent: 'male, white' },
      { content: 'Other', subcontent: 'female, yellow' }
    ];

    const wrapper = shallow(
      <PeopleList
        title='A Title'
        people={ people }
      />
    );
    const title = wrapper.find('SectionTitle');
    const peopleObj = wrapper.find('.row');
    const person0 = peopleObj.at(0);
    const person1 = peopleObj.at(1);

    title.prop('title').should.equal('A Title');

    person0.find('.content').text().should.equal('Someone');
    person0.find('.subcontent').text().should.equal('male, white');

    person1.find('.content').text().should.equal('Other');
    person1.find('.subcontent').text().should.equal('female, yellow');
  });

});
