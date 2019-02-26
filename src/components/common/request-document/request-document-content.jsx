import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import CMSContent from 'components/common/cms-content';
import style from './request-document-content.sass';


export default class RequestDocumentContent extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { warning: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { requestDocument, id, closeModal } = this.props;
    return requestDocument({ id, email: this.refs.email.value }).then((action) => {
      this.setState({ warning: false });
      setTimeout(closeModal, 1500);  // auto close modal if success
    }).catch(e => {
      this.setState({ warning: true });
    });
  }

  render() {
    const {
      closeModal,
      message,
      isRequested,
      documentRequestMessage,
    } = this.props;
    const showMessage = message && (isRequested || this.state.warning);

    return (
      <form onSubmit={ this.handleSubmit } className={ style.requestDocumentContent }>
        <div className='request-document-inputs'>
          <div className='instruction-text'>
            <CMSContent content={ documentRequestMessage } />
          </div>
          <input
            ref='email'
            className={ classnames('email-input', { warning: this.state.warning } ) }
            placeholder='Your email'
          />
          <div>
            <input type='submit' value='Request' className='request-button'/>
            <a className='cancel-button' onClick={ closeModal }>Cancel</a>
          </div>
        </div>
        { showMessage && (
          <div className='message-box'>
            { message }
          </div>
        ) }
      </form>
    );
  }
}

RequestDocumentContent.propTypes = {
  requestDocument: PropTypes.func,
  message: PropTypes.string,
  closeModal: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isRequested: PropTypes.bool,
  documentRequestMessage: PropTypes.string,
};
