import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import S from 'string';

import style from 'styles/MainPage/MainPageContent/VFTG.sass';
import mediumIcon from 'img/medium-icon.svg';
import constants from 'constants';

export default class VFTG extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickSubscribeEmail = this.handleClickSubscribeEmail.bind(this);
    this.state = {
      formState: constants.SUBSCRIBE_FORM_INITIAL
    };
  }

  handleInputChange() {
    this.setState({
      formState: constants.SUBSCRIBE_FORM_INITIAL
    });
  }

  handleClickSubscribeEmail() {

    const { subscribeEmail } = this.props;

    if (!S(this.emailInput.value).isEmpty() && this.isSubscribeButtonEnable()) {
      this.setState({
        formState: constants.SUBSCRIBE_FORM_LOADING
      });

      subscribeEmail(this.emailInput.value).then((action) => {
        this.setState({
          formState: constants.SUBSCRIBE_FORM_SUCCESS
        });
      }).catch((err) => {
      this.setState({
        formState: constants.SUBSCRIBE_FORM_FAILURE
      });
    });
    }
  }

  isSubscribeButtonEnable(){
    // the subscribe button is enabled if in INITIAL or FAILURE states
    return [constants.SUBSCRIBE_FORM_INITIAL, constants.SUBSCRIBE_FORM_FAILURE]
              .indexOf(this.state.formState) !== -1;
  }

  stateToClass(state){
    let stateMap = {};

    stateMap[constants.SUBSCRIBE_FORM_INITIAL] = '';
    stateMap[constants.SUBSCRIBE_FORM_LOADING] = 'subscribe-loading';
    stateMap[constants.SUBSCRIBE_FORM_SUCCESS] = 'subscribe-success';
    stateMap[constants.SUBSCRIBE_FORM_FAILURE] = 'subscribe-failure';

    return stateMap[state];
  }

  render() {
    const topLeft = this.props.isSearchFocused;
    const subscribeStateClassName = this.stateToClass(this.state.formState);
    const { date, contentText, contentLink } = this.props.vftgSection;

    return (
      <div className={ cx(style.vftg, 'vftg row animation', { 'top-left': topLeft }) }>
        <div className='issue-time row'>
          <span className='at-issue'>AT ISSUE: </span>
          <span className='time'> { date } </span>
        </div>
        <div className='news'><a href={ contentLink }>{ contentText }</a></div>
        <div className='most-recent'>
          <div><img src={ mediumIcon } /></div>
          <div className='most-recent-email'>Most Recent Email</div>
        </div>
        <div className='clearfix'></div>

        <div className='email-box'>
          <input
            ref={ el => { this.emailInput = el; } }
            className='email-input'
            placeholder='Enter your email'
            onChange={ this.handleInputChange }
            />
        </div>

        <div className='subscribe'>
          <div
            onClick={ this.handleClickSubscribeEmail }
            className={ cx('btn btn-subscribe', subscribeStateClassName) } >
            { this.state.formState == constants.SUBSCRIBE_FORM_SUCCESS ? 'Subscribed' : 'Subscribe' }
          </div>
        </div>
      </div>
    );
  }
}

VFTG.defaultProps = {
  vftgSection: {
    date: '',
    contentText: '',
    contentLink: ''
  },
  isSearchFocused: false
};

VFTG.proTypes = {
  subscribeEmail: React.PropTypes.func,
  requestLandingPage: React.PropTypes.func,
  isSearchFocused: React.PropTypes.number,
  vftgSection: React.PropTypes.object
};
