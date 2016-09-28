import React, {Component, PropTypes} from 'react';

import cx from 'classnames';

import style from 'styles/MainPage/MainPageContent/FAQ.sass';

export default class VFTG extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const topLeft = this.props.isSearchFocused;

    return (
      <div className={ cx(style.faq, 'landing-section faq animation', {'top-left': topLeft}) }>
        <div className='row'>
          <div className='landing-section-header left'>
            <p className='landing-section-title'>FAQ</p>
          </div>
          <div className='btn landing-section-button right'>More</div>
        </div>

        <div className='faq-content'>
          <p className="faq-paragraph">How accurate is the data?</p>
          <p className="faq-paragraph">How current is the data?</p>
          <p className="faq-paragraph last">What are the Moore and Bond datasets and how do they affect the data?</p>
        </div>
      </div>
    );
  }
}
