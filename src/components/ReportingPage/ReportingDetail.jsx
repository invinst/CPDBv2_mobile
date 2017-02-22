import React, { Component, PropTypes } from 'react';
import style from 'styles/ReportingDetail.sass';
import { scrollToTop } from 'utils/NavigationUtil';
import { Sticky } from 'react-sticky';


export default class ReportingDetail extends Component {
  componentWillMount() {
    this.props.requestReport(this.props.id);
  }

  renderMetadataTable(publication, publishDate, author) {
    return (
      <table className='metadata'>
        <tbody>
          <tr>
            <td>Publication</td>
            <td>{ publication }</td>
          </tr>
          <tr>
            <td>Publish Date</td>
            <td>{ publishDate }</td>
          </tr>
          <tr>
            <td>Author</td>
            <td>{ author }</td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderExcerpt(paragraphs) {
    return paragraphs.map((paragraph, index) => (
      <p key={ index }>{ paragraph }</p>
    ));
  }

  render() {
    const { report } = this.props;

    if (!report.loaded) {
      return null;
    }

    const { publication, publishDate, author } = report;

    return (
      <div className={ style.reportingDetail }>
        <Sticky>
          <div onClick={ scrollToTop } className='empty sheet-header header'></div>
        </Sticky>
        <h1 className='report-title'>{ report.title.join('. ') }</h1>
        <div className='report-body'>
          { this.renderMetadataTable(publication, publishDate, author) }
          { this.renderExcerpt(report.excerpt) }
        </div>
      </div>
    );
  }
}

ReportingDetail.propTypes = {
  children: PropTypes.object,
  report: PropTypes.object,
  requestReport: PropTypes.func,
  id: PropTypes.number
};
