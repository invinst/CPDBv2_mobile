import React, { Component, PropTypes } from 'react';
import { isEmpty, noop } from 'lodash';

import OfficerCard from 'components/common/officer-card';
import { showIntercomLauncher } from 'utils/intercom';
import CarouselWrapper from './carousel-wrapper';


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
    const { topOfficersByAllegation, description, title, embed } = this.props;

    return (
      <CarouselWrapper title={ title } description={ description } embed={ embed } >
        {
          topOfficersByAllegation.map(
            officer => <OfficerCard officer={ officer } key={ officer.id } openCardInNewPage={ embed } />
          )
        }
      </CarouselWrapper>
    );
  }
}

TopOfficersByAllegation.defaultProps = {
  requestTopOfficersByAllegation: noop,
  requestCMS: noop,
  topOfficersByAllegation: [],
};

TopOfficersByAllegation.propTypes = {
  topOfficersByAllegation: PropTypes.array,
  requestTopOfficersByAllegation: PropTypes.func,
  requestCMS: PropTypes.func,
  cmsRequested: PropTypes.bool,
  description: PropTypes.object,
  title: PropTypes.object,
  embed: PropTypes.bool,
};
