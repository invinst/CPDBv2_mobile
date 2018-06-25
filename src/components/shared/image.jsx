import React, { PropTypes, Component } from 'react';


class Img extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      error: false
    };
  }

  componentWillMount() {
    const image = new Image();
    image.src = this.props.src;
    image.onload = () => {
      this.setState({
        loaded: true,
        error: false
      });
    };
    image.onerror = () => {
      this.setState({
        loaded: true,
        error: true
      });
    };
  }

  render() {
    const { loaded, error } = this.state;
    const { src, fallback, ...rest } = this.props; // eslint-disable-line no-unused-vars

    if (loaded && !error) {
      return <img src={ src } { ...rest } />;
    } else {
      return <img src={ fallback } { ...rest } />;
    }
  }
}

Img.defaultProps = {
  src: '',
  fallback: ''
};

Img.propTypes = {
  src: PropTypes.string,
  fallback: PropTypes.string
};

export default Img;
