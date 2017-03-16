import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import constants from 'constants';


class FaqSearchResult extends Component {
  render() {
    const { faq, saveToRecent } = this.props;
    const onClick = saveToRecent.bind(this, {
      type: 'FAQ',
      title: faq.question,
      url: `${constants.FAQ_PATH}/${faq.id}`
    });
    return (
      <div className='row'>
        <Link className='faq' to={ constants.FAQ_PATH + '/' + faq.id } onClick={ onClick }>
          { faq.question }
        </Link>
      </div>
    );
  }
}

FaqSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  faq: PropTypes.object
};

export default FaqSearchResult;
