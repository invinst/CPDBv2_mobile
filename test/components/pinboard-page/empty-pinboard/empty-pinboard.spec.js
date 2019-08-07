import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import EmptyPinboard from 'components/pinboard-page/empty-pinboard';
import ExamplePinboardLink from 'components/pinboard-page/empty-pinboard/example-pinboard-link';
import CMSContent from 'components/common/cms-content';


describe('EmptyPinboard component', function () {
  it('should have enough contents', function () {
    const emptyPinboardTitleStub = stub();
    const emptyPinboardDescriptionStub = stub();

    const examplePinboards = [{
      id: '66ef1561',
      title: 'Pinboard 1',
      description: 'Description 1'
    }, {
      id: '66ef1562',
      title: 'Pinboard 2',
      description: 'Description 2'
    }];

    const wrapper = shallow(
      <EmptyPinboard
        examplePinboards={ examplePinboards }
        emptyPinboardTitle={ emptyPinboardTitleStub }
        emptyPinboardDescription={ emptyPinboardDescriptionStub }
      />
    );

    const cmsContents = wrapper.find(CMSContent);
    cmsContents.at(0).prop('content').should.eql(emptyPinboardTitleStub);
    cmsContents.at(0).prop('className').should.eql('empty-pinboard-title');
    cmsContents.at(1).prop('content').should.eql(emptyPinboardDescriptionStub);
    cmsContents.at(1).prop('className').should.eql('empty-pinboard-description');

    const examplePinboardLinks = wrapper.find(ExamplePinboardLink);
    examplePinboardLinks.should.have.length(2);

    const firstExamplePinboardLinks = examplePinboardLinks.at(0);
    firstExamplePinboardLinks.prop('id').should.equal('66ef1561');
    firstExamplePinboardLinks.prop('title').should.equal('Pinboard 1');
    firstExamplePinboardLinks.prop('description').should.equal('Description 1');

    const secondExamplePinboardLinks = examplePinboardLinks.at(1);
    secondExamplePinboardLinks.prop('id').should.equal('66ef1562');
    secondExamplePinboardLinks.prop('title').should.equal('Pinboard 2');
    secondExamplePinboardLinks.prop('description').should.equal('Description 2');
  });
});
