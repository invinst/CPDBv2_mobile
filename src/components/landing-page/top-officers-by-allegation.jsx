import React, { Component, PropTypes } from 'react';
import { isEmpty, noop } from 'lodash';

import CMSContent from './cms-content';
import HorizontalScrolling from './horizontal-scrolling';
import OfficerCard from './officer-card';
import style from './top-officers-by-allegation.sass';
import { showIntercomLauncher } from 'utils/intercom';


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
      <div className={ style.topOfficersByAllegation }>
        <CMSContent className='carousel-title' content={ title } />
        <HorizontalScrolling>
          <CMSContent className='carousel-description' content={ description } />
          {
            topOfficersByAllegation.map(
              officer => <OfficerCard officer={ officer } key={ officer.id } openCardInNewPage={ embed } />
            )
          }
        </HorizontalScrolling>
      </div>
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
