import React, { PropTypes } from 'react';
import cx from 'classnames';
import SectionHeader from 'components/OfficerPage/SectionHeader';
import style from 'styles/OfficerPage/SummaryStatsSection.sass';


const SummaryStatsSection = ({ name, data }) => {
  const facets = data.facets.map((facet, index) => {
    if (facet.entries.length === 0) {
      return null;
    }

    const entries = facet.entries.map((entry, index) => (
      <div className='facet-entry' key={ index }>
        <span className='facet-entry-name'>{ entry.name }</span>
        <span className='facet-entry-count'>{ entry.count }</span>
        <span className={ cx('facet-entry-count sustained', { 'zero': entry['sustained_count'] === 0 }) }>
          { entry['sustained_count'] }
        </span>
      </div>
    ));

    return (
      <div className='facet' key={ index }>
        <div className='facet-name'>{ facet.name }</div>
        { entries }
      </div>
    );
  });

  const text = (
    <span className='complaint-counts'>
      <span className='count total-count'>
        { data.count } Complaint Records (CRs),
      </span>
      <span className='count sustained-count'>
        { data.sustainedCount } sustained
      </span>
    </span>
  );

  return (
    <div className={ `${style.statsSection} test--summary-stats-section` }>
      <SectionHeader text={ text } />
      { facets }
    </div>
  );
};

SummaryStatsSection.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.object
};

export default SummaryStatsSection;
