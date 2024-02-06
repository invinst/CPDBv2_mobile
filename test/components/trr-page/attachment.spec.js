import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import Attachment from 'components/trr-page/attachment';
import RequestDocumentButton from 'components/common/request-document/request-document-button';


describe('<Attachment />', function () {

  it('should render enough contents', function () {
    const wrapper = shallow(<Attachment trrId={ 123 }/>);

    wrapper.find('.title').text().should.containEql('There are no documents that have been made public yet.');
  });
});
