import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import HorizontalScrolling from 'components/common/horizontal-scrolling';
import OfficerCard from 'components/common/officer-card';
import style from './officers.sass';
import { showIntercomLauncher } from 'utils/intercom';


export default class Officers extends Component {

  componentDidMount() {
    const { officers, requestOfficers, officerIds } = this.props;

    if (isEmpty(officers)) {
      requestOfficers(officerIds);
    }

    showIntercomLauncher(false);
  }

  render() {
    const { officers, description, title } = this.props;

    return (
      <div className={ style.officers }>
        <div className='carousel-title'>{ title }</div>
        <HorizontalScrolling>
          <div className='carousel-description'>{ description }</div>
          {
            officers.map(
              officer => <OfficerCard officer={ officer } key={ officer.id } openCardInNewPage={ true } />
            )
          }
        </HorizontalScrolling>
      </div>
    );
  }
}

Officers.defaultProps = {
  officers: [],
  requestOfficers: () => {},
  description: '',
  title: 'Officers',
};

Officers.propTypes = {
  officers: PropTypes.array,
  requestOfficers: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  officerIds: PropTypes.string,
};
