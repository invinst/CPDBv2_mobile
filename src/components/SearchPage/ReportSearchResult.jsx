import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import constants from 'constants';

class ReportSearchResult extends Component {

  renderItem(item, key) {
    const onClick = () => {
      this.props.saveToRecent({
        type: 'Report',
        title: item.title,
        url: `${constants.REPORTING_PATH}${item.id}/`
      });
    };

    return (
      <Link
        to={ `${constants.REPORTING_PATH}${item.id}/` }
        className='row report-row'
        onClick={ onClick }
        key={ key }
      >
        <p className='report-publication'>
          <span>{ item.publication }</span>
          <span>{ item.publishDate }</span>
        </p>
        <p className='report-title'>{ item.title }</p>
      </Link>
    );
  }

  render() {
    const { items } = this.props;
    const links = items.map((item, index) => this.renderItem(item, index));
    return (
      <div>
        { links }
      </div>
    );
  }
}

ReportSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.object
};

export default ReportSearchResult;
