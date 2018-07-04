import React, { PropTypes, Component } from 'react';

import style from './section-row.sass';

class SectionRow extends Component {
  render() {
    const { label, value, children } = this.props;

    return (
      <div className={ style.sectionRow }>
        <div className='label'>{ label }</div>
        <div className='value'>
          { value || 'N/A' }
          { children }
        </div>
      </div>
    );
  }
}

SectionRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
};

export default SectionRow;
