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
        <span className='facet-entry-count'>{ entry.count }</span>
        <span className={ cx('facet-entry-count sustained', { 'zero': entry['sustained_count'] === 0 }) }>
          { entry['sustained_count'] }
        </span>
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

  const description = (
    <span className='complaint-counts'>
      <span className='count total-count'>
        Total
      </span>
      <span className='count sustained-count'>
        Sustained
      </span>
    </span>
  );

  return (
    <div className={ `${style.statsSection} test--summary-stats-section` }>
      <SectionHeader text={ name } description={ description } />
      <div className='facet-entry total'>
        <span className='facet-entry-count'>{ data.count }</span>
        <span className={ cx('facet-entry-count sustained', { 'zero': data.sustainedCount === 0 }) }>
          { data.sustainedCount }
        </span>
        <span className='facet-entry-name'>Total</span>
      </div>
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
