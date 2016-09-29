import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import MainPage from 'components/MainPage';
import MainPageContentContainer from 'containers/MainPage/MainPageContentContainer';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';

import { spy } from 'sinon';


const mockStore = configureStore([configuredAxiosMiddleware]);
const store = mockStore({
  landingPage: {
    date: '',
    contentText: '',
    contentLink: ''
  },
  suggestionApp: {
    query: 'query'
  }
});

describe('MainPage component', function () {
  it('should render', function () {
    let wrapper = shallow(<MainPage />);
    wrapper.should.be.ok();
  });

  it('should render MainPageContentContainer as subcomponents', function () {
    let wrapper = shallow(<MainPage />);
    wrapper.find(MainPageContentContainer).should.have.length(1);
  });

  it('should call the api if the term is specified', function () {
    const suggestTerm = spy();
    mount(
      <Provider store={ store }>
        <MainPage suggestTerm={ suggestTerm } urlQuery='something not empty' />
      </Provider>
    );
    suggestTerm.called.should.be.true();
  });

  it('should not call the api if the term is specified', function () {
    const suggestTerm = spy();
    mount(
      <Provider store={ store }>
        <MainPage suggestTerm={ suggestTerm } urlQuery='' />
      </Provider>
    );
    suggestTerm.called.should.be.false();
  });
});
