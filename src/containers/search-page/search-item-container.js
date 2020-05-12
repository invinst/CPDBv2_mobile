import { connect } from 'react-redux';

import SearchItem from 'components/search-page/search-item';
import { isPinButtonIntroductionVisitedSelector } from 'selectors/pinboard-introduction';
import { visitPinButtonIntroduction } from 'actions/pinboard-introduction';
import { saveToRecent } from 'actions/suggestion';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    isPinButtonIntroductionVisited: isPinButtonIntroductionVisitedSelector(state),
  };
}

const mapDispatchToProps = {
  visitPinButtonIntroduction,
  saveToRecent,
  addOrRemoveItemInPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);
