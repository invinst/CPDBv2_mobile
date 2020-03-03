import React from 'react';
import PropTypes from 'prop-types';

import style from './description-content.sass';
import CMSContent from 'components/common/cms-content';


export default function DescriptionContent(props) {
  const { content, subContent } = props;

  return (
    <div className={ style.descriptionContent }>
      <CMSContent className='content' content={ content }/>
      <CMSContent className='sub-content' content={ subContent }/>
    </div>
  );
}

DescriptionContent.propTypes = {
  content: PropTypes.object,
  subContent: PropTypes.object,
};
