import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import cx from 'classnames';

import style from 'styles/MainPage/MainPageContent/Collaborate.sass';


export default class Collaborate extends Component {
  constructor(props) {
    super(props);
  }

  renderContent(aboutContent) {
    return map(aboutContent, (paragraph, key) => (
      <p className='paragraph' key={ key }>{ paragraph.value }</p>
    ));
  }

  render() {
    const isSearchFocused = this.props.isSearchFocused;
    const { collaborateHeader, collaborateContent } = this.props.collaborateSection;

    return (
      <div className={ cx(style.collaborate, 'collaborate landing-section', { hidden: isSearchFocused }) }>
        <div className='landing-section-header'>
          <p className='landing-section-title'> { collaborateHeader } </p>
        </div>
        <br className='clearBoth'/>
        <div className='section-description'>
          { this.renderContent(collaborateContent) }
        </div>
      </div>
    );
  }
}

Collaborate.defaultProps = {
  collaborateSection: {
    collaborateHeader: '',
    collaborateContent: ''
  },
  isSearchFocused: 0
};

Collaborate.propTypes = {
  collaborateSection: PropTypes.shape({
    collaborateHeader: PropTypes.string,
    collaborateContent: PropTypes.array
  }),
  isSearchFocused: PropTypes.number
};
