import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import cx from 'classnames';

import PinnedType from './pinned-type';
import style from './pinned-section.sass';

const PINNED_ORDER = ['OFFICER', 'CR', 'TRR'];

const TYPE_TITLE_MAP = {
  'OFFICER': 'OFFICERS',
  'CR': 'COMPLAINTS',
  'TRR': 'TACTICAL RESPONSE REPORTS',
};


export default class PinnedSection extends Component {
  render() {
    const { itemsByTypes, removeItemInPinboardPage } = this.props;

    return (
      <div className={ cx(style.wrapper, 'test--pinned-section') }>
        {
          map(PINNED_ORDER, type => (
            itemsByTypes.hasOwnProperty(type) &&
            itemsByTypes[type].length > 0 &&
            <PinnedType
              key={ type } type={ type }
              title={ TYPE_TITLE_MAP[type] }
              items={ itemsByTypes[type] }
              removeItemInPinboardPage={ removeItemInPinboardPage }/>
          ))
        }
      </div>
    );
  }
}

PinnedSection.propTypes = {
  itemsByTypes: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
};
