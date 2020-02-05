import sinon from 'sinon';
import * as draftjsUtils from 'utils/draftjs';

import { cmsSelector, hasCMS } from 'selectors/common/cms';

describe('cms selectors', function () {
  it('cmsSelector', function () {
    sinon.stub(draftjsUtils, 'convertContentStateToEditorState').callsFake((args) => args);
    const state = {
      landingPage: {
        cms: [
          {
            name: 'title_field',
            value: 'title',
          },
          {
            name: 'desc_field',
            value: 'desc',
          },
        ],
      },
    };

    cmsSelector(state, 'landingPage', 'title_field').should.eql('title');
    draftjsUtils.convertContentStateToEditorState.calledWith('title').should.be.true();
  });

  it('hasCMS', function () {
    const state = {
      landingPage: {
        cms: [
          {
            name: 'title_field',
            value: 'title',
          },
          {
            name: 'desc_field',
            value: 'desc',
          },
        ],
      },
    };

    hasCMS(state, 'landingPage').should.be.true();
    hasCMS(state, 'somePage').should.be.false();
  });
});
