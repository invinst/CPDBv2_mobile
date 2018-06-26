import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

import constants from 'constants';
import Arrow from 'components/shared/arrow';
import style from 'styles/ComplaintPage/CoaccusedDropdown.sass';

export default class CoaccusedDropdown extends Component {
  renderContent() {
    const { coaccused, complaintId, activeCoaccusedId, headerHeight } = this.props;

    const rows = coaccused.map(({ fullName, id }, index) => {
      const viewing = <span className='viewing-box'>Viewing</span>;
      const arrow = <span className='arrow'><Arrow direction='down' /></span>;
      const viewingOrArrow = activeCoaccusedId === id ? viewing : arrow;
      return (
        <Link
          className={ cx('row', { viewing: activeCoaccusedId === id }) }
          to={ `${constants.COMPLAINT_PATH}${complaintId}/${id}/` }
          key={ index }
        >
          <span className='fullname'>{ fullName }</span>
          { viewingOrArrow }
        </Link>
      );
    });

    // Each coaccused's height is 41, but "viewing" coaccused is 7 pixels taller, also 133px padding because reasons
    const height = this.props.isExpanded ? coaccused.length * 41 + 7 + 133 : 0;

    const animationCSS = {
      height: `${height}px`,
      maxHeight: `${window.innerHeight - headerHeight}px`,
      overflow: height > 0 ? 'scroll' : 'hidden',
      transition: 'height 200ms ease-in'
    };

    return (
      <div className='coaccused-animation-wrapper' style={ animationCSS }>
        <div className='content'>
          { rows }
        </div>
        <div className='dropdown-padding' />
      </div>
    );
  }

  render() {
    return (
      <div style={ { position: 'relative', height: 'auto' } }>
        <div className={ style.coaccusedDropdown }>
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

CoaccusedDropdown.propTypes = {
  complaintId: PropTypes.string,
  coaccused: PropTypes.array,
  activeCoaccusedId: PropTypes.number,
  isExpanded: PropTypes.bool,
  headerHeight: PropTypes.number
};
