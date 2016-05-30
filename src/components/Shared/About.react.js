import React from 'react';
import cx from 'classnames';

const About = React.createClass({
  propTypes: {
    topLeft: React.PropTypes.number
  },

  render() {
    const classNames = cx('animation bold', {'top-left': this.props.topLeft});
    return (
      <div id='about' className={ classNames }>
        About the data
      </div>
    );
  }
});

export default About;
