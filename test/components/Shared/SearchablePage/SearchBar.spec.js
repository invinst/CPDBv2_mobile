import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import SearchBar from 'components/Shared/SearchablePage/SearchBar';


describe('SearchBar component', function () {
  it('should be renderable', function () {
    let wrapper = shallow(<SearchBar />);
    wrapper.should.be.ok();
  });

  it('should call inputChanged on change input', function () {
    const inputChangedSpy = spy();
    const suggestTermSpy = spy();

    const wrapper = shallow(<SearchBar inputChanged={ inputChangedSpy } suggestTerm={ suggestTermSpy }/>);
    wrapper.find('input').simulate('change', { currentTarget: { value: 'something' } });

    inputChangedSpy.calledWith('something').should.be.true();
    suggestTermSpy.calledWith({ query: 'something' }).should.be.true();
  });

  it('should call focus on input focus', function () {
    const focusSpy = spy();

    const wrapper = shallow(<SearchBar focus={ focusSpy }/>);
    wrapper.find('input').simulate('focus');

    focusSpy.called.should.be.true();
  });

  it('should call blur on input blur and have no query', function () {
    const blurSpy = spy();

    const wrapper = shallow(<SearchBar blur={ blurSpy } query=''/>);
    wrapper.find('input').simulate('blur');

    blurSpy.called.should.be.true();
  });

  it('should not call blur on input blur and have query', function () {
    const blurSpy = spy();

    const wrapper = shallow(<SearchBar blur={ blurSpy } query='query'/>);
    wrapper.find('input').simulate('blur');

    blurSpy.called.should.be.false();
  });

  it('should call clear on search icon click', function () {
    const clearSpy = spy();

    const wrapper = shallow(<SearchBar clear={ clearSpy }/>);
    wrapper.find('.search-icon').simulate('click');

    clearSpy.called.should.be.true();
  });
});
