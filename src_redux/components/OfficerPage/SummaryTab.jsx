import React from 'react';
import OfficerSummarySection from 'components/OfficerPage/SummaryTab/OfficerSummarySection';
import OfficerAnalyticSection from 'components/OfficerPage/SummaryTab/OfficerAnalyticSection';
import style from 'styles/OfficerPage/SummaryTab.sass';


const SummaryTab = React.createClass({
  propTypes: {
    officer: React.PropTypes.object,
    distribution: React.PropTypes.array
  },

  defaultProps: {
    'officer': {},
    'distribution': []
  },

  render() {
    const officer = this.props.officer;
    const distribution = this.props.distribution;

    return (
      <div className={ style.summaryTab }>
        <OfficerSummarySection officer={ officer } />
        <OfficerAnalyticSection officer={ officer } distribution={ distribution } />
      </div>
    );
  }
});

export default SummaryTab;
