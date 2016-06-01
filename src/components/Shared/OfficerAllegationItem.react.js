import React from 'react';
import cx from 'classnames';
import u from 'utils/HelperUtil';
import CollectionUtil from 'utils/CollectionUtil';
import AppHistory from 'utils/History';
import ComplaintPageActions from 'actions/ComplaintPage/ComplaintPageActions';
import AllegationPresenter from 'presenters/AllegationPresenter';
import OfficerAllegationPresenter from 'presenters/OfficerAllegationPresenter';
import OfficerPresenter from 'presenters/OfficerPresenter';
import CircleList from 'components/Shared/OfficerAllegationItem/CircleList.react';
import style from 'styles/Shared/OfficerAllegationItem.sass'


const OfficerAllegationItem = React.createClass({
  propTypes: {
    officerAllegation: React.PropTypes.object,
    allegation: React.PropTypes.object,
    officerAllegations: React.PropTypes.array
  },

  _onClick(crid, firstOfficerAllegation) {
    const presenter = OfficerAllegationPresenter(firstOfficerAllegation);
    AppHistory.push(presenter.url(crid));
    ComplaintPageActions.resetState();
  },

  render() {
    const allegation = this.props.allegation;
    const officerAllegations = this.props.officerAllegations;
    const firstOfficerAllegation = this.props.officerAllegation;

    const officer = u.fetch(firstOfficerAllegation, 'officer', null);

    const numberOfInvolvedOfficers = officerAllegations.length - 1; // exclude himself
    const allegationCounts = CollectionUtil.pluck(officerAllegations, 'officer.allegations_count');

    const officerPresenter = OfficerPresenter(officer);
    const allegationPresenter = AllegationPresenter(allegation);
    const officerAllegationPresenter = OfficerAllegationPresenter(firstOfficerAllegation);
    const crid = allegationPresenter.crid;

    return (
      <div className={ cx(style.officerAllegationItem, 'officer-allegation-item') } onClick={ this._onClick.bind(this, crid, firstOfficerAllegation) }>
        <div className='crid-info pad'>
          <div className='inline-block half-width align-left'>
            <span className='crid-title'>CRID &nbsp;</span>
            <span className='crid-number'>{ crid }</span>
          </div>
          <div className='inline-block half-width align-right'>
            <span className='final-finding'>{ officerAllegationPresenter.finalFinding }</span>
          </div>
        </div>
        <div className='complaint-category'>
          <div className='pad'>
            <div className='category'>{ officerAllegationPresenter.category }</div>
            <div className='sub-category'>{ officerAllegationPresenter.allegationName }</div>
          </div>
        </div>
        <div className='related-info pad'>
          <div className='row'>
            <span className='label'>Incident</span>
            <span className='value'>{ allegationPresenter.incidentDateDisplay }</span>
          </div>
          <div className='row'>
            <span className='label'>Against</span>
            <span className='value'>
              { officerPresenter.coAccusedWith(numberOfInvolvedOfficers) }
            </span>
          </div>
          <div className='circles row'>
            <CircleList allegationCountList={ allegationCounts } />
          </div>
        </div>
      </div>
    );
  }
});

export default OfficerAllegationItem;
