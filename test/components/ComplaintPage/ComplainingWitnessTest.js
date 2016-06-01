import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import should from 'should';

import f from 'utils/tests/f';
import shouldReact from 'utils/tests/should/React';

import ComplainingWitness from 'components/ComplaintPage/ComplainingWitness.react';


describe('ComplainingWitnessComponent', () => {
  let complainingWitnessNode;

  it('should be renderable', () => {
    ComplainingWitness.should.be.renderable();
  });

  it('should show number of complaining witness', () => {
    const numberOfWiness = 2;
    const witnesses = f.createBatch(numberOfWiness, 'ComplainingWitness');
    complainingWitnessNode = ReactTestUtils.renderIntoDocument(
      <ComplainingWitness complainingWitnesses={ witnesses }/>
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(complainingWitnessNode, 'title-count')
      .textContent.should.containEql(numberOfWiness);
  });

  it('should render complaining witness list', () => {
    const numberOfWiness = 2;
    const witnesses = f.createBatch(numberOfWiness, 'ComplainingWitness');
    complainingWitnessNode = ReactTestUtils.renderIntoDocument(
      <ComplainingWitness complainingWitnesses={ witnesses }/>
    );
    ReactTestUtils.scryRenderedDOMComponentsWithClass(complainingWitnessNode, 'complaining-witness-row')
      .length.should.be.equal(numberOfWiness);
  });

  it('should render nothing when there is no complaining witness', () => {
    complainingWitnessNode = ReactTestUtils.renderIntoDocument(
      <ComplainingWitness />
    );
    complainingWitnessNode.should.renderNothing();
  });

  it('should show information about witness\'s gender, race, age', () => {
    const complainingWitness = f.create('ComplainingWitness', {'gender': 'M', 'race': 'Black', 'age': 40});
    const expectedDescription = 'Male, Black, Age 40';

    complainingWitnessNode = ReactTestUtils.renderIntoDocument(
      <ComplainingWitness complainingWitnesses={ [complainingWitness] }/>
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(complainingWitnessNode, 'complaining-witness-list')
      .textContent.should.containEql(expectedDescription);
  });

  it('should show `Gender unknown` if there is no gender', () => {
    const complainingWitness = f.create('ComplainingWitness', {'gender': ''});

    complainingWitnessNode = ReactTestUtils.renderIntoDocument(
      <ComplainingWitness complainingWitnesses={ [complainingWitness] }/>
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(complainingWitnessNode, 'complaining-witness-list')
      .textContent.should.containEql('Gender unknown');
  });

  it('should show `Age unknown` if there is no age', () => {
    const complainingWitness = f.create('ComplainingWitness', {'age': ''});

    complainingWitnessNode = ReactTestUtils.renderIntoDocument(
      <ComplainingWitness complainingWitnesses={ [complainingWitness] }/>
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(complainingWitnessNode, 'complaining-witness-list')
      .textContent.should.containEql('Age unknown');
  });

  it('should show `Race unknown` if there is no race', () => {
    const complainingWitness = f.create('ComplainingWitness', {'race': ''});

    complainingWitnessNode = ReactTestUtils.renderIntoDocument(
      <ComplainingWitness complainingWitnesses={ [complainingWitness] }/>
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(complainingWitnessNode, 'complaining-witness-list')
      .textContent.should.containEql('Race unknown');
  });

});

