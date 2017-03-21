import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import constants from 'constants';

class ReportSearchResult extends Component {

  render() {
    const { report, saveToRecent } = this.props;
    const onClick = saveToRecent.bind(this, {
      type: 'Report',
      title: report.title,
      url: `${constants.REPORTING_PATH}${report.id}/`
    });

    return (
      <Link
        to={ `${constants.REPORTING_PATH}${report.id}/` }
        className='row report-row'
        onClick={ onClick }>
        <p className='report-publication'>
          <span>{ report.publication }</span>
          <span>{ report.publishDate }</span>
        </p>
        <p className='report-title'>{ report.title }</p>
      </Link>
    );
  }
}

ReportSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  report: PropTypes.object,
  index: PropTypes.number
};

export default ReportSearchResult;
