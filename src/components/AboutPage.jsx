import React, { Component, PropTypes } from 'react';
import style from 'styles/AboutPage.sass';


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
        <h1 className='sheet-header header'>About</h1>
        <div className='sheet-body'>
          { pTags }
        </div>
      </div>
    );
  }
}

AboutPage.propTypes = {
  content: PropTypes.array
};
