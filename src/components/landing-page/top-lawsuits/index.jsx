import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, noop } from 'lodash';

import TopLawsuitCard from './top-lawsuit-card';
import CarouselWrapper from '../carousel-wrapper';
import { CAROUSEL_TYPES } from 'constants';


export default class TopLawsuits extends Component {
  componentDidMount() {
    const { topLawsuits, requestTopLawsuits } = this.props;

    if (isEmpty(topLawsuits)) {
      requestTopLawsuits();
    }
  }

  render() {
    const {
      topLawsuits, description, title,
    } = this.props;

    return (
      <CarouselWrapper
        title={ title }
        description={ description }
        trackingContentType={ CAROUSEL_TYPES.LAWSUIT }
      >
        {
          topLawsuits.map(lawsuit => (
            <TopLawsuitCard
              lawsuit={ lawsuit }
              key={ lawsuit.caseNo }
            />
          ))
        }
      </CarouselWrapper>
    );
  }
}

TopLawsuits.propTypes = {
  topLawsuits: PropTypes.array,
  requestTopLawsuits: PropTypes.func,
  description: PropTypes.object,
  title: PropTypes.object,
};

TopLawsuits.defaultProps = {
  topLawsuits: [],
  requestTopLawsuits: noop,
};
