import React from 'react';
import cx from 'classnames';
import u from 'utils/HelperUtil';
import DocumentPresenter from 'presenters/DocumentPresenter';
import RequestModalContent from 'components/ComplaintPage/DocumentSection/DocumentCard/RequestModalContent.react';
import Modal from 'components/Lib/Modal.react';


const DocumentCard = React.createClass({
  propTypes: {
    document: React.PropTypes.object
  },

  renderActionTag(presenter, name) {
    if (presenter.documentAction == 'View') {
      return (
        <a href={ presenter.documentLink } className='action-type one-half column align-right'>
          { presenter.documentAction }
        </a>
      );
    }
    return (
      <a onClick={ Modal.dispatch(name, 'open') } className='action-type one-half column align-right'>
        { presenter.documentAction }
      </a>
    );
  },

  render() {
    const document = this.props.document;
    const presenter = DocumentPresenter(document);
    const isBlur = presenter.documentStatus != 'Available';
    const className = cx('document-name', {'blur': isBlur});
    const modalName = u.format('requestModal-{id}',{'id': u.fetch(document, 'id', '')});

    return (
      <div className='document-card row'>
        <div className='one column circle-wrapper center'>
          <div className='small-circle background-black circle'></div>
        </div>
        <div className='eleven columns'>
          <div className='document-detail one-half column align-left'>
            <div className={ className }>{ presenter.documentName }</div>
            <div className='status'>{ presenter.documentStatus }</div>
          </div>
          { this.renderActionTag(presenter, modalName) }
          <Modal name={ modalName }>
            <RequestModalContent document={ document } />
          </Modal>
        </div>
      </div>
    );
  }
});

export default DocumentCard;
