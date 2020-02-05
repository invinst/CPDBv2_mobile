import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sticky } from 'react-sticky';

import { scrollToTop } from 'utils/navigation-util';
import style from './about-page.sass';
import Footer from 'components/footer';


export default class AboutPage extends Component {
  render() {
    const { content } = this.props;
    if (!content) {
      return null;
    }

    const pTags = this.props.content.map((paragraph, index) => (
      <p key={ index }>{ paragraph }</p>
    ));

    return (
      <div className={ style.aboutPage }>
        <Sticky>
          <h1 onClick={ scrollToTop() } className='sheet-header header'>About</h1>
        </Sticky>
        <div className='sheet-body'>
          { pTags }
        </div>
        <Footer />
      </div>
    );
  }
}

AboutPage.propTypes = {
  content: PropTypes.array,
};
