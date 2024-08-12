import { Component } from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';

// import styles from './pinboard-introduction.sass';
import browserHistory from 'utils/history';

export default class PinboardIntroduction extends Component {
  onCloseButtonClick = () => {
    this.props.visitPinboardIntroduction();
  };

  onGetStartedButtonClick = () => {
    this.props.visitPinboardIntroduction();
    browserHistory.push('/pinboard/');
  };

  render() {
    return (null);
    // !this.props.isPinboardIntroductionVisited && (
    //   <div className={ cx(styles.pinboardIntroduction, 'pinboard-feature') }>
    //     <div className='introduction-title'>Introducing Pinboards</div>
    //     <div className='introduction-close-btn' onClick={ this.onCloseButtonClick } />
    //     <div className='pinboard-thumbnail' />
    //     <div className='introduction-content'>
    //       <div className='introduction-text'>
    //         Use search to create collections of officers, complaint records, and tactical reponse reports.
    //       </div>
    //       <a className='get-started-btn' onClick={ this.onGetStartedButtonClick }>Get started</a>
    //     </div>
    //     <div className='clearfix' />
    //   </div>
    // );
  }
}

PinboardIntroduction.propTypes = {
  visitPinboardIntroduction: PropTypes.func,
  isPinboardIntroductionVisited: PropTypes.bool,
};


// !this.props.isPinboardIntroductionVisited && (
//   <div className={ cx(styles.pinboardIntroduction, 'pinboard-feature') }>
//     <div className='introduction-title'>Introducing Pinboards</div>
//     <div className='introduction-close-btn' onClick={ this.onCloseButtonClick } />
//     <div className='pinboard-thumbnail' />
//     <div className='introduction-content'>
//       <div className='introduction-text'>
//         Use search to create collections of officers, complaint records, and tactical reponse reports.
//       </div>
//       <a className='get-started-btn' onClick={ this.onGetStartedButtonClick }>Get started</a>
//     </div>
//     <div className='clearfix' />
//   </div>
// );
