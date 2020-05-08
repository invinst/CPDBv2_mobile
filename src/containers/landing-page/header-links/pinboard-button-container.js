import { connect } from 'react-redux';

import PinboardButton from 'components/landing-page/header-links/pinboard-button';
import { isPinboardButtonIntroductionVisitedSelector } from 'selectors/pinboard-introduction';
import { visitPinboardButtonIntroduction } from 'actions/pinboard-introduction';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    isPinboardButtonIntroductionVisited: isPinboardButtonIntroductionVisitedSelector(state),
  };
}

const mapDispatchToProps = {
  visitPinboardButtonIntroduction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardButton);
