import React from 'react';
import DistributionCurve from 'components/OfficerPage/SummaryTab/OfficerAnalyticSection/DistributionCurve.react';
import style from 'styles/OfficerPage/SummaryTab/OfficerAnalyticSection.sass';


const OfficerAnalyticSection = React.createClass({
  render() {
    return (
      <div className={ style.officerAnalyticSection }>
        <div className='section-header'>
          <span className='pad'>
            <span className='section-title bold'>Officer analytics</span>
          </span>
        </div>
        <DistributionCurve officer={ this.props.officer } distribution={ this.props.distribution } />
      </div>
    );
  }
});

OfficerAnalyticSection.propTypes = {
  officer: React.PropTypes.object,
  distribution: React.PropTypes.array
};

OfficerAnalyticSection.defaultProps = {
  officer: {},
  distribution: []
};

export default OfficerAnalyticSection;
