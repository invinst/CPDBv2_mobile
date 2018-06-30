import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import CMSContent from './cms-content';
import HorizontalScrolling from './horizontal-scrolling';
import ComplaintDocumentCard from './complaint-document-card';
import style from './new-document-allegations.sass';


export default class NewDocumentAllegations extends Component {

  componentDidMount() {
    const { newDocumentAllegations, requestNewDocumentAllegations } = this.props;

    if (isEmpty(newDocumentAllegations)) {
      requestNewDocumentAllegations();
    }
  }

  render() {
    const { newDocumentAllegations, description, title } = this.props;

    return (
      <div className={ style.newDocumentAllegations }>
        <div className='carousel-title'><CMSContent field={ title } /></div>
        <HorizontalScrolling>
          <div className='carousel-description'>
            <CMSContent field={ description } />
          </div>
          {
            newDocumentAllegations.map(allegation => (
              <ComplaintDocumentCard allegation={ allegation } key={ allegation.crid } />
            ))
          }
        </HorizontalScrolling>
      </div>
    );
  }
}

NewDocumentAllegations.defaultProps = {
  requestNewDocumentAllegations: () => {},
  newDocumentAllegations: []
};

NewDocumentAllegations.propTypes = {
  newDocumentAllegations: PropTypes.array,
  requestNewDocumentAllegations: PropTypes.func,
  description: PropTypes.object,
  title: PropTypes.object
};
