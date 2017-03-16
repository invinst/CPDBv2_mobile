import React, { Component, PropTypes } from 'react';

class OfficerSearchResult extends Component {
  render() {
    const { officer, saveToRecent } = this.props;

    const onClick = saveToRecent.bind(undefined, {
      type: 'Officer',
      title: officer.name,
      url: officer.url
    });

    return (
      <a href={ officer.url } target='_blank' className='row' onClick={ onClick }>
        <p>{ officer.name }</p>
        <p className='officer-badge-number'>{ officer.extraInfo }</p>
      </a>
    );
  }
}

OfficerSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  officer: PropTypes.object
};

export default OfficerSearchResult;
