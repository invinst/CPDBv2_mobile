import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './complaint-finding.sass';

export default class ComplaintFinding extends Component {
  getFindingClass(finding) {
    return finding ? finding.toLowerCase().replace(' ', '-') : 'unknown';
  }

  render() {
    const { finding } = this.props;

    return (
      <span className={ `${style.complaintFinding} ${this.getFindingClass(finding)}` }>
        { finding }
      </span>
    );
  }
}

ComplaintFinding.propTypes = {
  finding: PropTypes.string,
};
