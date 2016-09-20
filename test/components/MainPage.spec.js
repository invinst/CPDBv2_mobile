import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import MainPage from 'components/MainPage';
import MainPageContent from 'components/MainPage/MainPageContent';

import { spy } from 'sinon';


const mockStore = configureStore();
const store = mockStore({
  suggestionApp: {
    query: 'query'
  }
});

describe('MainPage component', function () {
  it('should render', function () {
    let wrapper = shallow(<MainPage />);
    wrapper.should.be.ok();
  });

  it('should render MainPageContent as subcomponents', function () {
    let wrapper = shallow(<MainPage />);
    wrapper.find(MainPageContent).should.have.length(1);
  });

  it('should call the api if the term is specified', function () {
    const suggestTerm = spy();
    mount(
      <Provider store={ store }>
        <MainPage suggestTerm={ suggestTerm } query='something not empty' />
      </Provider>
    );
    suggestTerm.called.should.be.true();
  });

  it('should not call the api if the term is specified', function () {
    const suggestTerm = spy();
    mount(
      <Provider store={ store }>
        <MainPage suggestTerm={ suggestTerm } query='' />
      </Provider>
    );
    suggestTerm.called.should.be.false();
  });
});
