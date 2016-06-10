import React from 'react';
import pluralize from 'pluralize';
import CollectionUtil from 'utils/CollectionUtil';
import ComplaintPageActions from 'actions/ComplaintPage/ComplaintPageActions';
import OfficerAllegationItem from 'components/Shared/OfficerAllegationItem.react';
import ToggleComplaintPagePresenter from 'presenters/Page/ToggleComplaintPagePresenter';
import AllegationPresenter from 'presenters/AllegationPresenter';
import style from 'styles/ComplaintPage/ToggleComplaintPage.sass';


const ToggleComplaintPage = React.createClass({
  propTypes: {
    officerAllegations: React.PropTypes.array,
    allegation: React.PropTypes.object,
    numberOfAllegations: React.PropTypes.number
  },

  _onCloseBtnClick() {
    ComplaintPageActions.toggleClose();
  },

  renderAllegation(categoryId, officerAllegations) {
    const firstOfficerAllegation = CollectionUtil.first(officerAllegations);

    return (
      <div key={ categoryId }>
        <OfficerAllegationItem officerAllegation={ firstOfficerAllegation }
          officerAllegations={ officerAllegations } allegation={ this.props.allegation }/>
      </div>
    );
  },

  renderAllegationList(officerAllegationGroups) {
    let currentOfficerAllegations, categoryId;
    const results = [];

    for (categoryId in officerAllegationGroups) {
      currentOfficerAllegations = officerAllegationGroups[categoryId];
      results.push(this.renderAllegation(categoryId, currentOfficerAllegations));
    }

    return results;
  },

  render() {
    const officerAllegations = this.props.officerAllegations;
    const presenter = ToggleComplaintPagePresenter(officerAllegations);
    const allegationPresenter = AllegationPresenter(this.props.allegation);

    return (
      <div className={ style.toggleComplaintPage }>
        <div className='headline-container'>
          <div className='row'>
            <div className='crid-container align-left'>
              <span className='crid-title'>CRID </span>
              <span className='crid-number'>{ allegationPresenter.crid }</span>
            </div>
            <div className='align-right'>
              <div className='toggle-container' onClick={ this._onCloseBtnClick }>
                <span className='number-of-allegations'>
                  { pluralize('complaint', this.props.numberOfAllegations, true) }
                </span>
                <div className='icon icon-close'></div>
              </div>
            </div>
          </div>
        </div>
        { this.renderAllegationList(presenter.groupByCategory) }
      </div>
    );
  }
});

export default ToggleComplaintPage;
