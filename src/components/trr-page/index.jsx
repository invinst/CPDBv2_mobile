import React, { Component, PropTypes } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { noop } from 'lodash';

import style from './trr-page.sass';
import BottomPadding from 'components/shared/bottom-padding';
import Header from 'components/shared/header';
import Officer from 'components/trr-page/officer';
import Info from 'components/trr-page/info';
import Footer from 'components/footer';


export default class TRRPage extends Component {

  componentDidMount() {
    const { trr, requestTRR, trrId, cmsRequested, requestCMS } = this.props;
    if (!trr) {
      requestTRR(trrId);
    }
    cmsRequested || requestCMS();
  }

  render() {
    const { trr, trrId } = this.props;

    if (!trr) {
      return null;
    }

    return (
      <StickyContainer className={ style.trrPage }>
        <Sticky><Header /></Sticky>
        <h4 className='trr-header'>{ trr.category }</h4>
        <div className='trr-page-body'>
          <Officer { ...trr.officer }/>
          <Info { ...trr.info } trrId={ trrId }/>
        </div>
        <BottomPadding />
        <Footer />
      </StickyContainer>
    );
  }
}

TRRPage.propTypes = {
  requestTRR: PropTypes.func,
  trrId: PropTypes.number,
  trr: PropTypes.object,
  requestCMS: PropTypes.func,
  cmsRequested: PropTypes.bool,
};

TRRPage.defaultProps = {
  requestCMS: noop
};
