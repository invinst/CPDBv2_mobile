import React, { Component, PropTypes } from 'react';
import { isEmpty, noop } from 'lodash';

import OfficerCard from 'components/common/officer-card';
import { showIntercomLauncher } from 'utils/intercom';
import CarouselWrapper from './carousel-wrapper';
import constants from 'constants';


export default class TopOfficersByAllegation extends Component {

  componentDidMount() {
    const { topOfficersByAllegation, requestTopOfficersByAllegation, cmsRequested, requestCMS, embed } = this.props;

    if (isEmpty(topOfficersByAllegation)) {
      requestTopOfficersByAllegation();
    }

    cmsRequested || requestCMS();

    embed && showIntercomLauncher(false);
  }

  componentWillUnmount() {
    this.props.embed && showIntercomLauncher(true);
  }

  render() {
    const { topOfficersByAllegation, description, title, embed, addOrRemoveItemInPinboard, pinnable } = this.props;

    return (
      <CarouselWrapper
        title={ title }
        description={ description }
        embed={ embed }
        trackingContentType={ constants.CAROUSEL_TYPES.ALLEGATION }
      >
        {
          topOfficersByAllegation.map(officer =>
            <OfficerCard
              officer={ officer }
              key={ officer.id }
              openCardInNewPage={ embed }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
              pinnable={ pinnable }
            />
          )
        }
      </CarouselWrapper>
    );
  }
}

TopOfficersByAllegation.defaultProps = {
  requestTopOfficersByAllegation: noop,
  addOrRemoveItemInPinboard: noop,
  requestCMS: noop,
  topOfficersByAllegation: [],
  pinnable: true,
};

TopOfficersByAllegation.propTypes = {
  topOfficersByAllegation: PropTypes.array,
  requestTopOfficersByAllegation: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  requestCMS: PropTypes.func,
  cmsRequested: PropTypes.bool,
  description: PropTypes.object,
  title: PropTypes.object,
  embed: PropTypes.bool,
  pinnable: PropTypes.bool,
};
