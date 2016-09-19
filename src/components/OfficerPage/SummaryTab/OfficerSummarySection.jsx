import React from 'react';
import Wrapper from 'components/Shared/Wrapper';
import OfficerPresenter from 'presenters/OfficerPresenter';
import OfficerSummaryItem from 'components/OfficerPage/SummaryTab/OfficerSummarySection/OfficerSummaryItem';
import style from 'styles/OfficerPage/SummaryTab/OfficerSummarySection.sass';


const OfficerSummarySection = React.createClass({
  propTypes: {
    officer: React.PropTypes.object
  },

  render() {
    const officer = this.props.officer;
    const officerPresenter = OfficerPresenter(officer);
    const labelToMethodMap = {
      'Rank': 'rank',
      'Unit': 'unit',
      'Joined': 'joinedDate',
      'Sex': 'gender',
      'Race': 'race'
    };
    return (
      <Wrapper visible={ officerPresenter.hasSummarySection } wrapperClass={ style.officerSummarySection }>
        <div className='pad'>
          { Object.keys(labelToMethodMap).map( (label) => (
            <OfficerSummaryItem officer={ officer }
              label={ label } data={ officerPresenter[labelToMethodMap[label]] } key={ label } />
          )) }
        </div>
      </Wrapper>
    );
  }
});

export default OfficerSummarySection;
