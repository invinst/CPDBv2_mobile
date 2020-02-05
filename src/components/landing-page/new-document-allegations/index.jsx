import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const {
      newDocumentAllegations, description, title,
      pathname, onTrackingAttachment, addOrRemoveItemInPinboard,
    } = this.props;

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
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
            />
          ))
        }
      </CarouselWrapper>
    );
  }
}

NewDocumentAllegations.defaultProps = {
  requestNewDocumentAllegations: () => {},
  addOrRemoveItemInPinboard: () => {},
  newDocumentAllegations: [],
};

NewDocumentAllegations.propTypes = {
  newDocumentAllegations: PropTypes.array,
  requestNewDocumentAllegations: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  description: PropTypes.object,
  title: PropTypes.object,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
};
