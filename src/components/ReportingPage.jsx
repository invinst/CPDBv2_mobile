import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import cs from 'constants';
import { map } from 'lodash';
import style from 'styles/ReportingPage.sass';
import { hasChildren } from 'utils/ComponentUtil';
import { Sticky } from 'react-sticky';
import { scrollToTop } from 'utils/NavigationUtil';


export default class ReportingPage extends Component {
  componentWillMount() {
    if (!this.props.pagination.loaded) {
      this.props.loadMore();
    }
  }

  renderReportingItems(reports) {
    return map(reports, (report) => (
      <Link className='reporting-item-row' key={ report.id } to={ `${cs.REPORTING_PATH}${report.id}/` }>
        <div>
          <span className='publication'>{ report.publication }</span>
          <span className='publish-date'>{ report.publishDate }</span>
        </div>
        <div className='title'>{ report.title.join('. ') }</div>
      </Link>
    ));
  }

  render() {
    const { pagination, loadMore, nextParams, hasMore } = this.props;

    if (!pagination.loaded && !pagination.reports) {
      return null;
    }

    if (hasChildren(this)) {
      return (
        <div>
          Reporting
        </div>
      );
    }

    return (
      <div className={ style.reportingPage }>
        <Sticky>
          <h1 onClick={ scrollToTop() } className='sheet-header header'>Reporting</h1>
        </Sticky>
        <div className='sheet-body'>
          <InfiniteScroll loadMore={ () => loadMore(nextParams) } hasMore={ hasMore } useWindow={ true }>
            { this.renderReportingItems(pagination.reports) }
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

ReportingPage.propTypes = {
  children: PropTypes.object,
  pagination: PropTypes.object,
  loadMore: PropTypes.func,
  nextParams: PropTypes.object,
  hasMore: PropTypes.bool
};
