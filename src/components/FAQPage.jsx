import React, { Component, PropTypes } from 'react';
import cs from 'constants';
import { Link } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import { map } from 'lodash';
import { hasChildren } from 'utils/ComponentUtil';
import style from 'styles/FAQPage.sass';


export default class FAQPage extends Component {
  componentWillMount() {
    if (!this.props.pagination.loaded) {
      this.props.loadMore();
    }
  }

  renderFAQItems(faqs) {
    return map(faqs, (faq) => {
      const blocks = faq.question.map((q, index) => <p className='question' key={ index }>{ q }</p>);

      return (
        <Link className='row' key={ faq.id } to={ cs.FAQ_PATH + '/' + faq.id }>
        { blocks }
        </Link>
      );
    });
  }

  render() {
    const { pagination, loadMore, nextParams, hasMore } = this.props;

    if (!pagination.loaded && !pagination.faqs) {
      return null;
    }

    if (hasChildren(this)) {
      return (
        <div>
          FAQ
        </div>
      );
    }

    return (
      <div className={ style.faqPage }>
        <h1 className='sheet-header header'>FAQ</h1>
        <div className='sheet-body'>
          <InfiniteScroll loadMore={ () => loadMore(nextParams) } hasMore={ hasMore } useWindow={ false }>
            { this.renderFAQItems(pagination.faqs) }
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

FAQPage.propTypes = {
  children: PropTypes.object,
  pagination: PropTypes.object,
  loadMore: PropTypes.func,
  nextParams: PropTypes.object,
  hasMore: PropTypes.bool
};
