import React, { Component, PropTypes } from 'react';
import style from 'styles/OfficerPage/OfficerTimeline/CRItem.sass';
import dot from 'img/dot.svg';

class CRItem extends Component {
  getFindingClass(finding) {
    return finding ? finding.toLowerCase().replace(' ', '-') : 'unknown';
  }

  render() {
    const { category, coaccused, crid, date, finding, subcategory } = this.props.result;

    const findingClassname = `${style.finding} ${this.getFindingClass(finding)}`;

    return (
      <div className={ style.crItem }>
        <div className={ style.verticalLine }></div>
        <div className={ style.cridContainer }>
          <span className={ style.cr }>CR </span>
          <span className={ style.crid }>{ crid }</span>
        </div>
        <div className={ style.date }>{ date } <img src={ dot } /></div>

        <h2 className={ style.category }>{ category }</h2>
        <div className={ style.subcategory }>{ subcategory }</div>
        <div className={ style.findingContainer }>
          <span className={ findingClassname }>{ finding }</span>
        </div>
        <div className={ style.coaccused }>1 of { coaccused } Coaccused</div>
      </div>
    );
  }
}

CRItem.propTypes = {
  result: PropTypes.object
};

CRItem.defaultProps = {
  result: {}
};

export default CRItem;
