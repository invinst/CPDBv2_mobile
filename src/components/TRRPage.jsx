import React, { Component, PropTypes } from 'react';

import style from 'styles/TRRPage.sass';
import NavbarContainer from 'containers/NavbarContainer';
import constants from 'constants';
import BottomPadding from 'components/Shared/BottomPadding';
import Officer from 'components/TRRPage/Officer';
import Info from 'components/TRRPage/Info';


export default class TRRPage extends Component {

  componentDidMount() {
    const { trr, requestTRR, trrId } = this.props;
    if (!trr) {
      requestTRR(trrId);
    }
  }

  render() {
    const { trr } = this.props;

    if (!trr) {
      return null;
    }

    return (
      <div className={ style.trrPage }>
        <NavbarContainer backLink={ constants.SEARCH_PATH } />
        <h4 className='trr-header'>{ trr.category }</h4>
        <div className='trr-page-body'>
          <Officer { ...trr.officer }/>
          <Info { ...trr.info }/>
        </div>
        <BottomPadding />
      </div>
    );
  }
}

TRRPage.propTypes = {
  requestTRR: PropTypes.func,
  trrId: PropTypes.number,
  trr: PropTypes.object
};
