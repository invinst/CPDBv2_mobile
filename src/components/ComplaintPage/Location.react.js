import React from 'react';
import u from 'utils/HelperUtil';
import AllegationPresenter from 'presenters/AllegationPresenter';
import Map from 'components/ComplaintPage/Location/Map.react';
import Wrapper from 'components/Shared/Wrapper.react';
import style from 'styles/ComplaintPage/Location.sass';


const Location = React.createClass({
  propTypes: {
    allegation: React.PropTypes.object
  },

  renderLocationInfoItem(label, data) {
    return (
      <Wrapper visible={ !!data }>
        <label>{ label } </label>
        <span>{ data }</span>
      </Wrapper>
    );
  },

  render() {
    const allegation = this.props.allegation;
    const presenter = AllegationPresenter(allegation);
    const point = u.fetch(allegation, 'point', '');

    return (
      <Wrapper wrapperClass={ style.location } visible={ presenter.hasLocation }>
        <div className='section-header bold'>
          <div className='section-title pad'>Location</div>
        </div>
        <div className='location-detail pad'>
          <div className='bold'>{ presenter.address }</div>
          { this.renderLocationInfoItem('Beat', presenter.beat) }
          { this.renderLocationInfoItem('Location type', presenter.locationType) }
          { this.renderLocationInfoItem('City', presenter.city) }
        </div>
        <Wrapper wrapperClass='location-map pad' visible={ !!point }>
          <Map allegation={ allegation }/>
        </Wrapper>
      </Wrapper>
    );
  }
});

export default Location;
