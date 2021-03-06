import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import cx from 'classnames';

import CoaccusedCard from './coaccused-card';
import style from './accused-officers.sass';

export default class AccusedOfficers extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  showAllHandleClick() {
    this.setState({ expanded: true });
  }

  render() {
    const { officers, addOrRemoveItemInPinboard } = this.props;
    const { expanded } = this.state;
    const coaccusedClass = cx('coaccusals', { 'expanded': expanded });

    return (
      <div className={ style.accusedOfficers }>
        <h2 className='header'>
          { `${officers.length} ${pluralize('accused officer', officers.length).toUpperCase()}` }
        </h2>
        <div className={ coaccusedClass }>
          {
            officers.map(officer =>
              <CoaccusedCard
                key={ officer.id }
                officer={ officer }
                addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
              />
            )
          }
        </div>
        {
          (!expanded && officers.length > 2 )
            ? (<div className='show-all' onClick={ () => this.showAllHandleClick() }>Show All Accused Officers</div>)
            : (<div className='padding-bottom' />)
        }
      </div>
    );
  }
}

AccusedOfficers.propTypes = {
  officers: PropTypes.array,
  addOrRemoveItemInPinboard: PropTypes.func,
};

AccusedOfficers.defaultProps = {
  officers: [],
  addOrRemoveItemInPinboard: () => {},
};
