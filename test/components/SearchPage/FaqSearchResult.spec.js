import React from 'react';
import { mount } from 'enzyme';
import constants from 'constants';

import FaqSearchResult from 'components/SearchPage/FaqSearchResult';

describe('<FaqSearchResult />', () => {

  it('should render faq correctly', () => {
    const faqs = [
      {
        id: '1',
        question: 'foo'
      },
      {
        id: '2',
        question: 'bar'
      }
    ];

    const fooUrl = `${constants.FAQ_PATH}1/`;
    const barUrl = `${constants.FAQ_PATH}2/`;
    const rows = [
      {
        label: 'foo',
        url: fooUrl,
        onClick: (() => {}).bind(undefined, {
          type: 'FAQ',
          title: 'foo',
          url: fooUrl
        })
      },
      {
        label: 'bar',
        url: barUrl,
        onClick: (() => {}).bind(undefined, {
          type: 'FAQ',
          title: 'bar',
          url: barUrl
        })
      }
    ];

    const wrapper = mount(
      <FaqSearchResult
        items={ faqs }
        saveToRecent={ () => {} }
      />
    );

    const simpleList = wrapper.find('SimpleList');

    simpleList.exists().should.be.true();
    simpleList.prop('rows').should.be.eql(rows);
  });
});
