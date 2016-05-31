import React from 'react';
import ReactDOM from 'react-dom';
import u from 'utils/HelperUtil';
import AllegationPresenter from 'presenters/AllegationPresenter';
import MapFacade from 'utils/MapFacade';
import Wrapper from 'components/Shared/Wrapper.react';
import style from 'styles/ComplaintPage/Location/Map.sass';


const Map = React.createClass({
  propTypes: {
    allegation: React.PropTypes.object
  },

  componentDidMount() {
    const allegation = this.props.allegation;
    const point = u.fetch(allegation, 'point', '');
    const allegationPresenter = AllegationPresenter(allegation);

    if (point) {
      MapFacade.initialize(ReactDOM.findDOMNode(this), point);

      if (allegationPresenter.hasFullAddress) {
        MapFacade.addAccidentPlaceMarker();
      }
      else {
        MapFacade.addNoAddressPopup();
      }
    }
  },

  render() {
    const point = u.fetch(this.props.allegation, 'point', '');

    return (
      <Wrapper wrapperClass={ style.map } visible={ (!!point) } />
    );
  }
});

export default Map;
