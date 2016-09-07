import React from 'react';
import cx from 'classnames';

import OfficerCard from 'components/Shared/OfficerCard';
import HighlightText from 'components/Shared/HighlightText';
import SuggestionPresenter from 'presenters/SuggestionPresenter';
import OfficerPresenter from 'presenters/OfficerPresenter';
import AppHistory from 'utils/History';
import style from 'styles/Shared/SearchablePage/SearchResults/SuccessfulSearch/OfficerResult.sass';
import GaUtil from 'utils/GaUtil';


const OfficerResult = React.createClass({
  propTypes: {
    term: React.PropTypes.string,
    suggestions: React.PropTypes.array
  },

  onClick: function (presenter) {
    const officerPresenter = OfficerPresenter(presenter.meta);
    GaUtil.track('event', 'filter', presenter.resource, presenter.text);
    AppHistory.push(officerPresenter.url);
  },

  renderOfficerCard: function (suggestion) {
    const presenter = SuggestionPresenter(suggestion);
    const displayName = (<HighlightText fullText={ presenter.text } textToFind={ this.props.term } />);
    const badgeClassName = cx('badge-value', { 'highlight': this.props.term == presenter.meta.badge });
    const officerPresenter = OfficerPresenter(presenter.meta);

    return (
      <li className={ cx(style.officerResult, 'outer-glow') } key={ presenter.uniqueKey }>
        <div className='link officer officer-name-result-item' onClick={ this.onClick.bind(this, presenter) }>
          <div className='officer-header pad'>
            <span className='officer-label'> Officer<span className='dot-bullet'>&#8226;</span></span>
            <span className='badge-title'>Badge</span>
            <span className={ badgeClassName }>{ officerPresenter.badge }</span>
            <span className='complaint-count'>{ officerPresenter.allegationsCount } complaints</span>
          </div>
          <OfficerCard officerId={ presenter.resourceKey } allegationsCount={ officerPresenter.allegationsCount }
            displayName={ displayName }
            description={ presenter.meta.description }
          />
        </div>
      </li>
    );
  },

  render: function () {
    return (
      <ul className='suggestion-list'>
        { this.props.suggestions.map(this.renderOfficerCard) }
      </ul>
    );
  }
});

export default OfficerResult;
