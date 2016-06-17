import React from 'react';


const Wrapper = React.createClass({
  propTypes: {
    wrapperClass: React.PropTypes.string,
    visible: React.PropTypes.bool,
    children: React.PropTypes.node
  },

  render() {
    if (this.props.visible) {
      return (
        <div className={ this.props.wrapperClass }>
          { this.props.children }
        </div>
      );
    }
    return (<div></div>);
  }
});

export default Wrapper;
