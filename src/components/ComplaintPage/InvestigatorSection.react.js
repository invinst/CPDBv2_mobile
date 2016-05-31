import React from 'react';
import Wrapper from 'components/Shared/Wrapper.react';
import HelperUtil from 'utils/HelperUtil';
import style from 'styles/ComplaintPage/InvestigatorSection.sass'

const InvestigatorSection = React.createClass({
  propTypes: {
    allegation: React.PropTypes.object
  },

  renderInvestigator(investigator) {
    const currentRank = HelperUtil.fetch(investigator, 'current_rank', 'Rank unknown');

    return (
      <div className='investigator-card pad'>
        <div className='row'>
          <div className='one column circle-wrapper center'>
            <div className='small-circle background-black circle'></div>
          </div>
          <div className='eleven columns'>
            <div className='investigator'>
              <div className='name bold'>{ investigator['name'] }</div>
              <div className='rank'>{ currentRank }</div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  render() {
    const investigator = HelperUtil.fetch(this.props.allegation, 'investigator', false);

    return (
      <Wrapper wrapperClass={ style.investigatorSection } visible={ !!investigator }>
        <div className='row section-header'>
          <span className='section-title bold pad'>Investigator</span>
        </div>
        { this.renderInvestigator(investigator) }
      </Wrapper>
    );
  }
});

export default InvestigatorSection;
