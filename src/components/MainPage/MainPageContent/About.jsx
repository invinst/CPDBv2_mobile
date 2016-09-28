import React, {Component} from 'react';
import { map } from 'lodash';
import cx from 'classnames';

import style from 'styles/MainPage/MainPageContent/About.sass';


export default class About extends Component {
  constructor(props) {
    super(props);
  }

  renderContent(aboutContent) {
    return map(aboutContent, (paragraph, key) => (
      <p className="paragraph" key={ key }>{ paragraph.value }</p>
    ));
  }

  render() {
    const isSearchFocused = this.props.isSearchFocused;
    const {aboutHeader, aboutContent} = this.props.aboutSection;

    return (
      <div className={ cx(style.about, 'about landing-section', { hidden: isSearchFocused }) }>
        <div className='landing-section-header'>
          <p className='landing-section-title'> { aboutHeader } </p>
        </div>
        <br className='clearBoth'/>
        <div className='section-description'>
          { this.renderContent(aboutContent) }
        </div>
      </div>
    )
  }
}

About.defaultProps = {
  aboutSection: {
    aboutHeader: '',
    aboutContent: ''
  },
  isSearchFocused: false
};

About.proTypes = {
  aboutSection: React.PropTypes.object
};
