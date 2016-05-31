import cx from 'classnames';
import React from 'react';
import pluralize from 'pluralize';
import OfficerAllegationPresenter from 'presenters/OfficerAllegationPresenter';
import AllegationPresenter from 'presenters/AllegationPresenter';
import ComplaintPageActions from 'actions/ComplaintPage/ComplaintPageActions';
import style from 'styles/ComplaintPage/OfficerAllegationDetail.sass';


const OfficerAllegationDetail = React.createClass({
  propTypes: {
    allegation: React.PropTypes.object,
    currentOfficerAllegation: React.PropTypes.object,
    numberOfAllegations: React.PropTypes.number
  },

  _onClick() {
    ComplaintPageActions.toggleOpen();
  },

  render() {
    const allegationPresenter = AllegationPresenter(this.props.allegation);
    const numberOfAllegations = this.props.numberOfAllegations;
    const currentOfficerAllegationPresenter = OfficerAllegationPresenter(this.props.currentOfficerAllegation);

    return (
      <div className={ cx(style.officerAllegationDetail, 'pad')}>
        <div className='headline row'>
          <span className='crid-info one-half column align-left'>
            <span className='crid-title'>CRID</span>
            <span className='crid-number'>{ allegationPresenter.crid }</span>
          </span>
          <span onClick={ this._onClick } className='one-half column align-right number-of-allegations-section'>
            <span className='number-of-allegations'>
              { pluralize('complaint', numberOfAllegations, true) }
            </span>
            <div className='icon icon-list'></div>
          </span>
        </div>
        <div className='category-info'>
          <div className='allegation-category bold'>
            { currentOfficerAllegationPresenter.category }
          </div>
          <div className='allegation-name'>
            { currentOfficerAllegationPresenter.allegationName }
          </div>
        </div>
      </div>
    );
  }
});

export default OfficerAllegationDetail;
