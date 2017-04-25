import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import constants from 'constants';
import Arrow from 'components/Shared/Arrow';
import style from 'styles/ComplaintPage/CoaccusedDropdown.sass';

export default class CoaccusedDropdown extends Component {
  renderContent() {
    const { coaccused, complaintId, activeCoaccusedId } = this.props;

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

    // Each coaccused's height is 41, but "viewing" coaccused is 7 pixels taller
    const height = this.props.isExpanded ? coaccused.length * 41 + 7 : 0;

    const animationCSS = {
      height: `${height}px`,
      maxHeight: 'calc(100vh - 62px)',  // 62px is the sheet header's height
      overflow: height > 0 ? 'scroll' : 'hidden',
      transition: 'height 200ms ease-in'
    };

    return (
      <div className='coaccused-animation-wrapper' style={ animationCSS }>
        <div className='content'>
          { rows }
        </div>
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
  isExpanded: PropTypes.bool
};
