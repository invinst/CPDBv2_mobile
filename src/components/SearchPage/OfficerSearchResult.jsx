import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class OfficerSearchResult extends Component {
  render() {
    const { officer, saveToRecent } = this.props;

    const onClick = saveToRecent.bind(undefined, {
      type: 'Officer',
      title: officer.name,
      url: officer.url
    });

    return (
      <Link to={ officer.url } className='row' onClick={ onClick }>
        <p>{ officer.name }</p>
        <p className='officer-badge-number'>{ officer.extraInfo }</p>
      </Link>
    );
  }
}

OfficerSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  officer: PropTypes.object
};

export default OfficerSearchResult;
