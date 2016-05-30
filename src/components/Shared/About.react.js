import React from 'react';
import cx from 'classnames';

import style from 'styles/Shared/About.sass'

const About = React.createClass({
  propTypes: {
    topLeft: React.PropTypes.number
  },

  render() {
    const classNames = cx(style.about, 'animation bold', {'top-left': this.props.topLeft});
    return (
      <div className={ classNames }>
        About the data
      </div>
    );
  }
});

export default About;
