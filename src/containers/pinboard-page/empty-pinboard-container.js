import { connect } from 'react-redux';

import { examplePinboardsSelector, getPinboardId } from 'selectors/pinboard-page/pinboard';
import EmptyPinboard from 'components/pinboard-page/empty-pinboard';
import { cmsSelector } from 'selectors/common/cms';
import { updatePinboardFromSource } from 'actions/pinboard';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  currentPinboardId: getPinboardId(state),
  examplePinboards: examplePinboardsSelector(state),
  emptyPinboardTitle: cmsSelector(state, 'pinboardPage', 'empty_pinboard_title'),
  emptyPinboardDescription: cmsSelector(state, 'pinboardPage', 'empty_pinboard_description'),
});

const mapDispatchToProps = {
  updatePinboardFromSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmptyPinboard);
