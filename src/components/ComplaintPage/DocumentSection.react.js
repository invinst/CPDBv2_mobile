import React from 'react';
import DocumentCard from 'components/ComplaintPage/DocumentSection/DocumentCard.react';
import Wrapper from 'components/Shared/Wrapper.react';


const DocumentSection = React.createClass({
  propTypes: {
    documents: React.PropTypes.array
  },

  renderDocumentCard(document) {
    return (
      <DocumentCard document={ document } key={ document.id } />
    );
  },

  render() {
    const documents = this.props.documents || [];
    const numberOfDocuments = documents.length || 0;
    return (
      <Wrapper wrapperClass='document-section' visible={ !!numberOfDocuments }>
        <div className='row section-header'>
          <span className='section-title bold pad'>Document ({ numberOfDocuments })</span>
        </div>
        <div className='document-list pad'>
          { documents.map(this.renderDocumentCard) }
        </div>
      </Wrapper>
    );
  }
});

export default DocumentSection;
