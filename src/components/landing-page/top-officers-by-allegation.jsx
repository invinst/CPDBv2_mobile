import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import CMSContent from './cms-content';
import HorizontalScrolling from './horizontal-scrolling';
import OfficerCard from './officer-card';
import style from './top-officers-by-allegation.sass';


export default class TopOfficersByAllegation extends Component {

  componentDidMount() {
    const { topOfficersByAllegation, requestTopOfficersByAllegation } = this.props;

    if (isEmpty(topOfficersByAllegation)) {
      requestTopOfficersByAllegation();
    }
  }

  render() {
    const { topOfficersByAllegation, description, title } = this.props;

    return (
      <div className={ style.topOfficersByAllegation }>
        <div className='carousel-title'><CMSContent field={ title } /></div>
        <HorizontalScrolling>
          <div className='carousel-description'>
            <CMSContent field={ description } />
          </div>
          {
            topOfficersByAllegation.map(officer => <OfficerCard officer={ officer } key={ officer.id } />)
          }
        </HorizontalScrolling>
      </div>
    );
  }
}

TopOfficersByAllegation.defaultProps = {
  requestTopOfficersByAllegation: () => {},
  topOfficersByAllegation: []
};

TopOfficersByAllegation.propTypes = {
  topOfficersByAllegation: PropTypes.array,
  requestTopOfficersByAllegation: PropTypes.func,
  description: PropTypes.object,
  title: PropTypes.object
};
