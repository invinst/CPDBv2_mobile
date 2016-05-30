import React from 'react';
import Wrapper from 'components/Shared/Wrapper.react';
import OfficerPresenter from 'presenters/OfficerPresenter';


const OfficerSummarySection = React.createClass({
  propTypes: {
    officer: React.PropTypes.object
  },

  renderSummaryInfoItem(label, data) {
    const presenter = OfficerPresenter(this.props.officer);

    return (
      <Wrapper visible={ presenter.hasData(label) }>
        <span className='label'>{ label } </span>
        <span className='value'>{ data }</span>
      </Wrapper>
    );
  },

  render() {
    const officerPresenter = OfficerPresenter(this.props.officer);

    return (
      <Wrapper visible={ officerPresenter.hasSummarySection } wrapperClass='officer-summary-section'>
        <div className='pad'>
          { this.renderSummaryInfoItem('Rank', officerPresenter.rank) }
          { this.renderSummaryInfoItem('Unit', officerPresenter.unit) }
          { this.renderSummaryInfoItem('Joined', officerPresenter.joinedDate) }
          { this.renderSummaryInfoItem('Sex', officerPresenter.gender) }
          { this.renderSummaryInfoItem('Race', officerPresenter.race) }
        </div>
      </Wrapper>
    );
  }
});

export default OfficerSummarySection;
