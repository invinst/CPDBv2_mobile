import React, { Component, PropTypes } from 'react';

import RelevantDocumentCard from './relevant-document-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';


export default class RelevantDocuments extends Component {
  loadMore() {
    const { pinboardId, nextParams, fetchPinboardRelevantDocuments } = this.props;
    fetchPinboardRelevantDocuments(pinboardId, nextParams);
  }

  render() {
    const { documents, hasMore, addItemToPinboard } = this.props;
    return (
      <RelevantInfiniteCarousel
        title='DOCUMENTS'
        hasMore={ hasMore }
        loadMore={ this.loadMore.bind(this) }
        className='relevant-documents'
      >
        {
          documents.map((document, index) =>
            <RelevantDocumentCard key={ index } { ...document } addItemToPinboard={ addItemToPinboard }/>
          )
        }
      </RelevantInfiniteCarousel>
    );
  }
}

RelevantDocuments.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object),
  nextParams: PropTypes.object,
  fetchPinboardRelevantDocuments: PropTypes.func,
  hasMore: PropTypes.bool,
  pinboardId: PropTypes.string,
  addItemToPinboard: PropTypes.func,
};

RelevantDocuments.defaultProps = {
  documents: []
};
