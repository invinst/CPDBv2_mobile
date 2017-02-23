import React, { Component, PropTypes } from 'react';
import style from 'styles/SearchCategory.sass';
import { Link } from 'react-router';
import constants from 'constants';

const DEFAULT_CATEGORY_LENGTH = 10;

export default class SearchCategory extends Component {
  renderOfficer(officer, index) {
    const onClick = this.props.clicked.bind(this, {
      type: 'Officer',
      title: officer.name,
      url: officer.url
    });

    return (
      <a href={ officer.url } target='_blank' key={ index } className='row' onClick={ onClick }>
        <p>{ officer.name }</p>
        <p className='officer-badge-number'>{ officer.extraInfo }</p>
      </a>
    );
  }

  renderFaq(faq, index) {
    const onClick = this.props.clicked.bind(this, {
      type: 'FAQ',
      title: faq.question,
      url: `${constants.FAQ_PATH}/${faq.id}`
    });
    return (
      <div key={ index } className='row'>
        <Link className='faq' to={ constants.FAQ_PATH + '/' + faq.id } onClick={ onClick }>
          { faq.question }
        </Link>
      </div>
    );
  }

  renderReport(report, index) {
    const onClick = this.props.clicked.bind(this, {
      type: 'Report',
      title: report.title,
      url: `${constants.REPORTING_PATH}/${report.id}`
    });

    return (
      <Link
        to={ `${constants.REPORTING_PATH}/${report.id}` }
        key={ index }
        className='row report-row'
        onClick={ onClick }>
        <p className='report-publication'>
          <span>{ report.publication }</span>
          <span>{ report.publishDate }</span>
        </p>
        <p className='report-title'>{ report.title }</p>
      </Link>
    );
  }

  renderSuggested(item, index) {
    const { url, type, title } = item;
    const onClick = this.props.clicked.bind(this, { url, type, title });

    return (
      <Link className='row suggested' to={ url } onClick={ onClick } key={ index }>
        <span className='suggested-type'>{ type }</span>
        <span className='suggested-title'>{ title }</span>
      </Link>
    );
  }

  renderAllButton(isShowingAll, itemsLength, requestAll) {
    // FIXME: API server should return some kind of `hasMore` value so that we
    // don't have to check manually on client side.
    if (!isShowingAll && itemsLength >= DEFAULT_CATEGORY_LENGTH) {
      return <div className='all' onClick={ requestAll }>ALL</div>;
    } else {
      return null;
    }
  }

  getCategorySpecificRenderFunction(categoryId) {
    const renderFunctionMappings = {
      'officers': this.renderOfficer.bind(this),
      'faqs': this.renderFaq.bind(this),
      'reports': this.renderReport.bind(this),
      'recent': this.renderSuggested.bind(this),
      'suggested': this.renderSuggested.bind(this)
    };
    return renderFunctionMappings[categoryId];
  }

  render() {
    const { title, items, categoryId, requestAll, isShowingAll } = this.props;
    const renderFunction = this.getCategorySpecificRenderFunction(categoryId);
    const suggestions = items.map(renderFunction);

    return (
      <div className={ style.searchCategory }>
        <div className='title' id={ 'search-category-' + categoryId }>
          { title }
        </div>
        <div className={ `body ${categoryId}` }>
          <div>
            { suggestions }
          </div>
          { this.renderAllButton(isShowingAll, items.length, requestAll) }
        </div>
      </div>
    );
  }
}

SearchCategory.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  categoryId: PropTypes.string,
  isShowingAll: PropTypes.bool,
  requestAll: PropTypes.func,
  clicked: PropTypes.func
};
