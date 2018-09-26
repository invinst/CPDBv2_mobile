import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import NewDocumentAllegations from 'components/landing-page/new-document-allegations';

describe('<NewDocumentAllegations />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<NewDocumentAllegations />);
    wrapper.should.be.ok();
  });

  it('should call requestNewDocumentAllegations', () => {
    const requestNewDocumentAllegationsSpy = spy();
    mount(
      <NewDocumentAllegations
        requestNewDocumentAllegations={ requestNewDocumentAllegationsSpy }
        newDocumentAllegations={ [1] }
      />
    );
    requestNewDocumentAllegationsSpy.called.should.be.false();

    requestNewDocumentAllegationsSpy.resetHistory();
    mount(
      <NewDocumentAllegations
        requestNewDocumentAllegations={ requestNewDocumentAllegationsSpy }
      />
    );
    requestNewDocumentAllegationsSpy.called.should.be.true();
  });
});
