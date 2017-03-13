import React, { PropTypes } from 'react';
import SectionHeader from 'components/OfficerPage/SectionHeader';
import style from 'styles/OfficerPage/SummaryStatsSection.sass';


const SummaryStatsSection = ({ name, data }) => {
  const facets = data.facets.map((facet, index) => {
    if (facet.entries.length === 0) {
      return null;
    }

    const entries = facet.entries.map((entry, index) => (
      <div className='facet-entry' key={ index }>
        <span className='facet-entry-count'>{ entry.count }</span>
        <span className='facet-entry-name'>{ entry.name }</span>
      </div>
    ));

    return (
      <div className='facet' key={ index }>
        <div className='facet-name'>{ facet.name }</div>
        { entries }
      </div>
    );
  });

  return (
    <div className={ style.statsSection }>
      <SectionHeader text={ name } />
      <div className='total'>
        <span className='total-title'>Total</span>
        <span className='total-value'>{ data.count }</span>
      </div>
      { facets }
    </div>
  );
};

SummaryStatsSection.propTypes = {
  name: PropTypes.string,
  data: PropTypes.object
};

export default SummaryStatsSection;
