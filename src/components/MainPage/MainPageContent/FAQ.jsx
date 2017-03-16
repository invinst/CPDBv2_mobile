import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import cx from 'classnames';

import style from 'styles/MainPage/MainPageContent/FAQ.sass';

export default class FAQ extends Component {
  constructor(props) {
    super(props);
  }

  renderContent(faqs) {
    return map(faqs, (question, key) => (
      <p className='faq-paragraph' key={ key }>{ question.title }</p>
    ));
  }

  render() {
    const topLeft = this.props.isSearchFocused;
    const { faqs } = this.props.faqSection;

    return (
      <div className={ cx(style.faq, 'landing-section faq animation', { 'hidden': topLeft }) }>
        <div className='row'>
          <div className='landing-section-header left'>
            <p className='landing-section-title'>FAQ</p>
          </div>
          <div className='btn landing-section-button right'>More</div>
        </div>

        <div className='faq-content'>
          { this.renderContent(faqs) }
        </div>
      </div>
    );
  }
}

FAQ.propTypes = {
  faqSection: PropTypes.object,
  isSearchFocused: PropTypes.number
};

FAQ.defaultProps = {
  faqSection: [],
  isSearchFocused: 0
};