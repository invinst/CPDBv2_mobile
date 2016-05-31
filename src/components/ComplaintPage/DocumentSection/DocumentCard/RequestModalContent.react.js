import React from 'react';
import objectAssign from 'object-assign';
import Base from 'components/Base.react';
import cx from 'classnames';
import u from 'utils/HelperUtil';
import RequestStore from 'stores/ComplaintPage/RequestStore';
import RequestEmailResourceUtil from 'utils/RequestEmailResourceUtil.js';
import RequestDocumentErrorPresenter from 'presenters/RequestDocumentErrorPresenter';
import InterfaceText from 'components/Shared/InterfaceText.react';
import TickIcon from 'components/Shared/TickIcon';
import style from 'styles/ComplaintPage/DocumentSection/DocumentCard/RequestModalContent.sass';


const RequestModalContent = React.createClass(objectAssign(Base(RequestStore), {
  propTypes: {
    document: React.PropTypes.object
  },

  contextTypes: {
    modalName: React.PropTypes.string,
    action: React.PropTypes.func
  },

  getInitialState() {
    return {
      requested: false,
      submitFailed: false,
      errors: {},
      email: ''
    };
  },

  onSubmit() {
    const documentId = u.fetch(this.props.document, 'id', null);
    RequestEmailResourceUtil.post(this.refs.email.value, documentId);
  },

  render() {
    const requestFormClass = cx('request-form', {'hide': this.state.requested});
    const thankYouClass = cx('thank-you', {'hide': !this.state.requested });
    const errorMsgClass = cx('error', {'hide': !this.state.submitFailed });
    const modalAction = u.fetch(this.context, 'action', () => {});
    const errorPresenter = RequestDocumentErrorPresenter(this.state.errors);

    return (
      <div>
        <div className={ style.requestModalContent }>
          <div className='modal-content content'>
            <div className='modal-header'>
            </div>
            <div className={ requestFormClass }>
              <div className='modal-body'>
                <div className='message-header'>We&apos;ll notify you when the document is made available.</div>
                <input className='email-input' ref='email' type='email' placeholder='Your email address' />
                <div className={ errorMsgClass }>{ errorPresenter.errorMessage }</div>
                <button className='btn-cancel btn btn-outlined'
                  onClick={ modalAction('close') }>Cancel
                </button>
                <button className='btn-submit btn btn-positive btn-outlined' onClick={ this.onSubmit }>
                  Submit
                </button>
              </div>
            </div>
            <div className={ thankYouClass }>
              <div className='modal-body'>
                <div className='message-header'>Thank you</div>
                <div className='message-content'>
                  <InterfaceText identifier='thank-you-message' placeholderLength='350'/>
                </div>
                <div className='success-icon' onClick={ modalAction('close') }>
                  <TickIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}));

export default RequestModalContent;
