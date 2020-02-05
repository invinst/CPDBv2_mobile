import React, { PropTypes, Component } from 'react';

import styles from './empty-pinboard.sass';
import ExamplePinboardLink from 'components/pinboard-page/empty-pinboard/example-pinboard-link';
import CMSContent from 'components/common/cms-content';


export default function EmptyPinboard(props) {
  const {
    examplePinboards,
    emptyPinboardTitle,
    emptyPinboardDescription,
    currentPinboardId,
    updatePinboardFromSource,
  } = props;
  return (
    <div className={ styles.emptyPinboard }>
      <CMSContent className='empty-pinboard-title' content={ emptyPinboardTitle }/>
      <CMSContent className='empty-pinboard-description' content={ emptyPinboardDescription }/>
      { examplePinboards.map(pinboard => (
        <ExamplePinboardLink
          key={ pinboard.id }
          id={ pinboard.id }
          title={ pinboard.title }
          description={ pinboard.description }
          currentPinboardId={ currentPinboardId }
          updatePinboardFromSource={ updatePinboardFromSource }
        />
      )) }
      <div className='arrow-head'/>
      <div className='arrow-shaft'/>
    </div>
  );
}

EmptyPinboard.propTypes = {
  examplePinboards: PropTypes.array,
  emptyPinboardTitle: PropTypes.object,
  emptyPinboardDescription: PropTypes.object,
  currentPinboardId: PropTypes.string,
  updatePinboardFromSource: PropTypes.func,
};
