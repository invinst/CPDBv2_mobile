import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { RelevantDocumentCardWithUndo as RelevantDocumentCard } from './relevant-document-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';


export default class RelevantDocuments extends Component {
  loadMore = () => {
    const { pinboardId, nextParams, fetchPinboardRelevantDocuments } = this.props;
    fetchPinboardRelevantDocuments(pinboardId, nextParams);
  };

  render() {
    const { documents, hasMore, addItemInPinboardPage, requesting } = this.props;
    return (
      <RelevantInfiniteCarousel
        title='DOCUMENTS'
        hasMore={ hasMore }
        loadMore={ this.loadMore }
        className='relevant-documents'
        requesting={ requesting }
      >
        {
          documents.map(document => (
            <RelevantDocumentCard
              key={ document.id }
              { ...document }
              addItemInPinboardPage={ addItemInPinboardPage }
            />
          ))
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
  addItemInPinboardPage: PropTypes.func,
  requesting: PropTypes.bool,
};

RelevantDocuments.defaultProps = {
  documents: [],
};
