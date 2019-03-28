import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import ComplaintDocumentCard from './complaint-document-card';
import CarouselWrapper from '../carousel-wrapper';
import constants from 'constants';


export default class NewDocumentAllegations extends Component {

  componentDidMount() {
    const { newDocumentAllegations, requestNewDocumentAllegations } = this.props;

    if (isEmpty(newDocumentAllegations)) {
      requestNewDocumentAllegations();
    }
  }

  render() {
    const { newDocumentAllegations, description, title, pathname, onTrackingAttachment } = this.props;

    return (
      <CarouselWrapper
        title={ title }
        description={ description }
        trackingContentType={ constants.CAROUSEL_TYPES.DOCUMENT }
      >
        {
          newDocumentAllegations.map(allegation => (
            <ComplaintDocumentCard
              allegation={ allegation }
              key={ allegation.crid }
              pathname={ pathname }
              onTrackingAttachment={ onTrackingAttachment }
            />
          ))
        }
      </CarouselWrapper>
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
  title: PropTypes.object,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
};
