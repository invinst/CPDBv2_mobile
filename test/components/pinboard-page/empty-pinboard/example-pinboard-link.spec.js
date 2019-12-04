import React from 'react';
import Truncate from 'react-truncate';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import ExamplePinboardLink from 'components/pinboard-page/empty-pinboard/example-pinboard-link';
import styles from 'components/pinboard-page/empty-pinboard/example-pinboard-link.sass';


describe('ExamplePinboardLink component', function () {
  it('should have enough contents', function () {
    const updatePinboardFromSourceStub = stub();
    const wrapper = mount(
      <ExamplePinboardLink
        id='66ef1561'
        title='Pinboard 1'
        description='Description 1'
        currentPinboardId='abcd1234'
        updatePinboardFromSource={ updatePinboardFromSourceStub }
      />
    );

    const link = wrapper.find('a');

    link.prop('className').should.equal(styles.examplePinboardLink);
    link.find('.title').text().should.equal('Pinboard 1');

    const description = wrapper.find(Truncate);
    description.prop('className').should.equal('description');
    description.prop('lines').should.equal(3);
    description.prop('children').should.equal('Description 1');

    link.find('.arrow').exists().should.be.true();

    link.simulate('click');
    updatePinboardFromSourceStub.should.be.calledWith('abcd1234', '66ef1561');
  });
});
