import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ComplaintFinding from 'components/Shared/ComplaintFinding';
import style from 'styles/OfficerPage/OfficerTimeline/CRItem.sass';
import constants from 'constants';

class CRItem extends Component {
  render() {
    const { category, coaccused, crid, date, finding, subcategory } = this.props.result;

    const crUrl = `${constants.COMPLAINT_PATH}${crid}/${this.props.officerId}/`;

    return (
      <Link className={ `${style.crItem} test--cr-item-${crid}` } to={ crUrl }>
        <div className={ style.cridContainer }>
          <span className={ style.cr }>CR </span>
          <span className={ style.crid }>{ crid }</span>
        </div>
        <div className={ style.date }>{ date } </div>

        <h2 className={ style.category }>{ category }</h2>
        <div className={ style.subcategory }>{ subcategory }</div>
        <div className={ style.findingContainer }>
          <ComplaintFinding finding={ finding } />
        </div>
        <div className={ style.coaccused }>1 of { coaccused } Coaccused</div>
      </Link>
    );
  }
}

CRItem.propTypes = {
  result: PropTypes.object,
  officerId: PropTypes.number
};

CRItem.defaultProps = {
  result: {}
};

export default CRItem;
