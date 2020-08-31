import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, isEmpty } from 'lodash';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import WithHeader from 'components/shared/with-header';
import style from './lawsuit-page.sass';
import { getLawsuitMapUrl } from 'utils/mapbox';
import { imageStyle } from 'components/common/shared.style';
import InvolvedOfficers from './involved-officers';
import { scrollToElement } from 'utils/navigation-util';
import Summary from './summary';


export default class LawsuitPage extends Component {
  componentDidMount() {
    const { lawsuit, fetchLawsuit, lawsuitCaseNo } = this.props;
    if (!lawsuit) {
      fetchLawsuit(lawsuitCaseNo);
    }
  }

  handleTotalPaymentsSummaryClick = () => {
    scrollToElement(this.refs.paymentSection);
  };

  render() {
    const { lawsuit, addOrRemoveItemInPinboard } = this.props;

    if (isEmpty(lawsuit)) {
      return null;
    }

    const {
      caseNo,
      summary,
      primaryCause,
      address,
      location,
      interactions,
      services,
      misconducts,
      violences,
      outcomes,
      incidentDate,
      plaintiffs,
      officers,
      payments,
      totalPaymentsDetails,
      totalPaymentsDisplay,
      point,
      attachment,
    } = lawsuit;

    return (
      <React.Fragment>
        <Helmet>
          <title>{`Case ${caseNo}`}</title>
        </Helmet>
        <div className={ style.lawsuitPage }>
          <WithHeader/>
          <div className={ 'responsiveContainerStyles.responsiveContainer' }>
            <div className='lawsuit-content'>
              <div className='lawsuit-label'>LAWSUIT</div>
              <div className='basic-info'>
                {
                  attachment && (
                    <Link
                      to={ { pathname: attachment.url } }
                      className='attachment-image-href'
                      target='_blank'
                    >
                      <div className='attachment-image' style={ imageStyle(attachment.previewImageUrl) } />
                    </Link>
                  )
                }
                <div className='lawsuit-title'>
                  <div className='case-no'>Case {caseNo}</div>
                  <div className='primary-cause'>{primaryCause}</div>
                </div>
                <div className='clearfix'/>
              </div>
              <div className='total-payments-summary' onClick={ this.handleTotalPaymentsSummaryClick }>
                <div className='total-payments-summary-value'>${totalPaymentsDisplay}</div>
                <div className='total-payments-summary-label'>Total payments</div>
              </div>
              <Summary summary={ summary } className='summary-info' />

              <div className='officers-section section'>
                <div className='section-label'>
                  Involved Officers (Defendants)
                </div>
                <InvolvedOfficers officers={ officers } addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard } />
              </div>

              <div className='payment-section section' ref='paymentSection'>
                <div className='section-label'>Payment Breakdown</div>
                <div className='payment-breakdown-table'>
                  <div className='payment-row total-payments'>
                    <div className='row-label'>Total Payments</div>
                    <div className='row-value'>${totalPaymentsDetails.totalPayments}</div>
                  </div>
                  <div className='subtotals payment-row'>
                    <div className='row-label'>Settlements</div>
                    <div className='row-value'>
                      <span className='highlight-value'>
                        {totalPaymentsDetails.mustBeAcceptedByCouncilCity && '*'}${totalPaymentsDetails.totalSettlement}
                      </span>
                    </div>
                    {
                      totalPaymentsDetails.mustBeAcceptedByCouncilCity && (
                        <div className='must-be-accepted-by-council-city-description'>
                          *Lawsuits over 100K must be approved by City Council
                        </div>
                      )
                    }
                  </div>
                  {
                    payments.map(({ payee, settlement }, index) => (
                      settlement && (
                        <div key={ index } className='payment-row detail-row'>
                          <div className='row-label'>{payee}</div>
                          <div className='row-value'>${settlement}</div>
                        </div>
                      )
                    ))
                  }
                  <div className='subtotals payment-row'>
                    <div className='row-label'>Legal Fees</div>
                    <div className='row-value'>
                      <span className='highlight-value'>${totalPaymentsDetails.totalLegalFees}</span>
                    </div>
                  </div>
                  {
                    payments.map(({ payee, legalFees }, index) => (
                      legalFees && (
                        <div key={ index } className='payment-row detail-row'>
                          <div className='row-label'>{payee}</div>
                          <div className='row-value'>${legalFees}</div>
                        </div>
                      )
                    ))
                  }
                </div>
              </div>

              <div className='case-breakdown-section section'>
                <div className='section-label'>Case Breakdown</div>
                <div className='case-breakdown-table'>
                  <div className='field-row'>
                    <div className='field-row-label'>Interaction</div>
                    <div className='field-row-value'>{interactions.join(', ')}</div>
                  </div>
                  <div className='field-row'>
                    <div className='field-row-label'>Service</div>
                    <div className='field-row-value'>{services.join(', ')}</div>
                  </div>
                  <div className='field-row'>
                    <div className='field-row-label'>Misconduct</div>
                    <div className='field-row-value'>{misconducts.join(', ')}</div>
                  </div>
                  <div className='field-row'>
                    <div className='field-row-label'>Violence</div>
                    <div className='field-row-value'>{violences.join(', ')}</div>
                  </div>
                  <div className='field-row'>
                    <div className='field-row-label'>Outcome</div>
                    <div className='field-row-value'>{outcomes.join(', ')}</div>
                  </div>
                </div>
              </div>

              <div className='case-details-section section'>
                <div className='section-label'>Case Details</div>
                <div className='field-row'>
                  <div className='field-row-label'>Plaintiff</div>
                  <div className='field-row-value'>
                    {plaintiffs.map((plaintiff) => plaintiff['name']).join(', ')}
                  </div>
                </div>
                <div className='field-row'>
                  <div className='field-row-label'>Incident date</div>
                  <div className='field-row-value'>{incidentDate}</div>
                </div>
                {
                  !isEmpty(location) && (
                    <div className='field-row location-description'>
                      <div className='field-row-label'>Location</div>
                      <div className='field-row-value'>{location}</div>
                    </div>
                  )
                }
                <div className='field-row'>
                  <div className='field-row-label'>Location</div>
                  <div className='field-row-value'>
                    {address}
                    <div
                      className='lawsuit-map'
                      style={ point ? {
                        background: `url("${getLawsuitMapUrl(point.lat, point.lon, 234, 130)}") no-repeat center/cover`,
                      }: null }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

LawsuitPage.propTypes = {
  lawsuitCaseNo: PropTypes.string,
  lawsuit: PropTypes.shape({
    caseNo: PropTypes.string,
    summary: PropTypes.string,
    primaryCause: PropTypes.string,
    address: PropTypes.string,
    location: PropTypes.string,
    interactions: PropTypes.arrayOf(PropTypes.string),
    services: PropTypes.arrayOf(PropTypes.string),
    misconducts: PropTypes.arrayOf(PropTypes.string),
    violences: PropTypes.arrayOf(PropTypes.string),
    outcomes: PropTypes.arrayOf(PropTypes.string),
    incidentDate: PropTypes.string,
    plaintiffs: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    point: PropTypes.shape({
      lat: PropTypes.number,
      lon: PropTypes.number,
    }),
    officers: PropTypes.arrayOf(
      PropTypes.shape({
        fullName: PropTypes.string,
      })
    ),
    payments: PropTypes.arrayOf(
      PropTypes.shape({
        payee: PropTypes.string,
        settlement: PropTypes.string,
        legalFees: PropTypes.string,
      })
    ),
    totalPaymentsDetails: PropTypes.shape({
      totalPayments: PropTypes.string,
      totalSettlement: PropTypes.string,
      totalLegalFees: PropTypes.string,
      mustBeAcceptedByCouncilCity: PropTypes.bool,
    }),
    totalPaymentsDisplay: PropTypes.string,
    attachment: PropTypes.shape({
      url: PropTypes.string,
      previewImageUrl: PropTypes.string,
    }),
  }),
  addOrRemoveItemInPinboard: PropTypes.func,
  fetchLawsuit: PropTypes.func,
};

LawsuitPage.defaultProps = {
  lawsuit: {
    officers: [],
    payments: [],
    totalPaymentsDetails: {},
    interactions: [],
    services: [],
    misconducts: [],
    violences: [],
    outcomes: [],
    plaintiffs: [],
  },
  fetchLawsuit: noop,
};
